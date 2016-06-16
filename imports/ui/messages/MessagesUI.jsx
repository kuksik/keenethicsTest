import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../api/messages.js';
import FORM from '../classes/FormUIClass.jsx';

export default class MessagesUI extends FORM {
	
    constructor(props) {
        super(props);
 
        this.state = {
            newMessageEmpty: true,
        };
    }


	addNewMessage(event) {    
        event.preventDefault()
    
    	Meteor.call('message.insert', 
            ReactDOM.findDOMNode(this.refs.textInput).value.trim() );
		ReactDOM.findDOMNode(this.refs.textInput).value = '';
    	
  	}
    onKeyDown(event) {
        if ( event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            ReactDOM.findDOMNode(this.refs.addMessage).click();
        }
    }

	render() {
		return (

			<div className='messages-target'>
	  			<form ref='form'>
                    <textarea
                        id = 'new-message'
    	  				className = 'new-message'
    	    			ref = "textInput"
    	    			placeholder="Type your message here"
                        onKeyDown = { this.onKeyDown.bind(this) }
                        onChange = 
                            {this.onFieldChange.bind(this, 'newMessageEmpty')}>
    	    		</textarea>
                    
                    <input
                        type='submit' value='Add new message'
                        ref = 'addMessage'
                        className = 'submit-button'
                        onClick = { this.addNewMessage.bind(this) }
                        disabled = { this.state.newMessageEmpty }/>
                </form>

    			<ul className='messages-list'>
    				{
    					this.props.messages.map( (m) => (
    						<li key={m._id}            > 
    							<p className='message-author'>
    								{m.username} 
    							</p>
    			
    							<p> {m.text} </p>
    						
    							<p className='message-date'>
    								{m.createAt.toLocaleString()}
    							</p>
    						</li>
    					))
    				}
    			</ul>

			</div>
		)
	}      
}

export default createContainer(() => {
	
	Deps.autorun(function () {	
		Meteor.subscribe('messages', Meteor.user().profile.location);
	})
	
  	return {
    	messages: Messages.find({}, {sort: {createAt: -1}}).fetch(),
  	};
}, MessagesUI);

