/********************************************************************************************************/
/* Module name: mailConfig.js                                                                           */
/* Module description: Configuration module for node mailer                                             */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 22-8-2017                                                                                      */
/********************************************************************************************************/
'use strict'
const debug = require('debug')('MailConfig');       //Module for debug messages
const nodemailer = require('nodemailer');           //E-Mail managing module
//Transport object
module.exports = nodemailer.createTransport({       //Creation of the transport object
    service:'gmail',                                //Service provider 
    auth: {                                         //Authentication options
        user: 'npchavenweb@gmail.com',              //Mail account user
        pass: '3071981zgz'                          //Mail account password
    }
});