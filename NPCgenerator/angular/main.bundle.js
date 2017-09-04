webpackJsonp([1,4],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_activation_service__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModalComponent; });
/* unused harmony export userLoginFormModel */
/* unused harmony export isLoginResult */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/****************************************************************************************************************************************/
/*	Module name: login-modal.component.ts																								*/
/* 	Module description: Login modal component, displays the modal and retireves the user input then send it to server for validation	*/
/*	Author: Angel Minguez Burillo																										*/
/*	Date: 5/8/2017																														*/
/****************************************************************************************************************************************/
/* Imports */
 //Component decorator and viewencapsulation metadata atribute
 //Modal service
 //Http module for comunicating with the server

/* Component metadata */
var LoginModalComponent = (function () {
    /* Contructor */
    function LoginModalComponent(activeModal, //ng-bootstrap modal service injection
        activationService, http) {
        this.activeModal = activeModal;
        this.activationService = activationService;
        this.http = http;
        this.model = new userLoginFormModel(); //Instance creation of the model object
        this.loginUrl = 'https://127.0.0.1:11982/login'; //Initialization of login server url
        this.showLoginResult = false; //Flag for alert visibility
        this.showActivationMessage = false;
        this.alertOptions = {
            message: '',
            type: 'danger',
            dismiss: true //Alert dismissible
        };
    }
    /* Method to display the alert with the login results */
    LoginModalComponent.prototype.showAlertMessage = function (options) {
        this.alertOptions.message = options.message; //Assination of the desired message
        this.alertOptions.type = options.type || 'danger'; //Assignation of the type
        this.alertOptions.dismiss = options.dismiss || true; //Assignation of the dispmissible property
        this.showLoginResult = true; //Set to true the flag to show the alert
    };
    /* Method to hide the alert div */
    LoginModalComponent.prototype.hideAlert = function () {
        this.showLoginResult = false; //Set to false the flag to show the alert	
    };
    /* Password recovery modal launch method */
    LoginModalComponent.prototype.recoveryModal = function () {
        this.activeModal.close({ result: { result: false, error: 'N/A' }, exit: 'RECOVERY' }); //Close the login modal and send a signal to parent component to open recovery modal
    };
    /* Method for closing the modal, cancelling it */
    LoginModalComponent.prototype.close = function () {
        this.activeModal.dismiss('Dismissed by user'); //Dismisses the modal with a info message
    };
    /* Submit login info method */
    LoginModalComponent.prototype.accept = function () {
        var _this = this;
        this.http.post(this.loginUrl, this.model).subscribe(//XMLHttp post request, it returns an observable with the server response
        function (response) {
            if (isLoginResult(response)) {
                if (response.result)
                    _this.activeModal.close({ result: response, exit: 'SUBMIT' }); //User found: modal is closed and response passed as promise to parent component
                else
                    _this.showAlertMessage({ message: ' Username or password are incorrect.' }); //User not found: alert message launched
            }
            else
                _this.showAlertMessage({ message: ' Error, server bad response.' }); //Server response is invalid, a proper alert message is displayed
        }, function (error) { _this.showAlertMessage({ message: ' Error, no server response.' }); } //If an error in the comunication with server happens an alert is shown
        );
    };
    LoginModalComponent.prototype.ngOnInit = function () {
        this.showActivationMessage = this.activationService.activationStatus; //Capture the status of the flag indicating request came from /activation
    };
    return LoginModalComponent;
}());
LoginModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Component */])({
        selector: 'ngbd-modal-content',
        template: __webpack_require__(257),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* ViewEncapsulation */].None,
        styles: [__webpack_require__(246), __webpack_require__(245), __webpack_require__(155)]
    })
    /* Component class */
    ,
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbActiveModal */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_activation_service__["a" /* ActivationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_activation_service__["a" /* ActivationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]) === "function" && _c || Object])
], LoginModalComponent);

/* Form data model */
var userLoginFormModel = (function () {
    function userLoginFormModel(userName, userPwd, rememberFlag) {
        this.userName = userName || ''; //Initialization of user name property
        this.userPwd = userPwd || ''; //Initialization of password property
        this.rememberFlag = rememberFlag || false; //Initialization of remember me flag property
    }
    return userLoginFormModel;
}());

/* Custom type guard for the server response */
function isLoginResult(arg) {
    if (arg.result === undefined ||
        arg.error === undefined ||
        arg.user === undefined)
        return false;
    else
        return true; //The guard returns a boolean is the type is correct
}
var _a, _b, _c;
//# sourceMappingURL=login-modal.component.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecoveryModalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RecoveryModalComponent = (function () {
    function RecoveryModalComponent() {
    }
    RecoveryModalComponent.prototype.ngOnInit = function () {
    };
    return RecoveryModalComponent;
}());
RecoveryModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Component */])({
        selector: 'app-recovery-modal',
        template: __webpack_require__(259),
        styles: [__webpack_require__(248)]
    }),
    __metadata("design:paramtypes", [])
], RecoveryModalComponent);

//# sourceMappingURL=recovery-modal.component.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(45);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterModalComponent; });
/* unused harmony export userRegisterFormModel */
/* unused harmony export isRegisterResult */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/****************************************************************************************************************************************/
/*	Module name: register-modal.component.ts																							*/
/* 	Module description: Register modal component, displays the modal and retireves the user input then send it to server for validation	*/
/*	Author: Angel Minguez Burillo																										*/
/*	Date: 15/8/2017																														*/
/****************************************************************************************************************************************/
/* Imports */
 //Component decorator and viewencapsulation metadata atribute
 //Modal service
 //Http module for comunicating with the server
 //Ng-Bootstrap alert service for configuring alerts
