import { combineReducers } from 'redux'
import todoItems from './todoItems'
import filters from './filters'

const todoApp = combineReducers({
  todoItems,
  filters
})

export default todoApp