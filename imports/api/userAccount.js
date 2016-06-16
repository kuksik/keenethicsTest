import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Messages } from './messages.js'

import { Accounts } from 'meteor/accounts-base'

Meteor.methods({

	

	'accounts.setName'(newUserName) {
		check(newUserName, String)
		Accounts.setUsername( Meteor.userId(), newUserName );
	},

	'accounts.setEmail'(newEmail) {
		check(newEmail,String);

		if ( Accounts.findUserByEmail(newEmail) ) {
			return { err: true };
		}
		else {	
			Meteor.users.update (
				{ '_id': Meteor.userId() }, 
				{$set: { 'emails.0.address': newEmail }}
			);

			return { err: false };
		}
	},

	'accounts.setLocation'(location) {
		check(location, String);
		Meteor.users.update(
			{ '_id': Meteor.userId() },
			{ $set: { 'profile.location': location } }
		)
	}
});