/* Component metadata */
var RegisterModalComponent = (function () {
    /* Constructor */
    function RegisterModalComponent(activeModal, //ng-bootstrap modal service injection
        alertConfig, //Ng-Bootstrap alert service for configuring alerts
        http) {
        this.activeModal = activeModal;
        this.alertConfig = alertConfig;
        this.http = http;
        this.model = new userRegisterFormModel(); //Instance creation of the model object
        this.registerUrl = 'https://127.0.0.1:11982/register'; //Registration URL
        this.showRegisterResult = false; //Initialization of register alert visibility flag
        this.showAlertUser = false; //Initialization of user alert visibility flag
        this.showAlertMail = false; //Initialization of mail alert visibility flag
        this.alertOptions = {
            message: '',
            type: 'danger',
            dismiss: false //Alert dismissible
        };
    }
    /* Method to show and config alerts */
    RegisterModalComponent.prototype.showAlertMessage = function (alert, options) {
        this.hideAlert('all'); //Hides the user and mail alerts
        switch (alert) {
            case 'userName': {
                this.showAlertUser = true;
                break;
            } //Set to true the flag to show the invalid user alert							
            case 'userMail': {
                this.showAlertMail = true;
                break;
            } //Set to true the flag to show the invalid mail alert
            case 'register': {
                this.showRegisterResult = true;
                break;
            } //Set to true the flag to show the general error alert
        }
        this.alertOptions.message = options.message; //Assination of the desired message
        this.alertConfig.type = this.alertOptions.type = options.type || 'danger'; //Assignation of the type
        this.alertConfig.dismissible = this.alertOptions.dismiss = options.dismiss; //Assignation of the dispmissible property	
    };
    /* Method to hide the alert div */
    RegisterModalComponent.prototype.hideAlert = function (alert) {
        if (alert == 'register')
            this.showRegisterResult = false; //Set to false the flag to show the general error alert
        if (alert == 'user')
            this.showAlertUser = false; //Set to false the flag to show the invalid user alert
        if (alert == 'mail')
            this.showAlertMail = false; //Set to false the flag to show the invalid mail alert
        if (alert == 'all')
            this.showAlertUser = this.showRegisterResult = this.showAlertMail = false; //Set to false the flag to show the invalid mail and user alerts
    };
    /* Register modal close method */
    RegisterModalComponent.prototype.close = function () {
        this.activeModal.dismiss('Dismissed by user'); //Dismisses the modal with a info message
    };
    /* Register modal accept button method */
    RegisterModalComponent.prototype.accept = function () {
        var _this = this;
        this.http.post(this.registerUrl, this.model).subscribe(//XMLHttp post request, it returns an observable with the server response
        function (response) {
            if (!isRegisterResult(response))
                _this.showAlertMessage('register', { message: ' Bad server response!', dismiss: true }); //Type check on response, if failed it shows an alert message
            else {
                if (response.result)
                    _this.activeModal.close({ result: response, exit: 'SUCCESS' }); //User creation successful, close the modal and informs parent component
                else {
                    console.log(response.error); //Debug message with the error returned by the server
                    if (response.error.type == 'DUPLICATE_USER')
                        _this.showAlertMessage('userName', { message: 'Error: User name already exists' }); //User already exists error handler
                    if (response.error.type == 'DUPLICATE_MAIL')
                        _this.showAlertMessage('userMail', { message: 'Error: E-mail already in use' }); //Mail already used error handler
                    if (response.error.type == 'REQUEST_FORMAT_ERROR')
                        _this.showAlertMessage('register', { message: 'Error: ' + response.error.message, dismiss: true }); //Server received a bad formatted request
                    if (response.error.type == 'USER_CREATION_ERROR')
                        _this.showAlertMessage('register', { message: 'Error while creating the new user', dismiss: true }); //Database error while creating the new user entry
                    if (response.error.type == 'CONNECTION_ERROR')
                        _this.showAlertMessage('register', { message: 'Cannot connect with server, please try again later', dismiss: true }); //Server did not respond
                    if (response.error.type == 'MAIL_TRANSPORT_ERROR')
                        _this.showAlertMessage('register', { message: 'A problem occurred while sending the confirmation e-mail', dismiss: true }); //Server mail module failed
                }
            }
        }, function (error) {
            _this.hideAlert('all'); //Hide user and mail alerts
            _this.showAlertMessage('register', { message: ' No server response!', dismiss: true }); //Show general alert with the error message
        });
    };
    return RegisterModalComponent;
}());
RegisterModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Component */])({
        selector: 'app-register-modal',
        providers: [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbAlertConfig */]],
        template: __webpack_require__(260),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* ViewEncapsulation */].None,
        styles: [__webpack_require__(249), __webpack_require__(155)]
    })
    /* Component */
    ,
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbActiveModal */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbAlertConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbAlertConfig */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]) === "function" && _c || Object])
], RegisterModalComponent);

/* Form data model */
var userRegisterFormModel = (function () {
    function userRegisterFormModel(userName, userMail, userPwd, userRepeatPwd) {
        this.userName = userName || ''; //Initialization of user name property
        this.userMail = userMail || ''; //Initialization of the user mail property
        this.userPwd = userPwd || ''; //Initialization of password property
        this.userRepeatPwd = userRepeatPwd || ''; //Initialization of password confirmation property
    }
    return userRegisterFormModel;
}());

/* Type guard for registerResult interface */
function isRegisterResult(arg) {
    if (arg.result === undefined)
        return false; //Check for result property
    if (arg.error === undefined)
        return false; //Check for error property
    if (arg.error.type === undefined ||
        arg.error.message === undefined)
        return false; //Check for error.message property
    return true; //If all checks passed, true is returned
}
var _a, _b, _c;
//# sourceMappingURL=register-modal.component.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterSuccessModalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

 //Modal service
