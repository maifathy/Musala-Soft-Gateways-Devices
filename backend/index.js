import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routeDevice from './routes/routeDevice.js';
import routeGateway from './routes/routeGateway.js';
import mongoUtil from './utils/dbHandler.js';
import { clearCollections } from './utils/helpers.js';

const app = express();
const router = express.Router();

// Connect to the db
mongoUtil.connect(() => {
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use('/api/v1', router);
  routeDevice(router);
  routeGateway(router);
  router.post('/clearCollections', clearCollections);
  // insert default data
  // fillData();
});

export default app;
