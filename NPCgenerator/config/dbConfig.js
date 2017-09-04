/********************************************************************************************************/
/* Module name: bdConfig.js                                                                             */
/* Module description: Connection and configuration of the MySQL database                               */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 01-8-2017                                                                                      */
/********************************************************************************************************/
'use strict'
/* Dependencies */
const fs = require('fs');                                               //File system manipulation module
const debug = require('debug')('dbConfig');                             //Debug module
const mySQL = require('mysql');                                         //Nodejs MYSQL driver module
let dbPoolOptions = {                                                   //JSON object with option for the creation of the connection pool
    connectionLimit: process.env.MAX_POOL,                              //Maximum connections for the pool
    multipleStatements: true,                                           //Support for multiple statements in query
    database: global.mainDataBaseInfo.database,                         //Database name
    host: mainDataBaseInfo.host,                                        //Database connection host for the user
    user: mainDataBaseInfo.user,                                        //Database user
    password: 'wallofwind@1981'                                         //Password for the database user
};
if (process.env.SECURE_DB == 'ssl') dbPoolOptions.ssl = {               //If the TLS option is enabled
    ca: fs.readFileSync(__dirname + './../certificates/db/ca.pem')      //We add the content of the certificate to the options object
};
let dbConnectionPool = mySQL.createPool(dbPoolOptions);                 //Creation of the pool through the MYSQL driver
debug('MYSQL Pool connection options:\n %O', dbPoolOptions);            //Debug message with the pool options
debug('MYSQL Connection pool created!');                                //Debug message adverting the creation of the pool
module.exports = dbConnectionPool;                                      //Export the pool object, connections will be created through this object