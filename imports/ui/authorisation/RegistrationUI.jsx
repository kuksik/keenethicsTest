import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import FORM from '../classes/FormUIClass.jsx';


export default class RegistrationUI extends FORM{

	constructor(props) {
    	super(props);
 
    	this.state = {
        	
        	regNameEmpty: true,
        	regEmailEmpty: true,
        	regPasEmpty: true,
        	regConPasEmpty: true
      	};
    }

	submitReg(event) {
        event.preventDefault();

        let newUser = {
            email: ReactDOM.findDOMNode(this.refs.reg_email).value,
            password: ReactDOM.findDOMNode(this.refs.reg_pas).value,
            profile: {
                name: ReactDOM.findDOMNode(this.refs.reg_name).value
            }
        };

        if ( newUser.password !== 
        		ReactDOM.findDOMNode(this.refs.reg_con_pas).value ) { 

        	ReactDOM.findDOMNode(this.refs.form).
        		getElementsByClassName("error-box")[0]
        				.innerHTML = "Passwords do not match" ;
		}
        else { 
        	Accounts.createUser(newUser, (err) => {
           		if ( err ) { 
            		ReactDOM.findDOMNode(this.refs.form)
            			.getElementsByClassName("error-box")[0]
            								.innerHTML = err.reason
	            }
        	})
        }

	}

	render() {
		
		return (
		   		<form className='form' ref='form' 
		   				onSubmit={this.submitReg.bind(this)}>
		   			
		   			<input
		   				type = 'text' ref = "reg_name" 
                        placeholder = "name"
                        onChange={this.onFieldChange.bind(this, "regNameEmpty")}/>

                    <input
		   				type = 'text' ref = "reg_email"
                        placeholder = "email"	
                        onChange={this.onFieldChange.bind(this, "regEmailEmpty")}/>

                    <input
		   				type = 'password' ref = "reg_pas"
                        placeholder = "password"
                        onChange={this.onFieldChange.bind(this, "regPasEmpty")}/>

                    <input
		   				type = 'password' ref = "reg_con_pas"
                        placeholder = "confirm password"	
                        onChange={this.onFieldChange.bind(this, "regConPasEmpty")}/>
		   			

		   			<div className = 'error-box'></div>
		   			
		   			<input 
		   				className='submit-button' 
		   				type='submit' 
		   				disabled = {
		   					this.state.regNameEmpty ||
		   					this.state.regEmailEmpty || 
		   					this.state.regPasEmpty ||
		   					this.state.regConPasEmpty
		   				}
		   				value='Create new account'/>
		   		</form>
	)}
}