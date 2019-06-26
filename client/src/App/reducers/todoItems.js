
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO,
  TOGGLE_ALL_TODO, REMOVE_COMPLETED_TODO, SET_VISIBILITY_FILTER,
  ADD_TODO_SUCCESS, TODOS_FAILURE, FETCH_TODOS, LOADED_TODOS } from '../constants'

const todoItems = (state = [], action) => {
  switch(action.type) {
    case FETCH_TODOS:
      return [...state]

    case LOADED_TODOS:
      return [...action.todo]

    case ADD_TODO:
      return [...state]

      case ADD_TODO_SUCCESS:
      return [
        ...state,
        {
          _id: action.todo._id,
          text: action.todo.text,
          completed: false
        }
      ]

    case TOGGLE_TODO:
      return  state.map(item =>
        item.id === action.id ?
          {...item, completed: !item.completed}
            : item
      )

    case DELETE_TODO:
        return state.filter(item => item.id !== action.id)

    case EDIT_TODO:
      return state.map(item =>
        item.id === action.id ?
          {...item, text: action.text}
            : item
      )

    case TOGGLE_ALL_TODO:
      return (state.every(item => item.completed === true) ?
        state.map(item => ({...item, completed: false}))
          : state.map(item => ({...item, completed: true})));

    case REMOVE_COMPLETED_TODO:
      return state.filter(item => !item.completed)

    default :
      return state
  }
}

export default todoItems