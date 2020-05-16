const mongo = require('mongoose');

const userSchema = new mongo.Schema({
  username: String,
  email: String,
  password: String,
}, {
  toObject: { virtuals: true }
});

module.exports = mongo.model('User', userSchema);
