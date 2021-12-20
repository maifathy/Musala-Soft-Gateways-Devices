import mongoose from 'mongoose';

const mongoUtil = {
  connect: (callback) => {
    mongoose.connect(
      'mongodb://localhost:27017/Gateways',
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
