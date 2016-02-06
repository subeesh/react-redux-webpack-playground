import React from 'react';

export default class App extends React.Component {

  constructor() {
    super();

    this.state = { message : 'Hello World'}
  }

  update(e) {
  	this.setState({
  		message : e.target.value
  	})
  }

  render() {
    return (
    	<div>
    		<input onChange={this.update.bind(this)}/>
    		<div>{this.state.message}</div>
    	</div>
		)
  }
}
