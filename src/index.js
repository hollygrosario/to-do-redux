import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import TodosReducer from './reducers'
import App from './App'
import './index.css'

// the Redux store sets/holds the state which we pass to our components
const store = createStore(TodosReducer)

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
