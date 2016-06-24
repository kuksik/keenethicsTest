import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { guide } from '../api/guide.js';

import { IndexLink, Link } from 'react-router';


    


class MenuItem extends Component {
	selectMenu(event) {

		// event.target.
		// document.getELementsByClassName('menu-item')
	}
}

export default class NavigateGuideUI extends MenuItem{
	

	componentDidMount() {
		
		function changeState() {
			if ( this.state.showAreasList ) {
				this.setState({ showAreasList: !this.state.showAreasList });
			}
		}

		var change = changeState.bind(this);
		
		window.addEventListener('click', function(event) {
			change();
		})
	}	

	constructor(props) {
      super(props);
 
      this.state = {
        showAreasList: false,
      };
    }

	

	showGuides(event) {
		event.stopPropagation();
		// event.preventDefault();	
		this.setState( { showAreasList: !this.state.showAreasList } );
	}

	render() {	
		return ( 
				
			<div>
				<a className = 'navigate-item' 
							onClick={this.showGuides.bind(this)}>
					
						Guides
					
				</a>

				{ this.state.showAreasList ? 
					

					<ul className = 'area-list' ref = 'areaList'> 
						{
							guide.map( (area, index) => (


								<li key = { index }  > 
									<Link 
										to= { [ '/guide', area.info.title ].join('/')} 
										className = 'popup-menu-item'>
										
										{ area.info.title } 
									
									</Link>
								</li>
							))
						}
					</ul>
					: ''
				}
					

			</div>
		)
	}
}

<li><Link to="/one" activeClassName="active">Page One</Link></li>