var RegisterSuccessModalComponent = (function () {
    function RegisterSuccessModalComponent(activeModal) {
        this.activeModal = activeModal;
    }
    RegisterSuccessModalComponent.prototype.closeModal = function () {
        this.activeModal.close();
    };
    RegisterSuccessModalComponent.prototype.ngOnInit = function () { };
    return RegisterSuccessModalComponent;
}());
RegisterSuccessModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Component */])({
        selector: 'app-register-success-modal',
        template: __webpack_require__(261),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* ViewEncapsulation */].None,
        styles: [__webpack_require__(250)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbActiveModal */]) === "function" && _a || Object])
], RegisterSuccessModalComponent);

var _a;
//# sourceMappingURL=register-success-modal.component.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* unused harmony export User */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/****************************************************************************************************************/
/*	Module name: user.service.ts																				*/
/* 	Module description: Service that keeps and provides the current logged user									*/
/*	Author: Angel Minguez Burillo																				*/
/*	Date: 5/8/2017																								*/
/****************************************************************************************************************/
//Imports
 //Injectable decorator
//Injectable metadata
var UserService = (function () {
    //Constructor
    function UserService() {
        this.user = new User(); //Creation of the new object
    }
    UserService.prototype.setUser = function (user) {
        this.user = user;
    };
    UserService.prototype.getUser = function () {
        return this.user;
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
    //UserService class
    ,
    __metadata("design:paramtypes", [])
], UserService);

//Current logged user object, it will hold the info of the current user
var User = (function () {
    function User(arg) {
        if (!arg) {
            this.userName = 'guest'; //Load default values for the rest 
            this.userCreationTime = null;
            this.userLastLogin = null;
            this.userMail = null;
        }
        if (typeof arg === 'string') {
            this.userName = arg; //Use the string as username
            this.userCreationTime = null; //Load default values
            this.userLastLogin = null;
            this.userMail = null;
        }
        if (typeof arg === 'object') {
            this.userName = arg.userName; //Load JSON properties into the User object
            this.userCreationTime = new Date(arg.userCreationTime);
            this.userLastLogin = new Date(arg.userLastLogin);
            this.userMail = arg.userMail;
        }
    }
    User.prototype.getUserName = function () {
        return this.userName;
    };
    User.prototype.getUserCreationTime = function () {
        return this.userCreationTime;
    };
    User.prototype.getUserLastLogin = function () {
        return this.userLastLogin;
    };
    User.prototype.getUserMail = function () {
        return this.userMail;
    };
    return User;
}());

;
;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "/* Common styles for form elements */\r\nlabel{\r\n\tmargin-bottom:.25em;\r\n}\r\n.alert{\r\n\tmargin-left:15px;\r\n\tmargin-right:15px;\r\n}\r\n#pwdForgotLink{\r\n\tfloat:left;\r\n}\r\n.form-control{\r\n\tfont-size:0.9em;\r\n}\r\n.text-muted{\r\n\tfont-size:0.75em;\r\n}\r\n.input-group-addon{\r\n\tbackground-color:#bbb;\r\n\tborder:none;\r\n\tcolor:white;\r\n}\r\n.validity-addon{\r\n\twidth:5px;\r\n\tpadding:0;\r\n}\r\ninput::-webkit-input-placeholder { color: #bbb !important; } /* Chrome */\r\ninput:-moz-placeholder { color: #bbb !important; } /* Firefox 18- */\r\ninput::-moz-placeholder { color: #bbb !important; } /* Firefox 19+ */\r\ninput:-ms-input-placeholder { color: #bbb !important; } /* Explorer */", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 169:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 169;


/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(186);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/****************************************************************************************/
/*	Module name: app.component.ts														*/
/* 	Module description: Angular application root component								*/
/*	Author: Angel Minguez Burillo														*/
/*	Date: 4/8/2017																		*/
/****************************************************************************************/
//Imports
 //Main component for root module
//Component metadata
var AppComponent = (function () {
    //Component class
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Component */])({
        selector: 'app',
        template: __webpack_require__(254),
        styles: [__webpack_require__(242)] //CSS file for the template
    })
    //Component class
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_app_nav_app_nav_component__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_landing_landing_component__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_register_modal_register_modal_component__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_login_modal_login_modal_component__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_recovery_modal_recovery_modal_component__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_register_success_modal_register_success_modal_component__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_user_service__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_activation_service__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/****************************************************************************************/
/*	Module name: app.module.ts															*/
/* 	Moduke description: Angular application root module									*/
/*	Author: Angel Minguez Burillo														*/
/*	Date: 4/8/2017																		*/
/****************************************************************************************/
var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_8__components_landing_landing_component__["a" /* LandingComponent */] },
    { path: 'activation', component: __WEBPACK_IMPORTED_MODULE_8__components_landing_landing_component__["a" /* LandingComponent */] }
];
//Imports
 //The ng module for the browser
 //Ng module decorator and metadata
 //Ng module for form manipulation
 //Ng module for http protocol comunication
 //Router module for navigation inside the application
 //Application root component
 //ng-bootstrap module
 //Navigation component
 //Landing component
 //Component for login interface
 //Modal dialog component for registering users
 //Modal dialog component for login								
 //Modal dialog component for password recovery
 //Modal dialog component with sucessfull registration message
 //Service to keep track of the current logged user
 //Service that triggers login component login modal	upon account activation																			
//Module metadata
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_app_nav_app_nav_component__["a" /* AppNavComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_landing_landing_component__["a" /* LandingComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_login_modal_login_modal_component__["a" /* LoginModalComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_recovery_modal_recovery_modal_component__["a" /* RecoveryModalComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_register_modal_register_modal_component__["a" /* RegisterModalComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_register_success_modal_register_success_modal_component__["a" /* RegisterSuccessModalComponent */] //Modal dialog component with sucessfull registration message
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_11__components_login_modal_login_modal_component__["a" /* LoginModalComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_recovery_modal_recovery_modal_component__["a" /* RecoveryModalComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_register_modal_register_modal_component__["a" /* RegisterModalComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_register_success_modal_register_success_modal_component__["a" /* RegisterSuccessModalComponent */] //Modal dialog component with sucessfull registration message
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
            __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot() //ng-bootstrap module, forRoot function deploys all bootstrap modules
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_14__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_15__services_activation_service__["a" /* ActivationService */] //Service that triggers login component login modal	upon account activation
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]] //Link this component to the launch of the app 
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppNavComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/****************************************************************************************/
/*	Module name: app-nav.component.ts													*/
/* 	Module description: Main menu component												*/
/*	Author: Angel Minguez Burillo														*/
/*	Date: 4/8/2017																		*/
/****************************************************************************************/
//Imports
 //Component decorator and OnInit lifecycle hook
