// new blogilista client index js
/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { createRoot } from 'react-dom/client'
import ErrorBoundary from 'Components/ErrorBoundary'
import App from './src/App'
import 'Assets/custom.scss'

/*
ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
, document.getElementById('root')
)
*/

const container = document.getElementById('root')
const root = createRoot(container)

const refresh = () => root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
)

/*
const refresh = () => root.render(<App />)
*/
refresh()
// root.render(<App />);

if (module.hot) {
  module.hot.accept()
}
