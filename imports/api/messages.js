import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) { 
	Meteor.publish('messages', function(userLocation) {
		return Messages.find({
			'userLocation': userLocation
		});
	});
}

Meteor.methods({

	'message.updateUserName'(currentUserName, newUserName) {
		check(currentUserName, String);
		check(newUserName, String);
		Messages.update(
			{ 'username': currentUserName }, 
			{ $set: { 'username': newUserName } },
			{ multi: true }
		);
	},


	'message.insert'(text) {
		Messages.insert({
			'text': text,
			'createAt': new Date(),
			'userLocation': Meteor.user().profile.location,
			'userId': Meteor.userId(),
			'username': Meteor.user().username
		})
	}
})