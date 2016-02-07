import 'babel-polyfill'
import './style.css'

import React from 'react'//eslint-disable-line
import { render } from 'react-dom'
import Root from './containers/Root'

render(
  <Root />,
  document.getElementById('app')
)


