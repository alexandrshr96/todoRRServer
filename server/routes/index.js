const Router = require('koa-router')
const router = new Router()
const Todo = require('../models/todos')

async function getAllItem (ctx) {
  try {
    const todos = await Todo.find({})

    ctx.body = todos
  } catch (err) {
    ctx.body = err.message;
  }
}


async function addItem (ctx){
  try {
    const newTodo = new Todo(ctx.request.body)
    const savedTodo = await newTodo.save()

    ctx.body = savedTodo
  } catch (err) {
    ctx.body = err.message;
  }
}

async function updateItems (ctx) {
  try {
    const id = ctx.params.id
    const todo = await Todo.findById(id)

    if(ctx.request.body.text){
      todo.text = ctx.request.body.text
    } else {
      todo.completed = !todo.completed
    }

    const updatedTodo = await todo.save()

    ctx.body = updatedTodo
  } catch (err) {
    ctx.body = err.message;
  }
}

async function deleteItem (ctx) {
  try {
    const id = ctx.params.id
    const todo = await Todo.findById(id)
    const deletedTodo = await todo.remove()

    ctx.body = deletedTodo
  } catch (err) {
    ctx.body = err.message;
  }
}

async function updateAllItems (ctx) {
  try {
    let todos = await Todo.find({})

    await Todo.find({}).updateMany(
      { text : {$in : /[\w\s\d]/g}},
      {completed : todos.every(item => item.completed === true) ? false : true}
    )

    ctx.body = todos
  } catch (err) {
    ctx.body = err.message;
  }
}

async function removeCheckedItems (ctx) {
  try {
    console.log(await Todo.find({}))
    await Todo.find({}).update(
      {},
      { $pull: { completed : true}},
      { multi: true }
    )

    ctx.body = todos
  } catch (err) {
    ctx.body = err.message;
  }
}


router.get('/todos', getAllItem)
router.post('/todos', addItem)
router.put('/todos', updateAllItems)
router.delete('/todos', removeCheckedItems)
router.put('/todos/:id', updateItems)
router.delete('/todos/:id', deleteItem)

module.exports = router