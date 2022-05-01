import React, { useState, useEffect } from 'react'
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
import getTodos from './actions'

// import reducer???
const useStyles = makeStyles({
  input: {
    width: '70%',
    marginBottom: 30
  },
  addButton: {
    height: 55,
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

const Todo = () => {
  const dispatch = useDispatch()
  //  const state = useSelector(getTodos)
  const state = useSelector(state => state.todos)

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])

  console.log('state:', state)
  // const count = useSelector(selectCount)
  // const state = useSelector(state => state.books)
  const [inputVal, setInputVal] = useState(undefined)
  // move todos state to an actions page?
  const [todos, setTodos] = useState([])

  const [isEdited, setIsEdited] = useState(false)
  const [editedId, setEditedId] = useState(null)
  const classes = useStyles()

  const onChange = e => {
    setInputVal(e.target.value)
  }

  // need to handle it dispatch() UPDATE PAYLOAD  w/ redux ??
  const handleClick = () => {
    if (!isEdited) {
      setTodos([
        ...todos,
        { val: inputVal, isDone: false, id: new Date().getTime() }
      ])
    } else {
      setTodos([...todos, { val: inputVal, isDone: false, id: editedId }])
    }
    setInputVal('')
    setIsEdited(false)
  }

  const onDelete = id => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleDone = id => {
    const updated = todos.map(todo => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone
      }
      return todo
    })
    setTodos(updated)
  }

  const handleEdit = id => {
    const newTodos = todos.filter(todo => todo.id !== id)
    const editVal = todos.find(todo => todo.id === id)
    setEditedId(editVal.id)
    setInputVal(editVal.val)
    setTodos(newTodos)
    setIsEdited(true)
  }

  return (
    <Container component='main' className={classes.container}>
      <TextField
        variant='outlined'
        onChange={onChange}
        label='Create A New To-Do List'
        value={inputVal}
        className={classes.input}
      />
      <Button
        size='large'
        variant={isEdited ? 'outlined' : 'contained'}
        color='primary'
        onClick={handleClick}
        className={classes.addButton}
        disabled={!inputVal}
      >
        {isEdited ? 'Edit' : 'Add'}
      </Button>
      <List>
        {todos.map(todo => {
          console.log('todo:', todo)
          return (
            <>
              <ListItem divider='divider' className={classes.list}>
                <Checkbox
                  onClick={() => handleDone(todo.id)}
                  checked={todo.isDone}
                />
                <Typography
                  className={classes.text}
                  style={{ color: todo.isDone ? 'green' : '' }}
                  key={todo.id}
                >
                  {todo.val}
                </Typography>
                <IconButton>
                  <Edit
                    onClick={() => handleEdit(todo.id)}
                    variant='contained'
                    className={classes.listButtons}
                  />
                </IconButton>
                <IconButton>
                  <DeleteOutlined
                    onClick={() => onDelete(todo.id)}
                    color='secondary'
                    variant='contained'
                    className={classes.listButtons}
                  />
                </IconButton>
              </ListItem>
            </>
          )
        })}
      </List>
    </Container>
  )
}

export default Todo
