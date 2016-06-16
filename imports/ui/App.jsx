import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import AuthorizationUI from './authorization/AuthorizationUI.jsx';
import MessagesUI from './messages/MessagesUI.jsx';
import UserAccountUI from './userAccount/UserAccountUI.jsx';


class App extends Component {
	render() {
		
		return (
			
			this.props.currentUser ? 
				<div className='container'>
					<h1> Hello,  { this.props.currentUser.username } </h1>
					<UserAccountUI />
					{ this.props.currentUser.profile.location ? 
						<span>
							<h3>
								Your location: { 
									this.props.currentUser.profile.location }
							</h3>
							<MessagesUI /> 
						</span>
					: 
						<h3 style={{"color": "red"}}> 
							Please select your location 
						</h3>
					}		
				</div>
			:
				<div className='container'>
					<h1> Hello, dear Guest! </h1>
					<AuthorizationUI />
				</div>
				
		)	
	}
};


export default createContainer(() => {
  	return {
    	currentUser: Meteor.user(),
  	};
}, App);

				
					

					
					
					

				