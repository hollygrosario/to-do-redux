import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import TodosReducer from './reducers'
import App from './App'
import reportWebVitals from './reportWebVitals'
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
