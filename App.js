import React from 'react'
import RestaurantList from './components/RestaurantList'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <RestaurantList restaurants={this.props.restaurants} />
      </div>
    )
  }
}
