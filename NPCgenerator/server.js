/********************************************************************************************************/
/* Module name: server.js                                                                               */
/* Module description: Server module                                                                    */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 03-8-2017                                                                                      */
/********************************************************************************************************/
'use strict';
const debug = require('debug')('server');                                               //Load module for debug messages
const https = require('https');                                                         //Https module
const fs = require('fs');                                                               //File system manipulation module
const path = require('path');                                                           //Directory manipulation and utilities module
const db = require('./config/dbConfig.js');                                             //Module to create the connection pool for the MYSQL databes
const app = require('./config/expressConfig').app;                                      //Express module will load some middleware utilities and will return the app object             
require('./router/router.js')(app);                                                     //Router module as last middleware
app.listen(process.env.PORT);                                                           //Launch http server on the port specified by the environment variable PORT
debug('SERVER HTTP: Launched and listening on PORT %d', process.env.PORT);              //Debug message
if (process.env.SECURE == 'ssl') {                                                              //If ssl option is enabled
    let sslOptions = {                                                                          //SSL options object
        key: fs.readFileSync(path.join(__dirname, './certificates/server/localhost-key.pem')),  //RSA key file read synchronously
        cert: fs.readFileSync(path.join(__dirname, './certificates/server/localhost.pem')),     //Server certificate file read synchronously
        passphrase:'cibertron'                                                                  //Passphrase for the certificate
    };
    const secureApp = https.createServer(sslOptions, app).listen(process.env.PORT_SSL);         //Https server creation through https module in the proper port
    debug('SERVER HTTPS: Launched and listening on PORT %d', process.env.PORT_SSL);             //Debug message
}