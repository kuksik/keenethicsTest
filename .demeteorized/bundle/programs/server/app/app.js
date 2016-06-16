var require = meteorInstall({"imports":{"api":{"locations.js":["meteor/meteor","meteor/mongo",function(require,exports){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/api/locations.js                                                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
exports.__esModule = true;                                                                                       //
exports.Locations = undefined;                                                                                   //
                                                                                                                 //
var _meteor = require('meteor/meteor');                                                                          // 1
                                                                                                                 //
var _mongo = require('meteor/mongo');                                                                            // 2
                                                                                                                 //
var Locations = exports.Locations = new _mongo.Mongo.Collection('locations');                                    // 4
                                                                                                                 //
if (_meteor.Meteor.isServer) {                                                                                   // 7
	_meteor.Meteor.publish('locations', function () {                                                               // 8
		return Locations.find({});                                                                                     // 9
	});                                                                                                             //
}                                                                                                                //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"messages.js":["meteor/meteor","meteor/mongo","meteor/check",function(require,exports){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/api/messages.js                                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
exports.__esModule = true;                                                                                       //
exports.Messages = undefined;                                                                                    //
                                                                                                                 //
var _meteor = require('meteor/meteor');                                                                          // 1
                                                                                                                 //
var _mongo = require('meteor/mongo');                                                                            // 2
                                                                                                                 //
var _check = require('meteor/check');                                                                            // 3
                                                                                                                 //
var Messages = exports.Messages = new _mongo.Mongo.Collection('messages');                                       // 5
                                                                                                                 //
if (_meteor.Meteor.isServer) {                                                                                   // 7
	_meteor.Meteor.publish('messages', function (userLocation) {                                                    // 8
		return Messages.find({                                                                                         // 9
			'userLocation': userLocation                                                                                  // 10
		});                                                                                                            //
	});                                                                                                             //
}                                                                                                                //
                                                                                                                 //
_meteor.Meteor.methods({                                                                                         // 15
	'message.updateUserName': function () {                                                                         // 17
		function messageUpdateUserName(currentUserName, newUserName) {                                                 //
			(0, _check.check)(currentUserName, String);                                                                   // 18
			(0, _check.check)(newUserName, String);                                                                       // 19
			Messages.update({ 'username': currentUserName }, { $set: { 'username': newUserName } }, { multi: true });     // 20
		}                                                                                                              //
                                                                                                                 //
		return messageUpdateUserName;                                                                                  //
	}(),                                                                                                            //
	'message.insert': function () {                                                                                 // 28
		function messageInsert(text) {                                                                                 //
			Messages.insert({                                                                                             // 29
				'text': text,                                                                                                // 30
				'createAt': new Date(),                                                                                      // 31
				'userLocation': _meteor.Meteor.user().profile.location,                                                      // 32
				'userId': _meteor.Meteor.userId(),                                                                           // 33
				'username': _meteor.Meteor.user().username                                                                   // 34
			});                                                                                                           //
		}                                                                                                              //
                                                                                                                 //
		return messageInsert;                                                                                          //
	}()                                                                                                             //
});                                                                                                              //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"userAccount.js":["meteor/meteor","meteor/mongo","meteor/check","./messages.js","meteor/accounts-base",function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/api/userAccount.js                                                                                    //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
var _meteor = require('meteor/meteor');                                                                          // 1
                                                                                                                 //
var _mongo = require('meteor/mongo');                                                                            // 2
                                                                                                                 //
var _check = require('meteor/check');                                                                            // 3
                                                                                                                 //
var _messages = require('./messages.js');                                                                        // 5
                                                                                                                 //
var _accountsBase = require('meteor/accounts-base');                                                             // 7
                                                                                                                 //
_meteor.Meteor.methods({                                                                                         // 9
	'accounts.setName': function () {                                                                               // 13
		function accountsSetName(newUserName) {                                                                        //
			(0, _check.check)(newUserName, String);                                                                       // 14
			_accountsBase.Accounts.setUsername(_meteor.Meteor.userId(), newUserName);                                     // 15
		}                                                                                                              //
                                                                                                                 //
		return accountsSetName;                                                                                        //
	}(),                                                                                                            //
	'accounts.setEmail': function () {                                                                              // 18
		function accountsSetEmail(newEmail) {                                                                          //
			(0, _check.check)(newEmail, String);                                                                          // 19
                                                                                                                 //
			if (_accountsBase.Accounts.findUserByEmail(newEmail)) {                                                       // 21
				return { err: true };                                                                                        // 22
			} else {                                                                                                      //
				_meteor.Meteor.users.update({ '_id': _meteor.Meteor.userId() }, { $set: { 'emails.0.address': newEmail } });
                                                                                                                 //
				return { err: false };                                                                                       // 30
			}                                                                                                             //
		}                                                                                                              //
                                                                                                                 //
		return accountsSetEmail;                                                                                       //
	}(),                                                                                                            //
	'accounts.setLocation': function () {                                                                           // 34
		function accountsSetLocation(location) {                                                                       //
			(0, _check.check)(location, String);                                                                          // 35
			_meteor.Meteor.users.update({ '_id': _meteor.Meteor.userId() }, { $set: { 'profile.location': location } });  // 36
		}                                                                                                              //
                                                                                                                 //
		return accountsSetLocation;                                                                                    //
	}()                                                                                                             //
});                                                                                                              //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"server":{"main.js":["../imports/api/locations.js","../imports/api/messages.js","../imports/api/userAccount.js","meteor/meteor",function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// server/main.js                                                                                                //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
require('../imports/api/locations.js');                                                                          // 1
                                                                                                                 //
require('../imports/api/messages.js');                                                                           // 2
                                                                                                                 //
require('../imports/api/userAccount.js');                                                                        // 3
                                                                                                                 //
var _meteor = require('meteor/meteor');                                                                          // 5
                                                                                                                 //
_meteor.Meteor.startup(function () {});                                                                          // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json",".jsx"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
