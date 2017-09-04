/********************************************************************************************************/
/* Module name: expressConfig.js                                                                        */
/* Module description: Configuration of the Express library and various utilities                       */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 01-8-2017                                                                                      */
/********************************************************************************************************/
'use strict'
const debug = require('debug')('expressConfig');                                            //Debug module
const path = require('path');                                                               //Module for path manipulation
const express = require('express');                                                         //Express module
const bodyParser = require('body-parser');                                                  //Request body parser utility
const multer = require('multer');                                                           //Request multipart parser utility
let app = express();                                                                        //Creation of the app object with express
app.use('/', bodyParser.json({type: '*/json'}));                                            //Sign of json body parser as middleware for whole domain
app.use('/', bodyParser.urlencoded({ type: '*/x-www-form-urlencoded', extended: true }));   //Sign of url-encoded parser as middleware
if(process.env.NODE_ENV == 'developement') app.use(require('./corsConfig.js'));             //CORS middleware
app.use(require('./httpsRedirect.js'));                                                     //Redirect https traffic to https middleware
app.use(express.static(__dirname + './../angular'));                                        //Configuration of the express static file server
module.exports.uploads = multer({ dest: path.join(__dirname + './../static') });            //Configutation of the multipart parser, including the uploads path
module.exports.app = app;                                                                   //Export of the app object
