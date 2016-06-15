import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';


import FORM from '../classes/FormUIClass.jsx';


export default class EditEmailUI extends FORM{

	constructor(props) {
      super(props);
 
      this.state = {
        emailEmpty: true,
      };
    }
	
	setEmail(event) {
		event.preventDefault();
		
		Meteor.call('accounts.setEmail', 
			ReactDOM.findDOMNode(this.refs.editEmail).value.trim(), ( err ) => {
			if ( err ) {
				console.log( err );
			}
			else {
				this.refs.parentPopup.click();
			}}
		)
	}

	render() {
		let form = 	<form className='form' ref='form'>
						<p>Change email</p>
					<input 
						type='text' 
						ref='editEmail' 
						onChange={this.onFieldChange.bind(this, 'emailEmpty')} 
						placeholder='Type new email address'/>
					
					<input 
						className='submit-button'
						type='submit' 
						disabled = {this.state.emailEmpty}
						onClick={this.setEmail.bind(this)}
						value='Submit'/>
				</form>;

		return this.renderPopup(form);
	}
}