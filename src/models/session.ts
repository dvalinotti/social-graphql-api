import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  token: String,
  userId: String,
  createdAt: String,
}, {
  toObject: { virtuals: true }
});

export default mongoose.model('Session', SessionSchema);