import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';




import NavigationUI from './NavigationUI.jsx';
import GuideUI from './GuideUI.jsx';



export const App = ( { children } ) => {
	return ( 
		<div>
			<NavigationUI />
			<div className = 'page-target'>
				{ children }
			</div>
		</div>
	)
} 


export default createContainer(() => {
  	return {
    	currentUser: Meteor.user(),
  	};
}, App);

				
					

					
					
					

				