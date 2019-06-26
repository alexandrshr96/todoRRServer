import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO,
  TOGGLE_ALL_TODO, REMOVE_COMPLETED_TODO, SET_VISIBILITY_FILTER,
  ADD_TODO_SUCCESS, TODOS_FAILURE, LOADED_TODOS, FETCH_TODOS } from '../constants'

export const addTodo = text => ({
  type: ADD_TODO,
  text,
  completed: false
})

export const addTodoSuccess = todo => ({
  type: ADD_TODO_SUCCESS,
  todo
})

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
})

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id
})

export const editTodo = ({id, text}) => ({
  type: EDIT_TODO,
  id,
  text
})

export const toggleAllTodo = () => ({
  type: TOGGLE_ALL_TODO
})

export const removeCompletedTodo = () => ({
  type: REMOVE_COMPLETED_TODO
})

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const loadedtodos = todo => ({
  type: LOADED_TODOS,
  todo
})

export const todosFailure = error => ({
  type: TODOS_FAILURE,
  error
})

export const fetchTodos = () => ({
  type: FETCH_TODOS
})