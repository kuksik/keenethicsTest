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

		Meteor.call('accounts.setName', 
				ReactDOM.findDOMNode(this.refs.editName).value.trim(), ( err ) => {
			if ( err ) {
				console.log( err );
			}
			else {
				this.refs.parentPopup.click();
			}
		})
	}

	render() {
		let form = <form className='form' ref='form'>
						<p>Change name</p>

						<input 
							type='text' ref='editName' 
							onChange={this.onFieldChange.bind(this, 'nameEmpty')} 
							placeholder='Type new name'/>
						
						<input 
							className='submit-button' type='submit' 
							disabled = {this.state.nameEmpty}
							onClick={this.setName.bind(this)}
							value='Submit'/>
					</form>

		return this.renderPopup(form);
	}
}