/****************************************************************************************************************************/
/* Module name: loginMain.js                                                                                                */
/* Module description: Controller for the route '/register' and it manages registration logic and user model interaction    */
/* Author: Angel Minguez Burillo                                                                                            */
/* Date: 02-8-2017                                                                                                          */
/****************************************************************************************************************************/
'use strict'
const debug = require('debug')('registerMain');                                                                 //Debug message module
const userModel = require('../models/userModel.js').userModel;                                                  //Module containing the user data model and methods
const User = require('../models/userModel.js').User;                                                            //User class definition
const mailService = require('../config/mailConfig.js');                                                         //E-mail management module
/* Class to check and validate the request */
class userFormModel {                                                                                           //userFormModel represents the client registration form
    constructor(body) {                                                                                         //Constructor uses the body of the request                                      
        this.error = [];                                                                                        //Declaration of an error array, it will hold the parsing errors
        this.userRegExp = new RegExp('.{4,25}');                                                                //Regular expression for the user name
        this.mailRegExp = new RegExp('^.+[@]{1}.+[.]{1}.{2,4}$');                                               //Regular expression for the e-mail
        this.pwdRegExp = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,}');                                          //Regular expression for password
        if (!body.hasOwnProperty('userName') || !body.hasOwnProperty('userMail') || !body.hasOwnProperty('userPwd') ||      //Check if one of the properties is missing
            !body.hasOwnProperty('userRepeatPwd')) this.error.push({ type: 'INVALID_PROPERTIES' });                         //If so push the error into the error array
        else {                                                                                                              //If properties are OK check their content
            if (Object.keys(body).length != 4) return null;                                                                 //Check for the presence of 4 and only 4 properties
            if (typeof body.userName == 'string' && this.userRegExp.test(body.userName)) this.userName = body.userName;     //Test the user name against the name regExp
            else this.error.push({ type: 'INVALID_USERNAME' });                                                             //Test failed error pushed into error array
            if (typeof body.userMail === 'string' && this.mailRegExp.test(body.userMail)) this.userMail = body.userMail;    //Test the mail against the mail regExp
            else this.error.push({ type: 'INVALID_MAIL' });                                                                 //Test failed error pushed into error array
            if (typeof body.userPwd === 'string' && this.pwdRegExp.test(body.userPwd)) this.userPwd = body.userPwd;         //Test the pwd against the password regExp
            else this.error.push({ type: 'INVALID_PASSWORD'});                                                              //Test failed error pushed into error array
            if (body.userPwd !== body.userRepeatPwd) this.error.push({ type: 'PASSWORD_MISMATCH' });                        //Password and password confirmation dont match
        }
    }
}
module.exports = function (req, res, next) {                                                        //Function exported
    let register = new userFormModel(req.body);                                                     //Creation of a userFormModel object with the info in the body request
    if (register.error.length !== 0) {                                                              //If there are validation errors
        debug(register.error);                                                                      //Show them in a debug message
        sendError(res, 'REQUEST_FORMAT_ERROR', 'Bad formated request');                             //Respond the client with the error
        return;                                                                                     //End the processing of the request
    }
    userModel.setUser(new User(register)).then(                                                                 //Calls the setUser method of the model wich returns a promise with the results
        (resolve) => {                                                                                          //Resolve handler
            if (resolve.type == 'DUPLICATE_USER') sendError(res, 'DUPLICATE_USER', resolve.userName);           //User model method encountered the username is in use
            if (resolve.type == 'DUPLICATE_MAIL') sendError(res, 'DUPLICATE_MAIL', resolve.userMail);           //User model method encountered the mail is in use
            if (resolve.type == 'USER_CREATION_OK') {                                                           //Creation process successfull
                let mailOptions = {                                                                             //Confirmation e-mail options
                    from: '"NPC Haven" <npchavenweb@gmail.com>',                                                //Sender address
                    to: register.userMail,                                                                      //List of receivers
                    subject: 'NPC Haven Account confirmation',                                                  //Subject line
                    html: `<h4>NPC Haven team</h4>                                                  
                           <a href="https://127.0.0.1:11982/register/${resolve.actKey}">Activate accout!</a>`   //Html body
                };
                mailService.sendMail(mailOptions, (err, info) => {                                  //Call to sendMail method of the transport object
                    if (err) {                                                                      //Error occurred while sending the e-mail
                        debug(err);                                                                 //Show a debug message with the error
                        sendError(res, 'MAIL_TRANSPORT_ERROR', err);                                //Response to client with the error
                    }
                    else {
                        debug('Message %s sent: %s', info.messageId, info.response);                //E-mail sent
                        res.json({ result: true, error: { type: null, message: null } });           //Send response object with success state
                    }
                });
            }
        },
        (reject) => { sendError(res, 'USER_CREATION_ERROR', reject.message); });                    //The model returned an error in the user creation process
}
function sendError(response, type, message) {                                                       //Function for sending error messages to the client
    response.json({ result: false, error: { type: type, message: message }});                       //A JSON is sent with error info
    response.end();                                                                                 //End of response
}