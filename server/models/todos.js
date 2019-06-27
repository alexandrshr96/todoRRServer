const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    text: { type: String },
    completed: { type: Boolean },
  }
);

module.exports = Todo = mongoose.model('Todo', TodoSchema);