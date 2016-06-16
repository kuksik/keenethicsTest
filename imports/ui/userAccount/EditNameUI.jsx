import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';


import FORM from '../classes/FormUIClass.jsx';


export default class EditNameUI extends FORM {
	constructor(props) {
      super(props);
 
      this.state = {
        nameEmpty: true,
      };
    }
	
	setName(event) {
		event.preventDefault();
		let currentUserName = Meteor.user().username,
			newUserName = ReactDOM.findDOMNode(this.refs.editName).value.trim();

		Meteor.call('accounts.setName', newUserName, ( err ) => {
			if ( err ) {
				ReactDOM.findDOMNode(this.refs.errorBox).innerHTML = err.reason;
			}
			else {
				Meteor.call('message.updateUserName', currentUserName, newUserName);
				this.refs.parentPopup.click();
			}
		})
	}

	render() {			
		return this.renderPopup(
					<form className='form' ref='form'>
						<p>Change name</p>

						<input 
							type='text' ref='editName' 
							onChange={this.onFieldChange.bind(this, 'nameEmpty')} 
							placeholder='Type new name'/>
						
						<div className = 'error-box' ref = 'errorBox'></div>

						<input 
							className='submit-button' type='submit' 
							disabled = {this.state.nameEmpty}
							onClick={this.setName.bind(this)}
							value='Submit'/>
					</form>
				);
	}
}