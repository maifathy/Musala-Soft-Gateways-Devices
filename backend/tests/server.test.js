import app from '../index.js';
import { dbUrl } from '../utils/helpers.js';
import Gateways from '../models/gateway.js';
import Devices from '../models/device.js';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';

beforeEach((done) => {
  mongoose.connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  async function clearCollections() {
    const collections = mongoose.connection.collections;
    await Promise.all(Object.values(collections).map(async (collection) => {
      await collection.deleteMany({});
    }));
  }
  clearCollections()
    .then(() => {
      mongoose.connection.close(() => done());
    });
});

it('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});

test('GET /api/v1/gateways', async () => {
  const gateway = await Gateways.create({ name: 'Gateway1', ip: '127.0.0.1' });
  await supertest(app).get('/api/v1/gateways')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);
      // Check data
      expect(response.body[0]._id).toBe(gateway._id);
      expect(response.body[0].name).toBe(gateway.name);
    });
});

test('GET /api/v1/gateways/1', async () => {
  const gateway = await Gateways.create({ name: 'Gateway1', ip: '127.0.0.1' });
  await supertest(app).get('/api/v1/gateways/1')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      expect(response.body._id).toBe(gateway._id);
      expect(response.body.name).toBe(gateway.name);
      expect(response.body._ip_buf.data.join('.')).toBe(gateway.ip);
    });
});

test('POST /api/v1/gateways', async () => {
  const gateway = new Gateways({ _id: 1, name: 'Gateway1', ip: '127.0.0.1' });
  await supertest(app)
    .post('/api/v1/gateways')
    .send({ name: 'Gateway1', ip: '127.0.0.1' })
    .then((response) => {
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe('Gateway is successfully added');
      expect(response.body.gateway._id).toBe(gateway._id);
      expect(response.body.gateway.name).toBe(gateway.name);
    });
});

test('POST /api/v1/devices', async () => {
  const gateway = await Gateways.create({ _id: 1, name: 'Gateway1', ip: '127.0.0.1' });
  const device = new Devices({ vendor: 'Samsung', status: 'Online' });
  await supertest(app)
    .post('/api/v1/devices')
    .send({ vendor: 'Samsung', status: 'Online', gatewayId: gateway._id })
    .then((response) => {
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe('Device is successfully added');
      expect(response.body.device.vendor).toBe(device.vendor);
      expect(response.body.device.status).toBe(device.status);
    });
});

test('DELETE /api/v1/devices', async () => {
  const device = await Devices.create({ _id: uuidv4(), vendor: 'Samsung', status: 'Online' });
  await Gateways.create({
    _id: 1, name: 'Gateway1', ip: '127.0.0.1', devices: [device._id]
  });
  await supertest(app)
    .delete(`/api/v1/devices/${device._id}`)
    .then((response) => {
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe('Device is successfully removed');
    });
});

test('DELETE /api/v1/devices -- No Gateway ID', async () => {
  const device = await Devices.create({ _id: uuidv4(), vendor: 'Samsung', status: 'Online' });
  await supertest(app)
    .delete(`/api/v1/devices/${device._id}`)
    .then((response) => {
      expect(response.body.status).toBe(403);
      expect(response.body.message).toBe('Cannot remove device, try again!!');
    });
});
