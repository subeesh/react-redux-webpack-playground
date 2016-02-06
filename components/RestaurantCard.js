import React from 'react'

export default class RestaurantCard extends React.Component {
  render() {
    return (
      <section>
        <div>{this.props.data.name}</div>
        <img src={this.props.data.thumb}/>
      </section>
    )
  }
}
