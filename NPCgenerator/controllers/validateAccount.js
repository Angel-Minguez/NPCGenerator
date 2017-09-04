/********************************************************************************************************/
/* Module name: loginMain.js                                                                            */
/* Module description: Controller for the url parameter containing the activation random string'        */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 02-8-2017                                                                                      */
/********************************************************************************************************/
'use strict'
const debug = require('debug')('accountActivation');                                                                    //Debug messages module
const userModel = require('../models/userModel.js').userModel;                                                          //User model module                                                                 
// Expoted function: Captures the activation key and validates the activation
module.exports = function (req, res, next, param) {
    userModel.activateUser(param).then(                                                                                 //Innvoke the activateUser model method wich returns a promise
        (result) => {                                                                                                   //Resolve results callback
            if (result.type == 'USER_ACTIVATION_SUCCESS') res.redirect('http://127.0.0.1:4200/activation/success');     //Redirect with success state
            if (result.type == 'USER_ACTIVATION_TIMEOUT') res.redirect('http://127.0.0.1:4200/activation/timeout');     //Redirect with timedout state
            if (result.type == 'USER_ACTIVATION_ERROR') res.redirect('http://127.0.0.1:4200/activation/fail');          //Redirect with fail state
        },
        (error) => {                                                                                                    //Error returned by the model method
            if (error.type == 'USER_ACTIVATION_ERROR') res.redirect('http://127.0.0.1:4200/activation/fail');           //Redirect with fail status 
    });
}