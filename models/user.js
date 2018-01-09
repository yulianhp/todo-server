const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo', { useMongoClient: true });
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: 'user'
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;