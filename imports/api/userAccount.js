import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Messages } from './messages.js'


Meteor.methods({

	'accounts.setPassword'(data) {
		
		check(data, {
			currentPas: String,
			newPas: String
		});
      	
      	if ( Accounts._checkPassword( Meteor.user(), data.currentPas ).error ) {
      		return { err: true }
      	}
      	else {
      		Accounts.setPassword(Meteor.userId(), data.newPas, {logout: false} )
      		return {err: false}
      	}
	},

	'accounts.setName'(newName) {
		check(newName, String)
		Messages.update(
			{'username': Meteor.user().profile.name}, 
			{ $set: { 'username': newName } },
			{multi: true}
		);

		Meteor.users.update(
			{ '_id': Meteor.userId() }, 
			{ $set: { 'profile.name': newName }}
		);
	},

	'accounts.setEmail'(newEmail) {
		check(newEmail,String);
		console.log(newEmail)
		console.log( Meteor.users.find( { 'emails.0/address': newEmail } ).fetch()  )
		// Meteor.users.update (
		// 	{ '_id': Meteor.userId() }, 
		// 	{$set: { 'emails.0.address': newEmail }}
		// )
	},

	'accounts.setLocation'(location) {
		check(location, String);
		Meteor.users.update(
			{ '_id': Meteor.userId() },
			{ $set: { 'profile.location': location } }
		)
	}
});


