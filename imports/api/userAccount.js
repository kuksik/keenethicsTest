import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Messages } from './messages.js'

import { Accounts } from 'meteor/accounts-base'

Meteor.methods({

	'sendVerificationEmail'() {
		console.log('sendEMail')
		Accounts.sendVerificationEmail(Meteor.userId(), 'nazarkukarkin@gmail.com')
	},

	'accounts.setName'(newUserName) {
		check(newUserName, String)
		Accounts.setUsername( Meteor.userId(), newUserName );
	},

	'accounts.setEmail'(newEmail) {
		check(newEmail,String);

		// Email.send({
  //     		to: 'smaggot@ukr.net',
  //     		from: "keeneticsTest@gmail.com",
  //  	   	    subject: "Your order confirmed!",
  //  	   		html: 'hello'
  //   	});  

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


