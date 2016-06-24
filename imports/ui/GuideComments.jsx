import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import MenuGuideUI from './Menu-guideUI.jsx';


export default class RouteCommentsUI extends Component{
	


	render() {	
		return ( 
			<div id='parent-popup' className='parent-popup' ref='parentPopup' 
											onClick={this.showCommentsList.bind(this)}>
				<div className = 'popup' ref='popup' 
					onClick={ function(event) { event.stopPropagation() } }>

					
					
					<div id='close-popup-button' className='close-popup-button' 
								onClick={this.showCommentsList.bind(this)}>
						X
					</div>

					Comments
				</div>
			</div>

		)
	}
}