const mongoose = require("mongoose");

const Product =
  mongoose.models.Product ||
  mongoose.model(
    "Product",
    new mongoose.Schema({
      title: { type: String, required: true, maxlength: 60 },
      desc: { type: String, required: true, maxlength: 250 },
      img: { type: String, required: true },
      prices: { type: String, required: true, maxlength: 60 },
      extraOptions: {
        type: [
          {
            text: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    })
  );

module.exports = Product;
