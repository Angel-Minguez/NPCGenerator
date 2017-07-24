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
/********************************************************************************************************/
const logger = require('./logger.js')({ path:'../logs/hola.txt' });
logger.log("Hola");
logger.log("Hola1");
logger.log("Hola2");

setTimeout(()=>{logger.log("Hola3")}, 10000);

// Boot messages
console.log("NPC Generator booting ...");
console.log("Parsing command line arguments ...");
// We load environment variables with npm package config variables if they exits, if not we load default values
// Package config variables are used if we launch the app through "npm start" if not then the command line
// arguments will be used instead.
process.env.NODE_ENV = process.env.npm_package_config_environment || 'developement';	//Environment setup
process.env.PORT = process.env.npm_package_config_port || 11981;						//Server listening port
process.env.DEBUG = process.env.npm_package_config_debug || '*';						//Modules wich have debug messages enabled
process.env.SESSION = process.env.npm_package_config_session || 'memory';		        //Type of storage for sessions
process.env.SECURE_DB = process.env.npm_package_config_securedb || 'ssl';               //Enable ssl connections on databases
process.env.SECURE = process.env.npm_package_config_secure || 'off';                    //Enable HTTPS
process.env.DB_CONNECT_URL = process.env.npm_package_config_dbConnect                   //Connection string for the database
|| '';	                
process.env.DB_SESSION_CONNECT_URL = process.env.npm_package_config_dbSessionConnect    //Connection string to the session database
|| '';   
//Argument parsing
console.log('[Node.js executable location]: %s', process.argv[0]);                      //First argument contains the node.exe path
console.log('[Application executable location]: %s', process.argv[1]);                  //Second argument contains the main file of the package
process.argv.splice(0, 2);                                                              //Once shown we splice these two arguments
process.argv.forEach((_arg, index) => {                                                 //Cycle through the rest of arguments
    let _argv = _arg.split(':', 2);                                                     //Split the key and value parts of each argument
    switch (_argv[0]) {                                                                 //Swich case for every argument
        case '--session': {                                                             //Session storage
            if (_argv[1] == 'db' || _argv[1] == 'memory') {                             //Check for correct argument values
                process.env.SESSION_STORAGE = _argv[1];                                 
                break;
            }
        }
        case '--port': {                                                                //Server listening port
            if (parseInt(_argv[1]) > 10000 && parseInt(_argv[1]) < 20000) {             //Check for correct argument values
                process.env.PORT = _argv[1];                                            //Assignation of the value to the environment variable
                break;
            }
        }
        case '--debug': {                                                               //Modules whith debug messages enabled
            const appModules = ['*', '-not_this', 'server'];                            //List of application modules
            let debugModules = _argv[1].replace(' ', '').split(',');                    //Parsing of the module list input by user
            for (let i = 0; i < debugModules.length; i++) {                             //Cycle through modules in the argument list
                if (appModules.indexOf(debugModules[i]) == -1) {                        //Search for each argument in the list of avalaible modules
                    delete debugModules[i];                                             //If the module is not present is deleted
                    console.log('ERROR parsing debug modules: %s is not a valid module', debugModules[i]);  //We inform the user about the error
                }
            }
            process.env.DEBUG = debugModules.toString();                                //Finaly we transform the vector in a comma separated string
            break;
        }
        case '--environment': {                                                         //Node environment
            if (_argv[1] == 'developement' || _argv[1] == 'production') {               //Check for correct argument values
                process.env.NODE_ENV = _argv[1];                                        //Assignation of the value to the environment variable
                break;
            }
        }
        case '--secure': {                                                              //Enable HTTPS mode
            if (_argv[1] == 'ssl' || _argv[1] == 'off') {                               //Check for correct argument values
                process.env.SECURE = _argv[1];                                          //Assignation of the value to the environment variable
                break;
            }
        }
        case '--securedb': {                                                            //Secure option for the database connection
            if (_argv[1] == 'ssl' || _argv[1] == 'off') {                               //Check for correct argument values
                process.env.SECURE_DB = _argv[1];                                       //Assignation of the value to the environment variable
                break;
            }
        }     
        default: {                                                                      //In case of bad argument formatting
            console.log('ERROR parsing command line: invalid argument!');               //Error messages for the user
            console.log('Type --help for a list of avalaible parameters.');
            console.log('Terminating ...');
            process.exit();                                                             //End of execution of the script
        }
    }     
});
require('../server.js');                                                                //Finaly if the script doesnt end beacuse a error, server module is required
