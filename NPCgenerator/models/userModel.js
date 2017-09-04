﻿/************************************************************************************************************************************************************/
/* Module name: userModel.js                                                                                                                                */
/* Module description: Data model for the user                                                                                                              */
/* Author: Angel Minguez Burillo                                                                                                                            */
/* Date: 11-8-2017                                                                                                                                          */
/************************************************************************************************************************************************************/
'use strict'
const debug = require('debug')('userModel');
const dbPool = require('../config/dbConfig.js');                                                                //Import of the connection pool to the database
const hash = require('password-hash');                                                                          //Hash package for hashing passwords
const randomString = require('randomstring');                                                                   //Module to generate random strings
const getUserQuery = 'SELECT * FROM user WHERE userName = ? or userMail = ?';                                   //Get user function query string
const activationQuery = 'call activateUser(?, @user); select @user';                                            //Activation stored procedure query string
const createUserQuery = 'call createUser(?,?,?,?)';
// Class definition of the user data model
// The errors generated by this methods have the following structure
//  {type: TYPE OF ERROR,
//   message: ERROR DESCRIPTION }
module.exports.userModel = class userModel {                                                                    //The user model is exported           
    static getUserByName(name, mail) {                                                                          //Static method for user search
        let userPromise = new Promise((resolve, reject) => {                                                    //The method will return a promise with the results
            dbPool.getConnection((err, connection) => {                                                         //Use on of the pool connections
                if (connection) {                                                                               //Connection is picked successfuly
                    connection.query(getUserQuery, [name, mail], (err, results, fields) => {                    //Launch of the select query
                        connection.release();                                                                   //Query done callback: Dispose the connection
                        if (err) {                                                                              //Error in the database procesing the query
                            debug(err);                                                                         //Debug the error message
                            reject({ type: 'USER_SEARCH_ERROR', message: err });                                //Rejection of the promise with an error object
                        }
                        if (results.length >  0) resolve(new User(results[0]));                                 //User found, resolve the promise with a new generated user object
                        else reject({ type: 'USER_NOT_FOUND', message:null });                                  //User not found, promise rejection with an error
                    });
                }
                if (err) {                                                                                                          //Error while adquiring the connection
                    debug(err);                                                                                                     //Debug the error
                    reject({ type: 'CONNECTION_ERROR', message: err.code + (err.sqlMessage ? ' MSG: ' + err.sqlMessage : '') });    //Promise rejection with the error
                }
            });   
        });
        return userPromise;                                                                                     //The method returns the promise
    }
    static setUser(user) {                                                                                      //Method for creating a new user
        let registrationPromise = new Promise((resolve, reject) => {                                            //The promise that represents the database response
            dbPool.getConnection((err, connection) => {                                                         //Pick one of the connections of the pool
                if (connection) {                                                                               //Connection picked successfuly
                    user.userPwd = hash.generate(user.userPwd);                                                 //Generation of the hash of the pwd
                    let rndStr = randomString.generate(15);                                                     //Creation of the activation key
                    connection.query(createUserQuery, [user.userPwd, user.userName, user.userMail, rndStr],     //Query that launches the stored procedure to create the new user
                    (err, results, fields) => {                                                                 //Callback with query resuls
                        connection.release();                                                                   //Return the connection to the pool
                        if (err) {                                                                              //If error in the query process
                            debug(err);                                                                         //Debug message with the error
                            reject({ type: 'USER_CREATION_ERROR', message: err });                              //Promise rejection with the error message
                        }
                        if (results[0][0].result == 1)  resolve({ type: 'USER_CREATION_OK', userName: user.userName, actKey: rndStr }); //User created successfuly promise resolve appending the activation string to compose the email
                        if (results[0][0].result == -1) resolve({ type: 'DUPLICATE_USER', userName: user.userName });                   //Duplicate user resolution
                        if (results[0][0].result == -2) resolve({ type: 'DUPLICATE_MAIL', userMail: user.userMail });                   //Duplicate mail resolution
                    });
                }
                else if (err) {                                                                                             //Error while adquiring the connection
                    debug(err);                                                                                             //Debug message with error
                    reject('CONNECTION_ERROR: ' + err.code + (err.sqlMessage ? ' MSG: ' + err.sqlMessage : ''));            //Promise rejection with the error message
                }
            });      
        });
        return registrationPromise;                                                                                         //The method returns the promise
    }
    static activateUser(rndStr) {                                                                                           //Static method for user Activation
        let activationPromise = new Promise((resolve, reject) => {                                                          //Creation of a promise to return to the caller the activation result
            dbPool.getConnection((err, connection) => {                                                                     //Pick one of the connections of the pool
                if (connection) {                                                                                           //Connection picked
                    connection.query(activationQuery, [rndStr], (err, results, fields) => {                                 //Launch the activation stored procedure
                        connection.release();                                                                               //Connection release to the pool
                        if (err) {                                                                                          //If error in the query process
                            debug(err);                                                                                     //Debug message with the error
                            reject({ type: 'USER_ACTIVATION_ERROR', message: err });                                        //Promise rejection with the error message
                        }
                        else {                                                                                                              //Stored procedure executed successfuly
                            if (results[0][0].result==1) resolve({ type: 'USER_ACTIVATION_SUCCESS', userName: results[2][0] });             //Stored procedure returns '1': resolve with success status 
                            if (results[0][0].result==0) resolve({ type: 'USER_ACTIVATION_TIMEOUT', userName: results[2][0] });             //Stored procedure returns '0': resolve with timedout status 
                            if (results[0][0].result==-1)resolve({ type: 'USER_ACTIVATION_ERROR', message: 'Activation entry not found!'}); //Stored procedure returns '-1': resolve with fail status   
                        } 
                    });
                }
                if (err) {                                                                                                  //Error while adquiring the connection
                    debug(err);                                                                                             //Debug message with error
                    reject('CONNECTION_ERROR: ' + err.code + (err.sqlMessage ? ' MSG: ' + err.sqlMessage : ''));            //Promise rejection with the error message
                }
            });
        });
        return activationPromise;                                                                                           //The method returns the promise
    }
}
// Class User, represents the user table on the database
class User {
    constructor(_user) {                                            
        this.userId = _user.userId || null;
        this.userName = _user.userName || null;
        this.userMail = _user.userMail || null;
        this.userPwd = _user.userPwd || null;
        this.userCreationTime = _user.userCreationTime || null;
        this.userLastLogin = _user.userLastLogin || null;
    }
}
module.exports.User = User;                                         // Export of the user representation
// Stored procedures for documentation purpose:
//USER ACTIVATION
/*create procedure activateUser (in rndStr char(15), out _user varchar(100))
	begin
		declare _activationTime datetime;
		declare _activationId int(10);
		declare _toolate boolean;
        declare exit handler for sqlexception
			begin
                rollback;
                select 'Error: SQL Exception';
            end;
        start transaction;
            if ((select count(us.userName) from user as us
				inner join activation as act on us.userId = act.userId
				where act.activationKey = rndStr and us.userActivated = false) = 1)
			then
				select us.userName, us.userCreationTime, act.activationId into _user, _activationTime, _activationId
					from user as us
					inner join activation as act on us.userId = act.userId
					where act.activationKey = rndStr and us.userActivated = false;
				select if(date_add(_activationTime, interval 1 day) < now(), true, false) into _toolate;
				if _toolate = true then
					select 0;
					delete from activation where activationId = _activationId;
				else
					select 1;
					update user set userActivated = true where userName = @_user;
                    update user set userActivationTime = now();
					delete from activation where activationId = _activationId;
				end if;
			else
				select -1;
				set _user = null;
			end if;
		commit;
    end//*/
// NEW USER CREATION
/*create procedure createUser (in _pwdHash binary(64), in _userName varchar(100), in _userMail varchar(100), in _rndStr char(15))
	begin
		declare exit handler for sqlexception
			begin
                rollback;
                select 'Error: SQL Exception';
            end;
		start transaction;
			if ((select count(userName) from user where userName = _userName) = 1) then
				select -1 as 'result';
			elseif ((select count(userName) from user where userMail = _userMail) = 1) then
					select -2 as 'result';
			else
				insert into user values (null, _userName, _userMail, _pwdHash, now(), null, null, false);
				insert into activation values (null, last_insert_id(), _rndStr);
                select 1 as 'result';
			end if;
        commit;
	end//*/