//Component metadata
var AppNavComponent = (function () {
    function AppNavComponent() {
    }
    AppNavComponent.prototype.ngOnInit = function () { };
    return AppNavComponent;
}());
AppNavComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Component */])({
        selector: 'appNav',
        template: __webpack_require__(255),
        styles: [__webpack_require__(243)] //CSS file for the template
    })
    //Component class
    ,
    __metadata("design:paramtypes", [])
], AppNavComponent);

//# sourceMappingURL=app-nav.component.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_activation_service__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LandingComponent = (function () {
    function LandingComponent(route, router, activationService) {
        this.route = route;
        this.router = router;
        this.activationService = activationService;
    }
    LandingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.url.subscribe(function (route) {
            if (route.length > 0) {
                if (route[0].path === 'activation') {
                    _this.activationService.fromValidation(true);
                    _this.router.navigate(['']);
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    return LandingComponent;
}());
LandingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Component */])({
        selector: 'appLanding',
        template: __webpack_require__(256),
        styles: [__webpack_require__(244)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_activation_service__["a" /* ActivationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_activation_service__["a" /* ActivationService */]) === "function" && _c || Object])
], LandingComponent);

var _a, _b, _c;
//# sourceMappingURL=landing.component.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_activation_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__recovery_modal_recovery_modal_component__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_success_modal_register_success_modal_component__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_modal_login_modal_component__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__register_modal_register_modal_component__ = __webpack_require__(140);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/********************************************************************************************************************************/
/*	Module name: login.component.ts																								*/
/* 	Module description: Login logic component, it manages register and login modals and sets the current user and auth token	*/
/*	Author: Angel Minguez Burillo																								*/
/*	Date: 5/8/2017																												*/
/********************************************************************************************************************************/
//Imports
 //Component decorator and OnInit lifecycle hook
 //Service that keeps and provides the current logged user
 //Modal service

 //Recovery modal component
 //Recovery modal component
 //Type for login modal comunication with this component
 //Type for register modal comunication with this component
//Component metadata
var LoginComponent = (function () {
    /* Constructor */
    function LoginComponent(userService, //Injection of user service
        activationService, modalService) {
        this.userService = userService;
        this.activationService = activationService;
        this.modalService = modalService;
    } //Injection of ng-bootstrap modal service
    /* Open modal method accepts a component as argument */
    LoginComponent.prototype.openLoginModal = function () {
        var _this = this;
        var modalRef = this.modalService.open(__WEBPACK_IMPORTED_MODULE_6__login_modal_login_modal_component__["a" /* LoginModalComponent */], { windowClass: 'app-modal' }); //Ng-bootstrap open method, with custom style class
        modalRef.result.then(//The result property contains a promise with the result of the modal
        function (result) {
            if (result.exit === 'RECOVERY')
                _this.openRecovery();
            console.log(result);
        }, function (reason) {
            _this.activationService.fromValidation(false);
            console.log(reason);
        });
    };
    LoginComponent.prototype.openRegisterModal = function () {
        var _this = this;
        var modalRef = this.modalService.open(__WEBPACK_IMPORTED_MODULE_7__register_modal_register_modal_component__["a" /* RegisterModalComponent */], { windowClass: 'app-modal' });
        modalRef.result.then(function (result) {
            _this.openRegisterSuccess();
        }, function (reason) {
            console.log(reason);
        });
    };
    LoginComponent.prototype.openRecovery = function () {
        var recoveryModalRef = this.modalService.open(__WEBPACK_IMPORTED_MODULE_4__recovery_modal_recovery_modal_component__["a" /* RecoveryModalComponent */], { windowClass: 'recovery-modal' });
        recoveryModalRef.result.then(function (result) { }, function (error) { });
    };
    LoginComponent.prototype.openRegisterSuccess = function () {
        var registerSuccessModalRef = this.modalService.open(__WEBPACK_IMPORTED_MODULE_5__register_success_modal_register_success_modal_component__["a" /* RegisterSuccessModalComponent */], { windowClass: 'app-modal' });
        registerSuccessModalRef.result.then(function (result) { }, function (error) { });
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activationService.isFromValidation().subscribe(function (response) { if (response)
            setTimeout(function () { _this.openLoginModal(); }, 0); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Component */])({
        selector: 'appLogin',
        template: __webpack_require__(258),
        styles: [__webpack_require__(247)],
    })
    //Component class
    ,
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_activation_service__["a" /* ActivationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_activation_service__["a" /* ActivationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */]) === "function" && _c || Object])
], LoginComponent);

