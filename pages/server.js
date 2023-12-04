const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const orders = {};

app.post('/api/place-order', (req, res) => {
  const { name, phoneNumber, address, total } = req.body;
  const orderId = uuidv4();
  orders[orderId] = { orderId, name, phoneNumber, address, total };
  res.json({ orderId });
});

app.get('/api/order-details/:orderId', (req, res) => {
  const { orderId } = req.params;
  const orderDetails = orders[orderId];

  if (!orderDetails) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json(orderDetails);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
