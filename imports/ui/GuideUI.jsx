import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { guide } from '../api/guide.js';

export default class GuideUI extends Component{
	
	constructor(props) {
     	super(props);
 
     	this.state = {
        	currentSectorNum: 0,
        	commentsListVisible: false, 
      	};
    }

    showSector(index, event) {
    	this.setState({ currentSectorNum: index });
    }

    showCommentsList(event) {
   		this.setState({ commentsListVisible: !this.state.commentsListVisible }); 
    }

	render() {	
	
		return ( 
			<div className = 'guide-target'>	
				<div className = 'sectors-target'>
					{	guide[0].sectors.map( (sector, index) => (
							<p className = 'sector-item'
								key = { index }
								onClick={this.showSector.bind(this, index)}>
								{ sector.label }
							</p>
						))		
					}
				</div>
				
				<div className = 'routes-list'>
					{
						guide[0].sectors[ this.state.currentSectorNum ].routes
							.map( (route, index) => (
								<div 
									className = 'route-item'
									key = {index}>
									{ route.name }
									<div className = 'add-comment'
										onClick = {this.showCommentsList.bind(this)}>
										Comments
									</div>
								</div>

						))
					}
				</div>

				<div ref='popupTarget'>
					{ this.state.commentsListVisible?
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

						: ''
					}
				</div>			

			</div>

		)
	}
}