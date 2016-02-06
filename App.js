import React from 'react'
import fetch from 'isomorphic-fetch'
import RestaurantList from './components/RestaurantList'

export default class App extends React.Component {

  constructor() {
    super()

    this.state = {
      restaurants: []
    }
  }

  componentWillMount() {
    fetch(API + '/search?entity_id=200', {
      headers: {
        'Accept': 'application/json',
        'user_key': API_KEY
      }
    }).then(response => response.json())
      .then((data) => {
        console.log(data)
        this.setState({
          restaurants: data.restaurants
        })
      })
  }

  render() {
    return (
      <div>
        <RestaurantList restaurants={this.state.restaurants} />
      </div>
    )
  }
}
