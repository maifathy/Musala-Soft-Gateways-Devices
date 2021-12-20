import Devices from './../models/device.js';
import Gateways from './../models/gateway.js';
import ctrlGateway from './ctrlGateway.js';
import { v4 as uuidv4 } from 'uuid';

const ctrlDevice = {
  getDevice: async (req, res) => {
    await Devices.find({ _id: req.params.id })
      .exec((err, Device) => {
        if (err) {
          res.send(err.message);
        } else if (!Device) {
          res.sendStatus(404);
        } else {
          res.send(Device);
        }
      });
  },
  addDevice: async (req, res) => {
    const count = await ctrlGateway.getDevicesCountPerGateway(req.body.gatewayId);
    if (count < 10) {
      await (new Devices(
        {
          _id: uuidv4(),
          vendor: req.body.vendor,
          status: req.body.status
        }
      )).save((err, newDevice) => {
        if (err) {
          res.send(`{ "error": "${err.message}" }`);
        } else if (!newDevice) {
          res.sendStatus(404);
        } else {
          Gateways.findOneAndUpdate(
            { _id: req.body.gatewayId },
            { $push: { devices: newDevice._id } },
            (errAddToGateway) => {
              if (errAddToGateway) {
                Devices.deleteOne({ _id: req.params.id });
                console.log('error adding to gateway: ', errAddToGateway.message);
                res.json({ status: 403, message: 'Invalid Gateway, Device cannot be added' });
              } else {
                res.json({ status: 200, message: 'Device is successfully added', device: newDevice });
              }
            }
          );
        }
      });
    } else {
      res.status(403).json({ status: 403, message: 'Invalid to add more than 10 devices to the same gateway!!' });
    }
  },
  deleteDevice: async (req, res) => {
    try {
      const gateway = await Gateways.findOne({ devices: req.params.id });
      Gateways.findOneAndUpdate(
        { _id: gateway._id },
        { $pull: { devices: req.params.id } },
        (errGateway) => {
          if (errGateway) {
            console.log('error removing from gateway: ', errGateway.message);
          }
        }
      );
      await Devices.deleteOne({ _id: req.params.id });

      res.status(200).json({ status: 200, message: 'Device is successfully removed' });
    } catch (err) {
      console.log('err: ', err.message);
      res.status(403).json({ status: 403, message: 'Cannot remove device, try again!!' });
    }
  }
};

export default ctrlDevice;
