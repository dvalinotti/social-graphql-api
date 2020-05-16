import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
}, {
  toObject: { virtuals: true }
});

export default mongoose.model('User', userSchema);
