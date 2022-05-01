// set an itial state for the reducer/ add an item for testing so its easy to see otherwise set to an empty array []
const initialState = {
  todoList: [
    {
      id: 1,
      content: 'Walk the dog'
    }
  ]
}
// Reducers are functions that implement the behavior of the actions.
// They change the state of the app, based on the action description
// and the state change description
const TodoReducer = (state = initialState, action) => {
  // switch statement
  switch (action.type) {
    // in case of add todo we return the updated state off the todo list and the payload
    case 'ADD_TODO':
      return {
        ...state,
        todoList: [...state.todoList, action.payload]
      }
    // in case of delete todo we return the updated state off the todo list and the payload
    case 'DELETE_TODO':
      return {
        ...state,
        todoList: action.payload
      }
    // in case of default we return the state
    default:
      return state
  }
}

export default TodoReducer
