import '../imports/api/locations.js';
import '../imports/api/messages.js';
import '../imports/api/userAccount.js';

import { Meteor } from 'meteor/meteor';

Meteor.startup( () => { } );


Meteor.startup( function() {

	process.env.MAIL_URL = "smtp://postmaster%40sandbox27f4fdf1371744b4a4ceb9b381828c0a.mailgun.org:73eb0bb332cc016492afed8f4664d5e4@smtp.mailgun.org:587";
});