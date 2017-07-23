/********************************************************************************************************/
/* Module: Log creation and configuration                                                               */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 7-23-2017                                                                                      */
/* Options for the logger module input as a JSON object with these properties:                          */
/* --session: <db|memory>                   (Session storage in database or in server memory)           */
/* --port: <number>                         (Listening port for the server)                             */
/* --environment: <developement|production> (Lifecicle setup for the application)                       */
/* --debug: <*| module1, module2 ...>       (Configuration of debug messages per module)                */
/* --securedb: <off|ssl>                    (Enable SSL on database connection)                         */
/* --secure: <off|ssl>                      (Enable HTTPS)                                              */
/********************************************************************************************************/