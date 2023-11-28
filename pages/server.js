const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001; // Choose a port for your server

app.use(bodyParser.json());

// In-memory storage for orders (replace with a database in a production environment)
const orders = {};

// Endpoint to handle placing a new order
app.post('/api/place-order', (req, res) => {
  const { name, phoneNumber, address, total } = req.body;

  // Generate a unique orderId
  const orderId = uuidv4();

  // Store the order information
  orders[orderId] = { orderId, name, phoneNumber, address, total };

  // Respond with the orderId
  res.json({ orderId });
});

// Endpoint to fetch order details
app.get('/api/order-details/:orderId', (req, res) => {
  const { orderId } = req.params;
  const orderDetails = orders[orderId];

  if (!orderDetails) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json(orderDetails);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
