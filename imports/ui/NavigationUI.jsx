import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import NavigateGuideUI from './Navigate-guideUI.jsx';


import { IndexLink, Link } from 'react-router';


export default class NavigationUI extends Component{
	


	render() {	
		return ( 
			<div className = 'menu-target'>	
				
				
				<Link to='/' className='navigate-item'>Main</Link>

				<NavigateGuideUI/>
		
				
				<Link to='/fest' className='navigate-item'>Fest</Link>
				
			</div>

		)
	}
}