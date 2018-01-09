const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo', { useMongoClient: true });
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;


const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  status: {
    type: String,
    default: 'not done'
  }
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;