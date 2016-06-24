
import React, { Component } from 'react';
import { render } from 'react-dom';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';



import App  from '../../ui/App.jsx';
import Fest from '../../ui/FestUI.jsx';
import Home from '../../ui/HomeUI.jsx';
import NotFoundUI from '../../ui/NotFoundUI.jsx';
import GuideUI  from '../../ui/GuideUI.jsx';



Meteor.startup( () => {
  render( 
    <Router history={ browserHistory }>
     	
      	<Route path="/" component={ App } >
     		<IndexRoute component={Home} />

  			<Route path="/guide/:Area" component={ GuideUI }/>
  			<Route path='/fest' component = {Fest}/>
      	</Route>
      	
  	    <Route path='*' component={ NotFoundUI } />
    </Router>, 
    document.getElementById( 'render-target' ) 
  );
});