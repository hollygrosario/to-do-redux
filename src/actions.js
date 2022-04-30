const getTodos = (payload) => {
  // actions are functions that return an object with a type and payload
  return {
    type: 'get_todos',
    payload
 }
}

export default getTodos
