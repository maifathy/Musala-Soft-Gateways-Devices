import mongoose from 'mongoose';
import { dbUrl } from './helpers.js';

const mongoUtil = {
  connect: (callback) => {
    mongoose.connect(
      dbUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false
      }
    ).then(
      () => {
        console.log('DB Connected.');
        return callback();
      },
      err => {
        console.error('App starting error:', err.stack);
        process.exit(1);
      }
    );
  }
};

export default mongoUtil;
