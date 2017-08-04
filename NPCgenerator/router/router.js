/********************************************************************************************************/
/* Module name: router.js                                                                               */
/* Module description: Routing module, it will link controllers with server paths                       */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 03-8-2017                                                                                      */
/********************************************************************************************************/
'use strict'        
module.exports = function router(app) {                                         //Simple function to link routes and route handlers    
    app.get('/*', require('./../controllers/indexMain.js'));                    //Default route sends hook html for the angular application
    //CORS test
    app.post('/login', (req, res, next) => {
        console.log(req.body);
        res.end();
    });
}