import React from 'react'

export default class RestaurantCard extends React.Component {
  render() {
    return (
      <section>
        <h1>{this.props.data.name}</h1>
        <img src={this.props.data.featured_image}/>
      </section>
    )
  }
}
