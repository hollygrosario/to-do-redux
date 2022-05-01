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

  // Local state for the input error message
  const [errorMessage, setErrorMessage] = useState('')

  // move todos state to an actions page?
  // const [todos, setTodos] = useState([])

  //  const [isEdited, setIsEdited] = useState(false)
  // const [editedId, setEditedId] = useState(null)

  // Hook for styling
  const classes = useStyles()

  // handle the on change event
  const onChange = e => {
    // set the input value to the event
    setInputValue(e.target.value)
  }

  // handle the on click event
  const addNewTodo = () => {
    console.log('addNewTodo on click')
    // validate the input value
    if (inputValue) {
      console.log('inputValue:', inputValue)
      // set the error message to an empty string
      setErrorMessage('')
      // define a new todo object
      const newTodo = {
        id: Math.random(),
        content: inputValue
      }
      console.log('newTodo:', newTodo)
      // dispatch new todo item into List with the action
      dispatch({ type: 'ADD_TODO', payload: newTodo })
      // empty the input
      setInputValue('')
    } else {
      console.log('errorMessage:', errorMessage)
      // display the error message
      setErrorMessage('Please add some text...')
    }
    // is isEdited logic?
    //  if (!isEdited) {
    //    setTodos([
    //    ...todos,
    //    { val: inputValue, isDone: false, id: new Date().getTime() }
    //    ])
    //  } else {
    //     setTodos([...todos, { val: inputVal, isDone: false, id: editedId }])
    //  }

    //  setIsEdited(false)
  }

  const deleteTodo = id => {
    // filter to get the todoId which need to be delete
    const newTodoList = todoList.filter(todo => todo.id !== id)
    dispatch({ type: 'DELETE_TODO', payload: newTodoList })
  }

  //  const handleDone = id => {
  //  const updated = todos.map(todo => {
  //  if (todo.id === id) {
  //      todo.isDone = !todo.isDone
  // }
  //    return todo
  //  })
  //  setTodos(updated)
  //  }

  //  const handleEdit = id => {
  //  const newTodos = todos.filter(todo => todo.id !== id)
  //  const editVal = todos.find(todo => todo.id === id)
  //  setEditedId(editVal.id)
  //  setInputVal(editVal.val)
  //  setTodos(newTodos)
  //    setIsEdited(true)
  //  }

  // button logic for is edited,   variant={isEdited ? 'outlined' : 'contained'},
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
        variant='outlined'
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
              <Checkbox onClick='' checked={todo.isDone} />
              <Typography
                className={classes.text}
                style={{ color: todo.isDone ? 'green' : '' }}
                key={todo.id}
              >
                {todo.content}
              </Typography>
              <IconButton>
                <Edit onClick='' variant='contained' />
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
