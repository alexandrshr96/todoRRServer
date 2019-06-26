import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO,
  TOGGLE_ALL_TODO, REMOVE_COMPLETED_TODO, SET_VISIBILITY_FILTER,
  ADD_TODO_SUCCESS, TODOS_FAILURE, FETCH_TODOS, LOADED_TODOS } from '../App/constants'
import { loadedtodos, todosFailure, addTodoSuccess } from '../App/actions/'

function postData (url = '', data = {}) {
  return fetch(url, data)
  .then(res => res.json());
}

function* getAllTodos () {
  try {
    const todos = yield postData('/todos')
    yield put(loadedtodos(todos))
  } catch (e) {
    //yield put(todosFailure(e.message))
    console.log(e.message)
  }
}

function* saveTodo (action) {
  try {
    const todo = yield postData('/todos', {
        method: 'POST',
        body: JSON.stringify(action),
        headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    yield put(addTodoSuccess(todo))
    } catch (e) {
    //yield put(todosFailure(e.message))
    console.log(e.message)
  }
}

function* deleteTodos (action) {
  try {
    const todos = yield postData('/todos', {
      method: 'DELETE',
      body: JSON.stringify(action),
      headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    console.log('todos', todos)
    yield put(loadedtodos(todos))
  } catch (e) {
    //yield put(todosFailure(e.message))
    console.log(e.message)
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_TODOS, getAllTodos);
  yield takeLatest(ADD_TODO, saveTodo);
  yield takeLatest(DELETE_TODO, deleteTodos);
}

export default rootSaga;