/********************************************************************************************************/
/* Module name: expressConfig.js                                                                        */
/* Module description: Controller for the route '/*'                                                    */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 02-8-2017                                                                                      */
/********************************************************************************************************/
'use strict'
const path = require('path');                                               //Module for path manipulation
module.exports = function (req, res, next) {                                //Route function
    res.sendFile(path.join(__dirname + './../angular/__index.html'));       //Send the __index.html from angular app directory as hook to boot the client app
}