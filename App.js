import React from 'react';
import RestaurantList from './components/RestaurantList';

export default class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
    	<div>
    		<RestaurantList />
    	</div>
		)
  }
}
