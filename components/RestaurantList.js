import React from 'react'
import Card from './RestaurantCard'

export default class RestaurantList extends React.Component {

	constructor() {
		super()

		this.state = {
			restaurants: [1,2,3,4,5,6,7,8]
		}
	}

	render() {
		return (
			<div>{this.state.restaurants.map((d) => {
					return <Card key={d} name={d}/>
				})}
			</div>
		)
	}
}