var _a, _b, _c;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "/* Root component styles */\r\n@media(min-width:1000px) {\r\n\t.gridContainer {\r\n\t\tdisplay:-ms-grid;\r\n\t\tdisplay:grid;\r\n\t\t-ms-grid-rows: [row1-start] 40px [row1-end row2-start] 1000px [row2-end row3-start] 40px [row3-end];\r\n\t\t    grid-template-rows: [row1-start] 40px [row1-end row2-start] 1000px [row2-end row3-start] 40px [row3-end];\r\n\t\t-ms-grid-columns: [col1-start] 50% [col1-end col2-start] 50% [col-2end];\r\n\t\t    grid-template-columns: [col1-start] 50% [col1-end col2-start] 50% [col-2end];\r\n\t\tgrid-template-areas:\r\n\t\t\t\"header \\9header\"\r\n\t\t\t\"body \\9\\9  body\"\r\n\t\t\t\"footer \\9  footer\";\r\n\t\twidth: 100%;\r\n\t\theight: 1080px;\r\n\t}\r\n}\r\n@media(max-width:1000px) {\r\n\t.gridContainer {\r\n\t\tdisplay:-ms-grid;\r\n\t\tdisplay:grid;\r\n\t\t-ms-grid-rows: [row1-start] 40px [row1-end row2-start] 1000px [row2-end row3-start] 40px [row3-end];\r\n\t\t    grid-template-rows: [row1-start] 40px [row1-end row2-start] 1000px [row2-end row3-start] 40px [row3-end];\r\n\t\t-ms-grid-columns: [col1-start] 50% [col1-end col2-start] 50% [col-2end];\r\n\t\t    grid-template-columns: [col1-start] 50% [col1-end col2-start] 50% [col-2end];\r\n\t\tgrid-template-areas:\r\n\t\t\t\"header \\9header\"\r\n\t\t\t\"body \\9\\9  body\"\r\n\t\t\t\"footer \\9  footer\";\r\n\t\twidth: 100%;\r\n\t\theight: 1080px;\r\n\t}\r\n}\r\n.item-a{\r\n\tgrid-area: header;\r\n\tdisplay: -ms-grid;\r\n\tdisplay: grid;\r\n\t-ms-grid-rows: [row1-start] 100% [row1-end];\r\n\t    grid-template-rows: [row1-start] 100% [row1-end];\r\n\t-ms-grid-columns: [col1-start] 10% [col1-end col2-start] auto [col2-end col3-start] 20% [col3-end];\r\n\t    grid-template-columns: [col1-start] 10% [col1-end col2-start] auto [col2-end col3-start] 20% [col3-end];\r\n\tgrid-template-areas:\r\n\t\t\"logo\\9menu\\9login\";\r\n}\r\n.item-aa{\r\n\tgrid-area: logo;\r\n\tbackground-color:yellow;\r\n}\r\n.item-ab{\r\n\tgrid-area: menu;\r\n\tbackground-color:pink;\r\n}\r\n.item-ac{\r\n\tgrid-area: login;\r\n}\r\n.item-b{\r\n\tgrid-area: body;\r\n\tbackground-color:blue;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, ".gridContainer {\r\n\tdisplay:-ms-grid;\r\n\tdisplay:grid;\r\n\t-ms-grid-rows: [row1-start] 100% [row1-end];\r\n\t    grid-template-rows: [row1-start] 100% [row1-end];\r\n\t-ms-grid-columns: [col1-start] auto [col1-end col2-start] auto [col2end col3-start] auto [col3-end];\r\n\t    grid-template-columns: [col1-start] auto [col1-end col2-start] auto [col2end col3-start] auto [col3-end];\r\n\tgrid-template-areas:\r\n\t\t\"link1 \\9link2\\9link3\";\r\n\theight:100%;\r\n\twidth:100%;\r\n}\r\n.item-a{\r\n\tgrid-area: link1;\r\n\tbackground-color:green;\r\n}\r\n.item-b{\r\n\tgrid-area: link2;\r\n\tbackground-color:white;\r\n}\r\n.item-c{\r\n\tgrid-area: link3;\r\n\tbackground-color:lime;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "/* Custom checkbox */\r\n.fancy-checkbox{\r\n\tfloat: right;\r\n}\r\n.fancy-checkbox input[type=\"checkbox\"] {\r\n    display: none;\r\n}\r\n.fancy-checkbox span:before {\r\n    font-family: \"FontAwesome\";\r\n    font-style: normal;\r\n    width: 1em;\r\n    height: 1em;\r\n    content: '\\F0C8';\r\n    margin-right: .3em;\r\n\tfont-size:15px;\r\n\tcolor:#636c72;\r\n}\r\n.fancy-checkbox input[type=\"checkbox\"]:checked ~ span:before {\r\n    content: '\\F14A';\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "/* Modal login styles */ \r\n/* Container styles */\r\n.app-modal{\r\n\ttop: 10vw;\r\n}\r\n.modal-open{\r\n\toverflow: initial !important;\r\n}\r\n/* CSS grid layout */\r\n.gridLoginModalContainer{\r\n\t/* Modal body has a padding of 15px, so real height is (Height-30px) */\r\n\tdisplay:-ms-grid;\r\n\tdisplay:grid;\r\n\t-ms-grid-rows: [row1-start] minmax(50px,auto) [row1-end row2-start] minmax(85px,auto) \r\n\t\t\t\t\t\t[row2-end row3-start] 85px [row3-end row4-start] 50px [row4-end];\r\n\t    grid-template-rows: [row1-start] minmax(50px,auto) [row1-end row2-start] minmax(85px,auto) \r\n\t\t\t\t\t\t[row2-end row3-start] 85px [row3-end row4-start] 50px [row4-end];\r\n\t-ms-grid-columns: [col1-start] calc(50% - 5px) [col1-end col2-start] calc(50% - 5px) [col2end];\r\n\t    grid-template-columns: [col1-start] calc(50% - 5px) [col1-end col2-start] calc(50% - 5px) [col2end];\r\n\tgrid-template-areas:\r\n\t\t\"title\\9\\9\\9title\"\r\n\t\t\"userInput\\9\\9userInput\"\r\n\t\t\"userPwd\\9\\9userPwd\"\r\n\t\t\"cancelButton\\9  acceptButton\";\r\n\theight:auto;\r\n\twidth:500px;\r\n\tgrid-column-gap:10px;\r\n\t-webkit-box-align: center;\r\n\t    -ms-flex-align: center;\r\n\t        align-items: center;\r\n}\r\n.itemLoginModal-a{\r\n\tgrid-area: title;\r\n}\r\n.itemLoginModal-b{\r\n\tgrid-area: userInput;\r\n}\r\n.itemLoginModal-c{\r\n\tgrid-area: userPwd;\r\n}\r\n.itemLoginModal-d{\r\n\tgrid-area: acceptButton;\r\n\t-ms-flex-item-align:center;\r\n\t    -ms-grid-row-align:center;\r\n\t    align-self:center;\r\n}\r\n.itemLoginModal-e{\r\n\tgrid-area: cancelButton;\r\n\t-ms-flex-item-align:center;\r\n\t    -ms-grid-row-align:center;\r\n\t    align-self:center;\r\n}\r\n/* Other styles */\r\n.title {\r\n\ttext-align:center;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "/* Login component styles */\r\n.gridContainer {\r\n\tdisplay:-ms-grid;\r\n\tdisplay:grid;\r\n\t-ms-grid-rows: [row1-start] 100% [row1-end];\r\n\t    grid-template-rows: [row1-start] 100% [row1-end];\r\n\t-ms-grid-columns: [col1-start] 50% [col1-end col2-start] 50% [col2end];\r\n\t    grid-template-columns: [col1-start] 50% [col1-end col2-start] 50% [col2end];\r\n\tgrid-template-areas:\r\n\t\t\"login-userCombo \\9register-logout\";\r\n\t-webkit-box-align: center;\r\n\t    -ms-flex-align: center;\r\n\t        align-items: center;\r\n\theight:100%;\r\n\twidth:100%;\r\n}\r\n.item-a{\r\n\tgrid-area: login-userCombo;\r\n\tmargin-right:5px;\r\n\tbackground-color:yellow;\r\n}\r\n.item-b{\r\n\tgrid-area: register-logout;\r\n\tmargin-right:5px;\r\n\tbackground-color:silver;\r\n}\r\n.btn-wide {\r\n\tpadding: 20% 0;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "/* Modal register styles */\r\n/* Container styles */ \r\n.app-modal{\r\n\ttop: 10vw;\r\n}\r\n.modal-open{\r\n\toverflow: initial !important;\r\n}\r\n/* CSS grid layout */\r\n.gridRegisterModalContainer{ \r\n\t/* Modal body has a padding of 15px, so real height is (Height-30px) */\r\n\tdisplay:-ms-grid;\r\n\tdisplay:grid;\r\n\t-ms-grid-rows: [row1-start] 50px [row1-end row2-start] minmax(85px,auto)\r\n\t\t\t\t\t\t[row2-end row3-start] minmax(80px,auto) [row3-end row4-start] minmax(85px,auto) \r\n\t\t\t\t\t\t[row4-end row5-start] 80px [row5-end row6-start] 50px [row6-end];\r\n\t    grid-template-rows: [row1-start] 50px [row1-end row2-start] minmax(85px,auto)\r\n\t\t\t\t\t\t[row2-end row3-start] minmax(80px,auto) [row3-end row4-start] minmax(85px,auto) \r\n\t\t\t\t\t\t[row4-end row5-start] 80px [row5-end row6-start] 50px [row6-end];\r\n\t-ms-grid-columns: [col1-start] calc(50% - 5px) [col1-end col2-start] calc(50% - 5px) [col2end];\r\n\t    grid-template-columns: [col1-start] calc(50% - 5px) [col1-end col2-start] calc(50% - 5px) [col2end];\r\n\tgrid-template-areas:\r\n\t\t\"title\\9\\9\\9title\"\r\n\t\t\"userInput\\9\\9userInput\"\r\n\t\t\"userMail\\9\\9userMail\"\r\n\t\t\"userPwd\\9\\9userPwd\"\r\n\t\t\"userRepeatPwd\\9userRepeatPwd\"\r\n\t\t\"acceptButton\\9  cancelButton\";\r\n\theight:auto;\r\n\twidth:500px;\r\n\tgrid-column-gap:10px;\r\n\t-webkit-box-align: center;\r\n\t    -ms-flex-align: center;\r\n\t        align-items: center;\r\n}\r\n.itemRegisterModal-a{\r\n\tgrid-area: title;\r\n}\r\n.itemRegisterModal-b{\r\n\tgrid-area: userInput;\r\n}\r\n.itemRegisterModal-c{\r\n\tgrid-area: userMail;\r\n}\r\n.itemRegisterModal-d{\r\n\tgrid-area: userPwd;\r\n}\r\n.itemRegisterModal-e{\r\n\tgrid-area: userRepeatPwd;\r\n}\r\n.itemRegisterModal-f{\r\n\tgrid-area: acceptButton;\r\n\t-ms-flex-item-align:center;\r\n\t    -ms-grid-row-align:center;\r\n\t    align-self:center;\r\n}\r\n.itemRegisterModal-g{\r\n\tgrid-area: cancelButton;\r\n\t-ms-flex-item-align:center;\r\n\t    -ms-grid-row-align:center;\r\n\t    align-self:center;\r\n}\r\n/* Other styles */\r\n.valid{\r\n\tbackground-color:green !important;\r\n}\r\n.invalid{\r\n\tbackground-color:red !important;\r\n}\r\n.inputAlert .alert{\r\n\tmargin-top:10px;\r\n\tmargin-bottom:0px;\r\n\tmargin-left:0px;\r\n\tmargin-right:0px;\r\n}\r\n.title {\r\n\ttext-align:center;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 254:
/***/ (function(module, exports) {

module.exports = "<!-- Root component -->\n<section class=\"gridContainer\">\n\t<div class=\"item-a\">\n\t\t<div class=\"item-aa\" id=\"logo\">\n\t\t\tlogo\n\t\t</div>\n\t\t<div class=\"item-ab\" id=\"menu\">\n\t\t\t<appNav></appNav>\n\t\t</div>\n\t\t<div class=\"item-ac\" id=\"login\">\n\t\t\t<appLogin></appLogin>\n\t\t</div>\n\t</div>\n\t<div class=\"item-b\">\n\t\t<router-outlet></router-outlet>\n\t</div>\n\t<div class=\"item-c\">\n\t</div>\n</section>\n"

/***/ }),

/***/ 255:
/***/ (function(module, exports) {

module.exports = "<section class=\"gridContainer\">\n\t<div class=\"item-a\">\n\t\tapp-nav-1\n\t</div>\n\t<div class=\"item-b\">\n\t\tapp-nav-2\n\t</div>\n\t<div class=\"item-c\">\n\t\tapp-nav-3\n\t</div>\n</section>\n"

/***/ }),

/***/ 256:
/***/ (function(module, exports) {

module.exports = "<p>\n  landing works!\n</p>\n"

/***/ }),

/***/ 257:
/***/ (function(module, exports) {

module.exports = "<!-- Login modal template -->\n<form #loginForm=\"ngForm\" (ngSubmit)=\"accept()\">\n\t<section class=\"gridLoginModalContainer modal-body\">\n\t\t<div class=\"itemLoginModal-a\" id=\"title\">\n\t\t\t<h4 class=\"title\" *ngIf=\"showActivationMessage\">Account successfully activated</h4>\n\t\t\t<h4 class=\"title\">Please enter your user name and password</h4>\n\t\t</div>\n\t\t<div class=\"itemLoginModal-b\" id=\"userInput\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"userNameInput\">User name</label>\n\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t<i class=\"fa fa-trophy fa-fw\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"userNameInput\" placeholder=\"Enter your user name\" required=\"true\"\n\t\t\t\t\t[(ngModel)]=\"model.userName\" name=\"userName\" #userNameInput (focus)=\"hideAlert()\" autofocus>\n\t\t\t\t</div>\n\t\t\t\t<small id=\"userNameHelp\" class=\"form-text text-muted\">If you don't remember your user name you can use your registered e-mail.</small>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"itemLoginModal-c\" id=\"pwdInput\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"userPwdInput\">Password</label>\n\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t<i class=\"fa fa-unlock-alt fa-fw\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<input type=\"password\" class=\"form-control\" id=\"userPwdInput\" placeholder=\"Enter your password\" required=\"true\"\n\t\t\t\t\t[(ngModel)]=\"model.userPwd\" name=\"userPwd\" (focus)=\"hideAlert()\">\n\t\t\t\t</div>\n\t\t\t\t<small id=\"userPwdHelp\" class=\"form-text text-muted\">\n\t\t\t\t\t<a id=\"pwdForgotLink\" (click)=\"recoveryModal()\">Forgot four password? Click here.</a>\n\t\t\t\t\t<label class=\"fancy-checkbox\">\n\t\t\t\t\t\t<input type=\"checkbox\"  [(ngModel)]=\"model.rememberFlag\" name=\"rememberFlag\">\n\t\t\t\t\t\t<span>Remember me</span>\n\t\t\t\t\t</label>\t\n\t\t\t\t</small>\t\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"itemLoginModal-d\" id=\"closeButton\">\n\t\t\t<button type=\"button\" class=\"btn btn-secondary btn-block\" (click)=\"close()\">Close</button>\n\t\t</div>\n\t\t<div class=\"itemLoginModal-e\" id=\"acceptButton\">\n\t\t\t<button type=\"submit\" class=\"btn btn-primary btn-block\" [disabled]=\"!loginForm.form.valid\">Accept</button>\n\t\t</div>\n\t</section>\n\t<ngb-alert [type]=\"alertOptions.type\" [dismissible]=\"alertOptions.dismiss\" *ngIf=\"showLoginResult\" (close)=\"hideAlert()\" >\n\t\t<strong>Error!</strong>{{alertOptions.message}}\n\t</ngb-alert>\n</form>"

/***/ }),

/***/ 258:
/***/ (function(module, exports) {

module.exports = "<!-- Login component template -->\n<section class=\"gridContainer\">\n\t<div class=\"item-a\" id=\"login-userCombo\">\t\t\n\t\t<button *ngIf=\"userService.getUser().userName == 'guest'\" class=\"btn btn-primary btn-block btn-wide\" (click)=\"openLoginModal()\">Login</button>\n\t\t<button *ngIf=\"userService.getUser().userName != 'guest'\" class=\"btn btn-primary btn-block btn-wide\">{{userService.getUser().userName}}</button>\n\t</div>\n\t<div class=\"item-b\" id=\"register-logout\">\n\t\t<button class=\"btn btn-primary btn-block btn-wide\" (click)=\"openRegisterModal()\">Register </button>\n\t</div>\n</section>"

/***/ }),

/***/ 259:
/***/ (function(module, exports) {

module.exports = "<p>\n  recovery-modal works!\n</p>\n"

/***/ }),

/***/ 260:
/***/ (function(module, exports) {

module.exports = "<!-- Register modal template -->\n<form #registerForm=\"ngForm\" (ngSubmit)=\"accept()\">\n\t<section class=\"gridRegisterModalContainer modal-body\">\n\t\t<div class=\"itemRegisterModal-a\" id=\"title\">\n\t\t\t<h4 class=\"title\">Register as a new user</h4>\n\t\t</div>\n\t\t<div class=\"itemRegisterModal-b\" id=\"userInput\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"userNameInput\">User name</label>\n\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t<i class=\"fa fa-trophy fa-fw\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"userNameInput\" placeholder=\"Enter your user name\" required=\"true\"\n\t\t\t\t\t[(ngModel)]=\"model.userName\" name=\"userName\" pattern=\".{4,}\" #userNameInput=\"ngModel\" autofocus (keyup)=\"hideAlert('user')\">\n\t\t\t\t\t<span class=\"input-group-addon validity-addon\" [ngClass]=\"{'valid':userNameInput.valid, \n\t\t\t\t\t'invalid':!userNameInput.valid && userNameInput.value!='' || showAlertUser}\"></span>\n\t\t\t\t</div>\n\t\t\t\t<small id=\"userNameHelp\" class=\"form-text text-muted\">\n\t\t\t\t\tValid user names must be at least four characters long\n\t\t\t\t</small>\n\t\t\t\t<ngb-alert *ngIf=\"showAlertUser \" class=\"inputAlert\">{{alertOptions.message}}</ngb-alert>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"itemRegisterModal-c\" id=\"mailInput\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"userMailInput\">E-mail</label>\n\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t<i class=\"fa fa-envelope fa-fw\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"userMailInput\" placeholder=\"Enter your e-mail\" required=\"true\"\n\t\t\t\t\t[(ngModel)]=\"model.userMail\" name=\"userMail\" pattern=\"^.+[@]{1}.+[.]{1}.{2,4}$\" #userMailInput=\"ngModel\" (keyup)=\"hideAlert('mail')\">\n\t\t\t\t\t<span class=\"input-group-addon validity-addon\" [ngClass]=\"{'valid':userMailInput.valid, \n\t\t\t\t\t'invalid':(!userMailInput.valid && userMailInput.value!='') || showAlertMail}\"></span>\n\t\t\t\t</div>\n\t\t\t\t<ngb-alert *ngIf=\"showAlertMail\" class=\"inputAlert\">{{alertOptions.message}}</ngb-alert>\n\t\t\t</div>\t\t\n\t\t</div>\n\t\t<div class=\"itemRegisterModal-d\" id=\"pwdInput\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"userPwdInput\">Password</label>\n\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t<i class=\"fa fa-unlock-alt fa-fw\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<input type=\"password\" class=\"form-control\" id=\"userPwdInput\" placeholder=\"Enter your password\" required=\"true\"\n\t\t\t\t\t[(ngModel)]=\"model.userPwd\" name=\"userPwd\" pattern=\"(?=.*\\d)(?=.*[a-zA-Z]).{8,}\" #userPwdInput=\"ngModel\">\n\t\t\t\t\t<span class=\"input-group-addon validity-addon\" [ngClass]=\"{'valid':userPwdInput.valid, 'invalid':!userPwdInput.valid && userPwdInput.value!=''}\"></span>\n\t\t\t\t</div>\n\t\t\t\t<small id=\"userPwdHelp\" class=\"form-text text-muted\">\n\t\t\t\t\tValid passwords must be at least eight characters long and include letters and numbers\n\t\t\t\t</small>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"itemRegisterModal-e\" id=\"pwdRepeatInput\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"userRepeatPwdInput\">Reenter your password</label>\n\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t<i class=\"fa fa-unlock-alt fa-fw\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<input type=\"password\" class=\"form-control\" id=\"userRepeatPwdInput\" placeholder=\"Confirm your password\" required=\"true\"\n\t\t\t\t\t[(ngModel)]=\"model.userRepeatPwd\" name=\"userRepeatPwd\" #userRepeatPwd>\n\t\t\t\t\t<span class=\"input-group-addon validity-addon\" \n\t\t\t\t\t[ngClass]=\"{'valid':userPwdInput.valid && userPwdInput.value==userRepeatPwd.value, \n\t\t\t\t\t\t\t\t'invalid':(!userPwdInput.valid || userPwdInput.value!=userRepeatPwd.value)&& userRepeatPwd.value!=''}\"></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"itemRegisterModal-f\" id=\"closeButton\">\n\t\t\t<button type=\"button\" class=\"btn btn-secondary btn-block\" (click)=\"close()\">Close</button>\n\t\t</div>\n\t\t<div class=\"itemRegisterModal-g\" id=\"acceptButton\">\n\t\t\t<button type=\"submit\" class=\"btn btn-primary btn-block\" [disabled]=\"!registerForm.form.valid || showAlertMail || showAlertUser\">Accept</button>\n\t\t</div>\n\t</section>\n\t<ngb-alert *ngIf=\"showRegisterResult\" (close)=\"hideAlert('register')\" >\n\t\t{{alertOptions.message}}\n\t</ngb-alert>\n</form>"

/***/ }),

/***/ 261:
/***/ (function(module, exports) {

module.exports = "<!-- Register success modal template -->\n<section>\n\t<div class=\"modal-body\">\n\t\t<h4>Registration succesful!</h4>\n\t\t<p>A message has been sent to your mail account to confirm your registration, please follow the link found on it to finish the registration process</p>\n\t\t<button class=\"btn btn-primary btn-block\"(click)=\"closeModal()\">Accept</button>\n\t</div>\n</section>\n"

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(170);


/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/****************************************************************************************************************************************/
/*	Module name: activation.service.ts																									*/
/* 	Module description: Service to comunicate through components that an account has been activated										*/
/*	Author: Angel Minguez Burillo																										*/
/*	Date: 23/8/2017																														*/
/****************************************************************************************************************************************/
/* Imports */
 //Injectable decorator
 //Subject module
/* Injectable metadata */
var ActivationService = (function () {
    /* Constructor */
    function ActivationService() {
        this.subject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"](); //Instanciason of the subject
        this.activationStatus = false; //Initialization of the status flag
    }
    ActivationService.prototype.fromValidation = function (flag) {
        this.subject.next(flag); //Subject will emit the parameter passed
        this.activationStatus = flag; //Actualization of the status flag
    };
    ActivationService.prototype.isFromValidation = function () {
        return this.subject.asObservable(); //The subject observable is returned
    };
    return ActivationService;
}());
ActivationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
    /* Service */
    ,
    __metadata("design:paramtypes", [])
], ActivationService);

//# sourceMappingURL=activation.service.js.map

/***/ })

},[294]);
//# sourceMappingURL=main.bundle.js.map