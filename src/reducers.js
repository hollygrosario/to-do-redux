const initialState = {
  todos: []
}
// Reducers are functions that implement the behavior of the actions.
// They change the state of the app, based on the action description
// and the state change description
const TodosReducer = (state = initialState, action) => {
  console.log('state/reducers:', state)
  // console.log('action:', action)
  switch (action.type) {
    case 'get_todos':
      return { ...state, todos: action.payload }
    default:
      return { ...state }
  }
}

export default TodosReducer
