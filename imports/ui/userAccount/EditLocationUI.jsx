import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Locations } from '../../api/locations.js';
import FORM from '../classes/FormUIClass.jsx';

export default class EditLocationUI extends FORM {

	constructor(props) {
    	super(props);
 
    	this.state = {
        	searchString: ' ',
      	};
    }

    handleChange(event) {	
    	this.setState( { searchString: event.target.value } );
    }

	editLocation(location, event) {
		
		

		Meteor.call('accounts.setLocation', location, ( err ) => {
			if ( err ) {
				console.log( err );
			}
			else {
				this.refs.parentPopup.click();
			}
		})
	}   

	submitLocation(event) {
		event.preventDefault();

		if ( this.refs.locationsList.getElementsByTagName('li').length === 1 ) {
			this.refs.locationsList.getElementsByTagName('li')[0].click()
		}
	}

	render() {
		
		let locations = this.props.locations,
            searchString = this.state.searchString.trim().toLowerCase();
        
        
        if ( searchString.length > 0 ) {
            libraries = libraries.filter(function(elem){
                return elem.toLowerCase().match( searchString );
            });
            
        }

        let form =  
        	<form className='form' ref='form' 
        		onSubmit={this.submitLocation.bind(this)}>
				
				<p>Edit location</p>
           
            	<input type="text"  
            			onChange={this.handleChange.bind(this)} 
            			placeholder="Type here" />

            	<ul  ref='locationsList'> 
            		{ locations.map( (elem, i) => ( 
            			<li 
            				className='list-item' key ={elem._id} 
            				style={{"cursor": "pointer"}} 
            				onClick={this.editLocation.bind(this, elem.location)}>
            				
            				{elem.location}

            			</li> 
            		)) }
            	</ul>
        	</form>;

		return this.renderPopup(form);
	}
}


export default createContainer(() => {
	Meteor.subscribe('locations');
	
  	return {
    	locations: Locations.find({}).fetch(),
  	};
}, EditLocationUI);

