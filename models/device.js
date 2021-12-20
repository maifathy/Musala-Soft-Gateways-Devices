import mongoose from 'mongoose';

const Devices = new mongoose.Schema({
  _id: {
    type: String
  },
  vendor: {
    type: String,
    required: [true, 'Vendor is required'],
    unique: true
  },
  status: {
    type: String,
    enum: ['Online', 'Offline']
  }
}, { _id: false, timestamps: { createdAt: 'date_created', updatedAt: 'date_updated' } });

export default mongoose.model('Devices', Devices, 'Devices');
