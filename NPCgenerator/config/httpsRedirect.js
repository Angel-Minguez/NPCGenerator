/********************************************************************************************************/
/* Module name: httpsRedirect.js                                                                        */
/* Module description: Middleware that redirects traffic to https                                       */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 03-8-2017                                                                                      */
/********************************************************************************************************/
'use strict'
module.exports = function (req, res, next) {
    if (!req.secure) {                                                                              //If the request is not secure, it comes from http connection
        res.redirect('https://' + req.hostname + ':' + process.env.PORT_SSL.toString() + req.url);  //Mount the https request to the same url
    }
    next();                                                                                         //If it is already https traffic, call the next middleware
}