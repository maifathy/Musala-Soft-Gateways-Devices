import Gateways from './../models/gateway.js';

const ctrlGateway = {
  getGateway: async (req, res) => {
    await Gateways.findOne({ _id: req.params.id })
      .select('_id name _ip_buf')
      .populate({ path: 'devices', select: '_id vendor status' })
      .exec((err, Gateway) => {
        if (err) {
          res.send(err.message);
        } else if (!Gateway) {
          res.sendStatus(404);
        } else {
          res.send(Gateway);
        }
      });
  },
  getGateways: async (req, res) => {
    await Gateways.find()
      .populate('devices')
      .exec((err, Gateway) => {
        if (err) {
          res.send(err.message);
        } else if (!Gateway) {
          res.sendStatus(404);
        } else {
          res.json(Gateway);
        }
      });
  },
  addGateway: async (req, res) => {
    await (new Gateways(req.body)).save((err, newGateway) => {
      if (err) {
        res.send(err.message);
      } else if (!newGateway) {
        res.status(404).json({ status: 404, message: 'Cannot create new gateway!!' });
      } else {
        res.status(200).json({
          status: 200,
          message: 'Gateway is successfully added',
          gateway: { _id: newGateway._id, name: newGateway.name, devices: [] }
        });
      }
    });
  },
  getDevicesCountPerGateway: async (id) => {
    const aggregatorOpts = [{
      $match: { _id: id }
    },
    {
      $unwind: '$devices'
    },
    {
      $group: { _id: null, count: { $sum: 1 } }
    }
    ];
    const count = await Gateways
      .aggregate(aggregatorOpts);
    return count[0] !== undefined ? count[0].count : 0;
  }
};

export default ctrlGateway;
