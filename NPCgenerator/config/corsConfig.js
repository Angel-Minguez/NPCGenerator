/********************************************************************************************************/
/* Module name: bdConfig.js                                                                             */
/* Module description: CORS middleware configuration file                                               */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 04-8-2017                                                                                      */
/********************************************************************************************************/
'use strict'
module.exports = function (req, res, next) {                                                        //Middleware function
    //CORS Request without OPTIONS method   
    if (req.headers.origin == 'http://127.0.0.1:4200') {                                            //If the origin is the developement angular server
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');                         //The server response allow the request
        if (req.method == 'OPTIONS') {                                                              //If there is an option method request
            res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');                       //The server allows POST, GET and OPTIONS requests
            res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, withCredentials');    //Headers allowed by the server 
            res.header('Access-Control-Allow-Credentials', true);                                   //Allow dredentials through CORS
            res.sendStatus(200);                                                                    //For OPTIONS request, respond with a 200 OK
            return;                                                                                 //End of the middleware chain for the option request
        }
    }
   next();                                                                                          //For the rest of request we call the next middleware function
}