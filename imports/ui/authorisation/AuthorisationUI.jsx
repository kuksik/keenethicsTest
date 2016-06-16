import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import  SigninUI  from './SigninUI.jsx';
import  RegUI  from './RegistrationUI.jsx'



export default class AuthorisationUI extends Component {
	
	constructor(props) {
    	super(props);
 
    	this.state = {
        	signin: true,
      	};
    }

    changeState() {
    	this.setState( { signin: !this.state.signin });
    }

	render () {
		return ( 
			<div className = 'authorisation-target'>
				{
					this.state.signin ? 
					<SigninUI />:
					<RegUI />
				}

				<div className = 'show-form' onClick={this.changeState.bind(this)}>
		   			{
						this.state.signin ? 
						'Create new account' :
						'SignIn'
					}
		   		</div>
			</div>
		)
	}
}




