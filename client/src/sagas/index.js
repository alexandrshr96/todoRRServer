import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO,
  TOGGLE_ALL_TODO, REMOVE_COMPLETED_TODO, SET_VISIBILITY_FILTER,
  TODOS_FAILURE, FETCH_TODOS } from '../App/constants'
import { loadedtodos, todosFailure, addTodoSuccess } from '../App/actions/'

function postData (url = '', data={}) {
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
      yield postData(`/todos/${action.id}`, {
      method: 'DELETE'
  })
  } catch (e) {
    //yield put(todosFailure(e.message))
    console.log(e.message)
  }
}

function* updateTodo (action) {
  try {
      yield postData(`/todos/${action.id}`, {
      method: 'PUT',
      body: JSON.stringify(action),
      headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  } catch (e) {
    //yield put(todosFailure(e.message))
    console.log(e.message)
  }
}

function* updateAllTodo (action) {
  try {
      yield postData('/todos/', { method: 'PUT' })
  } catch (e) {
    //yield put(todosFailure(e.message))
    console.log(e.message)
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_TODOS, getAllTodos);
  yield takeLatest(ADD_TODO, saveTodo);
  yield takeLatest(DELETE_TODO, deleteTodos);
  yield takeEvery(TOGGLE_TODO, updateTodo);
  yield takeLatest(TOGGLE_ALL_TODO, updateAllTodo);
}

export default rootSaga;