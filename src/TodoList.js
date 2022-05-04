import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  List,
  ListItem,
  Container,
  makeStyles,
  IconButton
} from '@material-ui/core'
import { Edit, DeleteOutlined } from '@material-ui/icons'
// useSelector is a hook to connect with the store state using a selector function
// instead of the using
// connect method and don't want to fetch your store data by using
// mapStateToProps
// useDispatch which allows us to dispatch our actions
//  without connecting our component with connect method
// This hook returns a reference to the dispatch function from the Redux store.
import { useSelector, useDispatch } from 'react-redux'
// import getTodos from './actions'

// define css rules
const useStyles = makeStyles({
  input: {
    width: '70%',
    marginBottom: 30
  },
  addButton: {
    height: 55,
    marginLeft: 5,
    marginBottom: 30
  },
  container: {
    textAlign: 'center',
    marginTop: 100
  },
  list: {
    width: '80%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px solid light-gray'
  },
  text: {
    width: '70%'
  },
  listButtons: {
    marginLeft: 10
  }
})

// import { getBooks } from './redux/actions'

const TodoList = () => {
  // Hook for all the dispatch actions
  const dispatch = useDispatch()

  // Get todoList from todoReducer
  const todoList = useSelector(state => state.todoList)
  console.log('todoList/ initial state:', todoList)

  // Add new todo item into List with the action
  // dispatch({type:'ADD_TODO',payload:newTodoObject})

  // pull actions out into its own component
  // on page load dispatch to actions get todos
  //  useEffect(() => {
  //    dispatch(getTodos())
  //  }, [dispatch])

  //  const state = useSelector(getTodos)
  // const count = useSelector(selectCount)
  // const state = useSelector(state => state.books)

  // local state for the input
  const [inputValue, setInputValue] = useState(undefined)
  console.log('inputValue/initial state:', inputValue)

  // move todos state to an actions page?
  // const [todos, setTodos] = useState([])

  const [isEdited, setIsEdited] = useState(false)
  console.log('isEdited:', isEdited)
  const [editedId, setEditedId] = useState(null)
  console.log('editedId:', editedId)

  // Hook for styling
  const classes = useStyles()

  // handle the on change event
  const onChange = e => {
    // set the input value to the event
    setInputValue(e.target.value)
  }

  // handle the on click event
  const addNewTodo = () => {
    const id = Math.random()
    console.log('id:', id)
    if (isEdited === true) {
      const id = editedId
      console.log('testing:', id)
    }
    const newTodo = {
      id: id,
      content: inputValue
    }
    console.log('newTodo:', newTodo)

    // dispatch new todo item into List with the action
    dispatch({ type: 'ADD_TODO', payload: newTodo })
    setIsEdited(false)
    // empty the input
    setInputValue('')

    //    if (!isEdited) {
    //    console.log('!isEdited???:', !isEdited)
    //  setTodos([
    //    ...todoList,
    //  { val: inputValue, isDone: false, id: new Date().getTime() }
    //    ])
    // } else {
    //  console.log('isEdited/???:', isEdited)
    //  setTodos([...todos, { val: inputVal, isDone: false, id: editedId }])
    //  }
    //  setIsEdited(false)
  }

  // function to delete todos from the list
  const deleteTodo = id => {
    // filter to get the todoId which need to be delete
    const newTodoList = todoList.filter(todo => todo.id !== id)
    // dispatch the action and update the state/payload
    dispatch({ type: 'DELETE_TODO', payload: newTodoList })
  }

  const completeTodo = id => {
    console.log('id:', id)
    const completedTodo = todoList.map(todo => {
      console.log('todo/completed:', todo)
      if (todo.id === id) {
        todo.isDone = !todo.isDone
      }
      return todo
    })
    // dispatch state
    dispatch({ type: 'COMPLETE_TODO', payload: completedTodo })
  }

  const editTodo = id => {
    // filter to get the todoId which need to be edited
    const newTodoList = todoList.filter(todo => todo.id !== id)
    console.log('newTodoList/edit:', newTodoList)
    const editValue = todoList.find(todo => todo.id === id)
    console.log('editValue/edit:', editValue)
    setEditedId(editValue.id)
    console.log('editId/edit:', editedId)
    setInputValue(editValue.content)
    console.log('inputValue/edit:', inputValue)
    // dispatch the action and update the state/payload
    dispatch({ type: 'EDIT_TODO', payload: newTodoList })
    setIsEdited(true)
  }
  // {isEdited ? 'Edit' : 'Add'}
  return (
    <Container component='main' className={classes.container}>
      <TextField
        variant='outlined'
        onChange={onChange}
        label='Create A New To-Do List'
        value={inputValue}
        className={classes.input}
      />
      <Button
        size='large'
        variant={isEdited ? 'outlined' : 'contained'}
        color='primary'
        onClick={addNewTodo}
        className={classes.addButton}
      >
        Add
      </Button>
      <List>
        {todoList.map(todo => {
          return (
            <ListItem divider='divider' className={classes.list}>
              <Checkbox
                onClick={() => completeTodo(todo.id)}
                checked={todo.isDone}
              />
              <Typography
                className={classes.text}
                style={{ color: todo.isDone ? 'green' : '' }}
                key={todo.id}
              >
                {todo.content}
              </Typography>
              <IconButton>
                <Edit
                  onClick={() => {
                    editTodo(todo.id)
                  }}
                  variant='contained'
                />
              </IconButton>
              <IconButton>
                <DeleteOutlined
                  onClick={() => {
                    deleteTodo(todo.id)
                  }}
                  color='secondary'
                  variant='contained'
                  className={classes.listButtons}
                />
              </IconButton>
            </ListItem>
          )
        })}
      </List>
    </Container>
  )
}

export default TodoList
