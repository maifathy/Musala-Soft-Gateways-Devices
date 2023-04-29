import mongoose from 'mongoose';
import Devices from './../models/device.js';
import Gateways from './../models/gateway.js';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();
export const dbUrl = process.env.DB_URL;

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

export const clearCollections = async () => {
  const collections = mongoose.connection.collections;
  // await Devices.deleteMany({});
  // await Gateways.deleteMany({});
  await Promise.all(Object.values(collections).map(async (collection) => {
    // if (collection !== Devices && collection !== Gateways) {
    await collection.deleteMany({});
    // }
  }));
};

export const executeClearCollections = () => {
  clearCollections()
    .then((response) => {
      console.log('response: ', response);
      return { status: 200, message: 'Collections are successfully cleared!', state: response };
    })
    .catch((e) => {
      console.log(`POST clearCollections error: ${e}`);
      return { status: 400, message: 'An error happened while deleteing the collections.' };
    });
};
