import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchRestaurantsIfNeeded,
  invalidateLocation
} from '../actions'

import RestaurantList from '../components/RestaurantList'

class App extends Component {

  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { selectedLocation, dispatch } = this.props
    dispatch(fetchRestaurantsIfNeeded(selectedLocation))
  }

  handleRefreshClick(event) {
    event.preventDefault()

    const { selectedLocation, dispatch } = this.props
    dispatch(invalidateLocation(selectedLocation))
    dispatch(fetchRestaurantsIfNeeded(selectedLocation))
  }

  render() {
    const { lastUpdated, isFetching, items } = this.props
    const isEmpty = items.length == 0
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last Updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
              onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h3>Loading...</h3> : <h3>Empty.</h3>)
          : <div style={{opacity: isFetching ? .2 : 1}}>
              <RestaurantList items={this.props.items} />
            </div>
        }
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
