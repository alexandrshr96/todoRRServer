var Koa = require('koa')
var app = new Koa()
const bodyParser = require('koa-body')
const mongoose = require('mongoose')

const tasks = require('./routes/index')

app.use(bodyParser())
app.use(tasks.routes())

mongoose.connect(
  'mongodb://localhost:27017/test',
  { useNewUrlParser: true }
)

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});

app.listen(4000, () => {
  console.log('Server running at port 4000')
})