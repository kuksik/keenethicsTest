import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';


import FORM from '../classes/FormUIClass.jsx';



export default class EditPasUI extends FORM {

	constructor(props) {
      super(props);
 
      this.state = {
        currentPasEmpty: true,
        newPasEmpty: true,
        confirmNewPasEmpty: true
      };
    }
	
	resetPas(event) {
		event.preventDefault();
		
		let data = {
			currentPas: ReactDOM.findDOMNode(this.refs.currentPas).value.trim(),
			newPas: ReactDOM.findDOMNode(this.refs.newPas).value.trim()
		};

		if ( data.newPas !== ReactDOM.findDOMNode(this.refs.confirmNewPas).value ) {
			ReactDOM.findDOMNode(this.refs.form).
				getElementsByClassName('error-box')[0].innerHTML = 
										'New passwords do not match';
		}
		else {
			Meteor.call('accounts.setPassword', data, ( err, res ) => {
				if ( err ) {
					console.log(err)
				}
				else {
					if ( res.err ) {
						ReactDOM.findDOMNode(this.refs.form).
							getElementsByClassName('error-box')[0].innerHTML = 
										'Please type correct current password';
					}
					else {
						this.refs.parentPopup.click();
					}
				}
			});
		}
	}
	
	render() {
		let form = 	<form className='form' ref='form'>
						<p>Change password</p>
						<input 
							type='password' ref='currentPas' 
							onChange={this.onFieldChange.bind(this, 'currentPasEmpty')} 
							placeholder='Current password'/>
						<input 
							type='password' ref='newPas' 
							onChange={this.onFieldChange.bind(this, 'newPasEmpty')} 
							placeholder='New password'/>
						<input 
							type='password' ref='confirmNewPas' 
							onChange={this.onFieldChange.bind(this, 'confirmNewPasEmpty')} 
							placeholder='Confirm new password'/>
						<div className = 'error-box'></div>
						<input 
							className='submit-button'
							type='submit' 
							disabled = {
								this.state.currentPasEmpty || 
								this.state.newPasEmpty || 
								this.state.confirmNewPasEmpty
							}
							onClick={this.resetPas.bind(this)}
							value='Submit'/>
						</form>;

		return 	this.renderPopup(form);
	}
}
