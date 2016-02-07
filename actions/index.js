import fetch from 'isomorphic-fetch'

export const SELECT_LOCATION = 'SELECT_LOCATION'
export const INVALIDATE_LOCATION = 'INVALIDATE_LOCATION'
export const REQUEST_RESTAURANTS = 'REQUEST_RESTAURANTS'
export const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS'

export function selectLocation(location) {
  return {
    type: SELECT_LOCATION,
    location
  }
}

export function invalidateLocation(location) {
  return {
    type: INVALIDATE_LOCATION,
    location
  }
}

export function requestRestaurants(location) {
  return {
    type: REQUEST_RESTAURANTS,
    location
  }
}

export function receiveRestuarants(location, restaurants) {
  return {
    type: RECEIVE_RESTAURANTS,
    location,
    restaurants,
    receivedAt : Date.now()
  }
}

export function fetchRestaurants(location) {
  return function(dispatch) {

    dispatch(requestRestaurants(location))

    return fetch(API + '/search?entity_id=' + location, {
      headers: {
        'Accept': 'application/json',
        'user_key': API_KEY
      }
    }).then(response => response.json())
      .then((data) => {
        dispatch(receiveRestuarants(location,
          data.restaurants.map((d) => d.restaurant)))
      })
  }
}

function shouldFetchRestaurants(state, location) {
  const restaurants = state.restaurantsByLocation[location]
  if(!restaurants) {
    return true
  }
  else if(restaurants.isFetching) {
    return false
  }
  else {
    return restaurants.didInvalidate
  }
}

export function fetchRestaurantsIfNeeded(location){
  return (dispatch, getState) => {
    if(shouldFetchRestaurants(getState(), location)) {
      dispatch(fetchRestaurants(location))
    }
  }
}