import express from 'express';
import app from './index.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, '/frontend/build')));

const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`Gateways API v1 on port: ${port}`);
});
