const mongo = require('mongoose');

const PostSchema = new mongo.Schema({
  author: String,
  title: String,
  body: String,
}, {
  toObject: { virtuals: true }
});

module.exports = mongo.model('Post', PostSchema);
