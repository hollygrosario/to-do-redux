// / can pull actions out of the list opage
const getTodos = payload => {
  console.log('payload:', payload)
  // actions are functions that return an object with a type and payload
  return {
    type: 'get_todos',
    payload
  }
}

export default getTodos
