import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import FORM from '../classes/FormUIClass.jsx';


export default class SigninUI extends FORM{

	constructor(props) {
    	super(props);
 
    	this.state = {
        	signinEmailEmpty: true,
        	signinPasEmpty: true,
      	};
    }

	submitSignin(event) {
	    event.preventDefault();
	    
		let email = ReactDOM.findDOMNode(this.refs.signin_email).value;
		let pas = ReactDOM.findDOMNode(this.refs.signin_pas).value;
		
		Meteor.loginWithPassword(email, pas, ( err ) => {
				if ( err ) {
					ReactDOM.findDOMNode(this.refs.errorBox)
										.innerHTML = err.reason;
				}
		});
	}

	render() {

		return (
		   		<form className='form' ref='form' 
		   				onSubmit={this.submitSignin.bind(this)}>
		   			<input 
		   				ref='signin_email' 
		   				onChange={this.onFieldChange.bind(this, 'siginEmailEmpty')} 
		   				placeholder='email'/>
		   			
		   			<input 
		   				ref='signin_pas' type='password' 
		   				onChange={this.onFieldChange.bind(this, 'signinPasEmpty')} 
		   				placeholder='password'/>
		   			
		   			<div className = 'error-box' ref='errorBox'></div>
		   			
		   			<input 
		   				className='submit-button' 
		   				type='submit' 
		   				disabled = {this.state.siginEmailEmpty || 
		   					this.state.signinPasEmpty
		   				}
		   				value='SignIn'/>
		   		</form>
	)}
}