const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true, maxlength: 200 },
  address: { type: String, required: true, maxlength: 200 },
  total: { type: Number, required: true },
  status: { type: Number, default: 0 },
  method: { type: Number, required: true },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
