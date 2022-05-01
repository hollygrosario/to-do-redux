import { createStore } from 'redux'
import TodosReducer from './reducers'

// the store sets/holds the state which we pass to our apps components

const store = createStore(TodosReducer)

export default store
