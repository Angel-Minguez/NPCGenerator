#!/usr/bin/env node
/********************************************************************************************************/
/* Module name: bootScript.js                                                                           */
/* Module description: Boot script for NPC Generator                                                    */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 7-22-2017                                                                                      */
/* OPTIONS:                                                                                             */
/* --session: <db|memory>                   (Session storage in database or in server memory)           */
/* --port: <number>                         (Listening port for the server)                             */
/* --environment: <developement|production> (Lifecicle setup for the application)                       */
/* --debug: <*| module1, module2 ...>       (Configuration of debug messages per module)                */
/* --securedb: <off|ssl>                    (Enable SSL on database connection)                         */
/* --secure: <off|ssl>                      (Enable HTTPS)                                              */
/* --help                                   (Show a list of valid arguments)                            */
/********************************************************************************************************/
'use strict'
/* Dependencies */
const stdin = process.openStdin();                                                      //Open the stdin to capture key events                                          
stdin.setRawMode(true);                                                                 //Configuration of stdin in raw mode
const debug = require('debug');                                                         //Debug messages module
const logger = require('./logger.js')({                                                 //Logger module, to keep a log of application booting messages
    dump: __dirname + './../logs/bootDump.txt',                                         //DumpLog file path
    path: __dirname + './../logs/bootLog.txt',                                          //Main log file path
    dateFormat: '[dd/mm/yyyy]',                                                         //Format string for the date timestamp
    timeFormat: '[hh:nn:ss:uuu]',                                                       //Format string for the time timestamp
    rotation: 'size',                                                                   //Rotation mode, size
    rotationPeriod: 100,                                                                //The rotation will keep the last 100Kb of data in the main log
    silent: true                                                                        //The log wont echo its messages to the console
});
// Boot messages
logger.log("NPC Generator booting ...");
console.log("NPC Generator booting ...\nParsing command line arguments ...");
// We load environment variables with npm package config variables if they exits, if not we load default values
// Package config variables are used if we launch the app through "npm start" if not then the command line
// arguments will be used instead.
process.env.NODE_ENV = process.env.npm_package_config_environment || 'developement';	//Environment setup
process.env.PORT = process.env.npm_package_config_port || 11981;						//Server listening port for http
process.env.PORT_SSL = process.env.npm_package_config_portssl || 11982;				    //Server listening port for https
process.env.DEBUG = process.env.npm_package_config_debug || '*';						//Modules wich have debug messages enabled
process.env.SESSION = process.env.npm_package_config_session || 'memory';		        //Type of storage for sessions
process.env.SECURE_DB = process.env.npm_package_config_securedb || 'ssl';               //Enable ssl connections on databases
process.env.SECURE = process.env.npm_package_config_secure || 'off';                    //Enable HTTPS
process.env.MAX_POOL = process.env.npm_package_config_maxpool || 25;                    //Maximum pool of connections for the database
global.mainDataBaseInfo = {                                                             //Connection options for the database as a global object
    user: process.env.npm_package_config_main_user || 'npc_generator_user',             //User for the MySQL database
    host: process.env.npm_package_config_main_host || 'localhost',                      //Host for the MySQL database
    database: process.env.npm_package_config_main_database || 'NPCGenerator'            //Name of the database
};	                
process.env.DB_SESSION_CONNECT_URL = process.env.npm_package_config_dbSessionConnect    //Connection string to the session database
|| '';   
//Argument parsing
console.log('[Node.js executable location]: %s', process.argv[0]);                          //First argument contains the node.exe path
process.argv.splice(0, 2);                                                                  //Once shown we splice these two arguments
console.log('[Application booted with]: %s', process.argv);                                 //Show the current command line arguments
logger.log('Boot arguments %s', process.argv);                                              //Log of the current command line arguments
//Invalid argument managing function
function invalidArg(message) {
    if(message) console.log(message);                                                       //Shows the specific error message about the invalid argument
    validArgs = false;                                                                      //Sets the valid arguments flag to false
}
//End script function, logs and shows info about the errors and finish the script
function endScript() {                                              
    logger.log('ERROR parsing command line: invalid argument!');                            //Error message for the log
    logger.log('Terminating ...');                                                          //Exit message                                                      
    console.log('ERROR: Invalid argument! Type --help for a list of avalaible parameters.');//Error message for the user
    console.log('Press any key to finish the script.');                                     //Ask user for a key press                                                              
    stdin.on('data', function (chunk, key) {                                                //Event to capture user input
        if (chunk) process.exit();                                                          //End of execution of the script if a key is pressed
    });
}
if (process.argv[0] == '--help') {                                                          //If the user asks for help using --help
    process.argv.slice(0, 1);                                                               //Discard the argument, show help info and close the application
    console.log('List of avalaible options:');
    console.log('--session: <db|memory >                  (Session storage in database or in server memory)');        
    console.log('--port: <number>                         (Listening port for the http server)');
    console.log('--portssl: <number>                      (Listening port for the https server)');  
    console.log('--environment: <developement|production> (Lifecicle setup for the application)');
    console.log('--debug: <*| module1, module2 ...>       (Configuration of debug messages per module)');            
    console.log('--securedb: <off|ssl>                    (Enable SSL on database connection)');                      
    console.log('--secure: <off|ssl>                      (Enable HTTPS)');                                            
    console.log('--help                                   (Show a list of valid arguments)');
    process.exit();                                                                         
}
var validArgs = true;                                                                                   //Flag signaling that all arguments were valid
process.argv.forEach((_arg, index) => {                                                                 //Cycle through the rest of arguments
    let _argv = _arg.split(':', 2);                                                                     //Split the key and value parts of each argument
    switch (_argv[0]) {                                                                                 //Swich case for every argument
        case '--environment': {                                                                         //Node environment
            if (_argv[1] == 'developement' || _argv[1] == 'production') process.env.NODE_ENV = _argv[1];//Assignation of the value to the environment variable if valid
            else invalidArg('Environment not valid!');                                                  //If the value is not valid launch error function with a message
            break;
        }
        case '--session': {                                                                             //Session storage
            if (_argv[1] == 'db' || _argv[1] == 'memory') process.env.SESSION_STORAGE = _argv[1];       //Check for correct argument values and assign it if correct
            else invalidArg('Session storage parameter not valid!');                                    //If the value is not valid launch error function with a message
            break;
        }
        case '--port': {                                                                                //Server listening port
            if (parseInt(_argv[1])>10000 && parseInt(_argv[1])<20000) process.env.PORT = _argv[1];      //Check for correct argument values if so, assing it                           
            else invalidArg('Port out of valid range!');                                                //If the value is not valid launch error function with a message
            break;
        }
        case '--portssl': {                                                                             //Server listening port for https
            if (parseInt(_argv[1]) > 10000 && parseInt(_argv[1]) < 20000) process.env.PORT_SSL=_argv[1];//Check for correct argument values if so, assing it                           
            else invalidArg('Port out of valid range!');                                                //If the value is not valid launch error function with a message
            break;
        }
        case '--debug': {                                                                               //Modules whith debug messages enabled
            const appModules = ['*', '-not_this', 'server', 'dbConfig', 'logger', 'expressConfig'];     //List of application modules
            let debugModules = _argv[1].replace(' ', '').split(',');                                    //Parsing of the module list input by user
            for (let i = 0; i < debugModules.length; i++) {                                             //Cycle through modules in the argument list
                if (appModules.indexOf(debugModules[i]) == -1) {                                        //Search for each argument in the list of avalaible modules
                    delete debugModules[i];                                                             //If the module is not present is deleted
                    invalidArg('ERROR: Debug module [' + debugModules[i]+ '] is not a valid module');   //We inform the user about the error through error function
                }
            }
            process.env.DEBUG = debugModules.toString();                                                //Finaly we transform the vector in a comma separated string
            debug.enable(process.env.DEBUG);                                                            //Enable debug for the selected modules
            break;
        }
        case '--secure': {                                                                              //Enable HTTPS mode
            if (_argv[1] == 'ssl' || _argv[1] == 'off') process.env.SECURE = _argv[1];                  //Assignation of the value to the environment variable if valid
            else invalidArg('Secure option not valid!');                                                //If the value is not valid launch error function with a message
            break; 
        }
        case '--securedb': {                                                                            //Secure option for the database connection
            if (_argv[1] == 'ssl' || _argv[1] == 'off') process.env.SECURE_DB = _argv[1];               //Assignation of the value to the environment variable
            else invalidArg('Securedb option not valid!');                                              //If the value is not valid launch error function with a message
            break;
        }
        case '--maxpool': {                                                             //Option to configure the maximun number of connections of the connection pool
            if (_argv[1] > 0 && _argv[1] < 1000) process.env.MAX_POOL = _argv[1];       //Assignation of the value to the environment variable
            else invalidArg('Securedb option not valid!');                              //If the value is not valid launch error function with a message
            break;
        }     
        default: {                                                                      //In case of bad argument formatting
            invalidArg('Unknown argument:'+ _argv[0]);                                  //Launch the error function
        }
    }
});
if (validArgs) require('../server.js');                                                 //Finaly if the script doesnt end beacuse a error, server module is required
else endScript();                                                                       //If an error happened, we end the script
