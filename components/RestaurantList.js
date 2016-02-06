import React from 'react'
import Card from './RestaurantCard'

export default class RestaurantList extends React.Component {

  render() {
    return (
      <div>{this.props.restaurants.map((d, i) => {
        return <Card key={i} data={d.restaurant}/>
      })}
      </div>
    )
  }
}