import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

export default class FORM extends Component {

	componentDidMount() {
		this.refs.form.getElementsByTagName('input')[0].focus();
	}

	onFieldChange(fieldName, e) {
		this.setState( { [''+fieldName]: !e.target.value.trim().length } )
	}

	closeForm(event) {
		event.stopPropagation();
		ReactDOM.findDOMNode(this.refs.parentPopup).remove();
	}
	
	onKeyDown(event) {
		if ( event.keyCode === 27 ) {
			ReactDOM.findDOMNode(this.refs.parentPopup).remove();
		}
	}

	renderPopup(form) {
		return (
			<div id='parent-popup' className='parent-popup' ref='parentPopup' 
					  						onClick={this.closeForm.bind(this)}
					  						onKeyDown = {this.onKeyDown.bind(this)}>
				<div className = 'popup' ref='popup' 
						onClick={ function(event) { event.stopPropagation() } }>

					<div id='close-popup-button' className='close-popup-button' 
											onClick={this.closeForm.bind(this)}>
						X
					</div>

					<div className='form-target' ref='formTarget'>
						{ form }
					</div>
					
				</div>
			</div>
		);
	}	
}