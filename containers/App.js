import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchRestaurantsIfNeeded } from '../actions'

import RestaurantList from '../components/RestaurantList'

class App extends Component {

  constructor(props) {
    super(props)
    console.log(this.props)
  }

  componentDidMount() {
    const { selectedLocation, dispatch } = this.props
    console.log(selectedLocation)
    dispatch(fetchRestaurantsIfNeeded(selectedLocation))
  }

  render() {
    return (
      <div>
        <RestaurantList items={this.props.items} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedLocation, restaurantsByLocation } = state
  const {
    isFetching,
    lastUpdated,
    items
  } = restaurantsByLocation[selectedLocation] || {
    isFetching : true,
    items: []
  }

  return {
    selectedLocation,
    items,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
