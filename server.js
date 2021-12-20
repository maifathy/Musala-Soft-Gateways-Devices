import app from './index.js';

const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`Gateways API v1 on port: ${port}`);
});
