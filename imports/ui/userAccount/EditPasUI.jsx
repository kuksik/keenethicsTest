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
		let currentPas = ReactDOM.findDOMNode(this.refs.currentPas).value.trim(),
			newPas = ReactDOM.findDOMNode(this.refs.newPas).value.trim();

		if ( newPas !== 
					ReactDOM.findDOMNode(this.refs.confirmNewPas).value ) {

			ReactDOM.findDOMNode(this.refs.errorBox).innerHTML = 
										'New passwords do not match';
		}
		else {
			Accounts.changePassword(currentPas, newPas, ( err ) => {
			if ( err ) {
				ReactDOM.findDOMNode(this.refs.errorBox).innerHTML = err.reason;
			}
			else {
				this.refs.parentPopup.click();
			}
		})
		}
	}
	
	render() {
		return 	this.renderPopup(
					<form className='form' ref='form'>
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

						<div className = 'error-box' ref = 'errorBox'></div>
						
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
					</form>
				);
	}
}
