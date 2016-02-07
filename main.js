import 'babel-polyfill'
import './style.css'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { selectLocation, fetchRestaurants } from './actions'
import rootReducer from './reducers'

import React from 'react'//eslint-disable-line
import ReactDOM from 'react-dom'
import App from './App'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.dispatch(selectLocation(1))
store.dispatch(fetchRestaurants(1)).then(() => {
  renderApp(store.getState().restaurantsByLocation['1'].items)
})

function renderApp(restaurants) {
  ReactDOM.render(<App restaurants={restaurants}/>,
    document.getElementById('app'))
}


