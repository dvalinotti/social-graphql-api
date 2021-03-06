import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  author: String,
  title: String,
  body: String,
  createdAt: String,
}, {
  toObject: { virtuals: true }
});

export default mongoose.model('Post', PostSchema);
