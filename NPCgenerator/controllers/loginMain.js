/********************************************************************************************************/
/* Module name: loginMain.js                                                                            */
/* Module description: Controller for the route '/login'                                                */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 02-8-2017                                                                                      */
/********************************************************************************************************/
'use strict'
const debug = require('debug')('loginMain');                                                            //Module for debug messages
const userModel = require('../models/userModel.js').userModel;                                          //Imports the user model module
const User = require('../models/userModel.js').User;                                                    //Imports the User class definition
const jwt = require('jsonwebtoken');                                                                    //Module for creating and managing JWTs

let jwtOptions = {
    algorithm: 'HS512',
    issuer: 'npcHeaven',
    expiresIn: '24h',
}
const secret = 'ehj7UDBcWxucO7RxH4V0';

module.exports = function (req, res, next) {
    userModel.getUserByName(req.body.userName).then(
        (user) => {
            debug(user);
            if (req.body.rememberFlag) jwtOptions.expiresIn = '30 days';
            else jwtOptions.expiresIn = '24h';
            let token = jwt.sign({ user: user.userName }, secret, jwtOptions, (err, token) => {
                if (err) debug(err);
                else res.json({ success: true, user: user, token: token, error: null });
            });
        },
        (reject) => {
            debug(reject)
            res.json({ success: false, user: null, error: reject });
        });
}