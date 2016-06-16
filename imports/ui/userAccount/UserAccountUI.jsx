import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';


import EditNameUI from './EditNameUI.jsx';
import EditEmailUI from './EditEmailUI.jsx';
import EditPasUI from './EditPasUI.jsx';
import EditLocationUI from './EditLocationUI.jsx';



export default class UserAccountUI extends Component{	

	componentDidMount() {
		let editButtons = this.refs.editButtons;
		window.addEventListener('click', function(event) {
			if ( ReactDOM.findDOMNode(editButtons).style.display === 'block' ) {
				ReactDOM.findDOMNode(editButtons).style.display = 'none';
			}	
		})
	}

	renderPopup(UIElemName, event) {
		
		let Elem;
		
		switch(UIElemName) {
			case 'location':
				Elem  =  <EditLocationUI/>;
				break;
			case 'name':
				Elem = <EditNameUI />;
				break;
			case 'email':
				Elem = <EditEmailUI />;
				break;
			case 'pas': 
				Elem = <EditPasUI />;
				break;
			default:
				console.log('Unknown name')
		}

		ReactDOM.render(Elem, ReactDOM.findDOMNode(this.refs.popupTarget));
	}

	logout(event) {
		Meteor.logout();
	}

	showMenu(event) {
		event.preventDefault();
		ReactDOM.findDOMNode(this.refs.editButtons).style.display = 'block';
	}
	
// <div className='account-manage'>
	render() {
		return(
			<div className='userAccount-target'>
				

	    			<div className='button' onClick={this.logout.bind(this)}>
	    				Logout
	    			</div>
	    		
	    			<div  onClick={function(e) {e.stopPropagation()}}>

		    			<div className='button' onClick={this.showMenu.bind(this)}>
		    				Edit profile info
		    			</div>
		    		
		    			<ul className='userAccount-menu' ref='editButtons'>
	    					<li className='list-item' 
	    						onClick={this.renderPopup.bind(this, 'name')}>
    							Edit name
    						</li>

    						<li className='list-item' 
    							onClick={this.renderPopup.bind(this, 'email')}>
    							Edit email
    						</li>

    						<li className='list-item' 
    							onClick={this.renderPopup.bind(this, 'pas')}>
    							Edit password
    						</li>
    						
    						<li className='list-item' 
    							onClick={this.renderPopup.bind(this, 'location')}> 
    							Edit location
    						</li>
		    			</ul>
		    		
    				</div>
    	
    			<div ref='popupTarget'></div>			
			</div>
	)}
}


