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
  console.log('state/reducers:', state)
  console.log('action/reducer:', action)
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todoList: [...state.todoList, action.payload]
      }
    default:
      return state
  }
}

export default TodoReducer
