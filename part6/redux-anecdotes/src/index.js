import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App store={store} />)
}

renderApp()
store.subscribe(renderApp)