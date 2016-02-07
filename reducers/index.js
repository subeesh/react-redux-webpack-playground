import { combineReducers } from 'redux'

import { SELECT_LOCATION,
  INVALIDATE_LOCATION,
  REQUEST_RESTAURANTS,
  RECEIVE_RESTAURANTS
} from '../actions'

function selectedLocation(state = 1, action) {
  switch(action.type) {
    case SELECT_LOCATION:
      return action.location
    default:
      return state
  }
}

function restaurants(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch(action.type) {
    case INVALIDATE_LOCATION:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_RESTAURANTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_RESTAURANTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.restaurants,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function restaurantsByLocation(state = {}, action) {
  switch(action.type) {
    case INVALIDATE_LOCATION:
    case REQUEST_RESTAURANTS:
    case RECEIVE_RESTAURANTS:
      return Object.assign({}, state, {
        [action.location] : restaurants(state[action.location], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  restaurants,
  restaurantsByLocation
})

export default rootReducer