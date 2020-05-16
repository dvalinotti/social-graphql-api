import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/social', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

mongoose
  .connection
  .on('open', () => console.log('Connected to MongoDB Server'));

export default mongoose;
