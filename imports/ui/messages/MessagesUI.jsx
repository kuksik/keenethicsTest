import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../api/messages.js';


export default class MessagesUI extends Component {
	
	addNewMessage(event) {
    	if (event.charCode === 13 ) { 
    		event.preventDefault();
    		Meteor.call('message.insert', 
                ReactDOM.findDOMNode(this.refs.textInput).value.trim() );
    		ReactDOM.findDOMNode(this.refs.textInput).value = '';
    	}
  	}

	render() {
		return (

			<div className='messages-target'>
		  			<textarea
                        id = 'new-message'
		  				className = 'new-message default'
		    			ref="textInput"
		    			placeholder="Type your message here"
		    			onKeyPress = {this.addNewMessage.bind(this)}>
		    		</textarea>

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
    	messages: Messages.find({}).fetch().reverse(),
  	};
}, MessagesUI);

