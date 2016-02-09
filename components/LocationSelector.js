import React, { Component } from 'react'

export default class LocationSelector extends Component {
  render() {
    const { value, onChange, options } = this.props

    return (
      <span>
        <h2>{value}</h2>
        <select onChange={event => onChange(event.target.value)}
          value={value}>
          {options.map(d =>
            <option key={d} value={d}>
              {d}
            </option>)
          }
        </select>
      </span>
    )
  }
}