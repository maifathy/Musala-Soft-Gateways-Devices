import Devices from './../models/device.js';
import Gateways from './../models/gateway.js';
import { v4 as uuidv4 } from 'uuid';

export const dbUrl = 'mongodb://localhost:27017/Gateways';

export const insertGateway = async (name, ip) => {
  let insertRes;
  insertRes = new Gateways(
    {
      name: name,
      ip: ip
    }
  );
  await insertRes.save((err) => { if (err) { console.log('error adding gateway: ', err.message); } });
};

export const insertDevice = async (vendor, status, gatewayId) => {
  let insertRes;
  const deviceId = uuidv4();
  insertRes = new Devices(
    {
      _id: deviceId,
      vendor: vendor,
      status: status
    }
  );
  await insertRes.save((err) => {
    if (err) {
      console.log('error adding device: ', err.message);
    } else {
      Gateways.findOneAndUpdate(
        { _id: gatewayId },
        { $push: { devices: deviceId } },
        (errAddToGateway) => {
          if (errAddToGateway) {
            console.log('error adding gateway: ', errAddToGateway.message);
          }
        }
      );
    }
  });
};

export const fillData = () => {
  insertGateway('Gateway1', '127.0.0.1');
  insertDevice('Samsung', 'Online', 1);
};
