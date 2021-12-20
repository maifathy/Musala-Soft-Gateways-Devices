import mongoose from 'mongoose';

const mongoUtil = {
  connect: (callback) => {
    mongoose.connect(
      'mongodb+srv://admin:admin@gateways.zz1nq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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
