import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchRestaurantsIfNeeded,
  invalidateLocation,
  selectLocation
} from '../actions'

import RestaurantList from '../components/RestaurantList'
import LocationSelector from '../components/LocationSelector'

class App extends Component {

  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { selectedLocation, dispatch } = this.props
    dispatch(selectLocation(selectedLocation))
    dispatch(fetchRestaurantsIfNeeded(selectedLocation))
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  handleRefreshClick(event) {
    event.preventDefault()

    const { selectedLocation, dispatch } = this.props
    dispatch(invalidateLocation(selectedLocation))
    dispatch(fetchRestaurantsIfNeeded(selectedLocation))
  }

  handleChange (nextLocation) {
    this.props.dispatch(selectLocation(nextLocation))
    this.props.dispatch(fetchRestaurantsIfNeeded(nextLocation))
  }

  render() {
    const { selectedLocation, lastUpdated, isFetching, items } = this.props
    const isEmpty = items.length == 0
    return (
      <div>
        <LocationSelector
          value={selectedLocation}
          onChange={this.handleChange}
          options={[1,2,3,4,5,6,7]}/>
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
