import mongoose from 'mongoose';
import Incr from 'mongoose-sequence';
import ipAddressPlugin from 'mongoose-ip-address';

const autoIncrement = Incr(mongoose);
const Gateways = new mongoose.Schema({
  _id: {
    type: Number
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  devices: [{
    type: mongoose.Schema.Types.String,
    ref: 'Devices'
  }]
}, { _id: false });

Gateways.plugin(autoIncrement);
Gateways.plugin(ipAddressPlugin, { fields: ['ip'] });
export default mongoose.model('Gateways', Gateways, 'Gateways');
