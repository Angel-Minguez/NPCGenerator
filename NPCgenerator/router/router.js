/********************************************************************************************************/
/* Module name: router.js                                                                               */
/* Module description: Routing module, it will link controllers with server paths                       */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 03-8-2017                                                                                      */
/********************************************************************************************************/
'use strict'
const loginMain = require('../controllers/loginMain.js');
const registerMain = require('../controllers/registerMain.js');
const validateAccount = require('../controllers/validateAccount.js');
module.exports = function router(app) {                                         //Simple function to link routes and route handlers    
   
    //CORS test
    app.post('/login', loginMain);
    app.param('valKey', validateAccount);
    app.get('/register/:valKey', registerMain);
    app.post('/register', registerMain);
    app.get('/*', require('./../controllers/indexMain.js'));                    //Default route sends hook html for the angular application
}