const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../utils/dbConnect.js");

const mongoose = require("mongoose");
const Product = require("../models/Product.js");
const Order = require("../models/Order.js");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

const seedDatabase = async () => {
  try {
    await connectDB();

    await seedUsers();

    await seedProductsAndOrders();
  } catch (error) {
  } finally {
    mongoose.disconnect();
  }
};

const seedUsers = async () => {
  try {
    const users = [
      {
        username: "admin",
        password: "vV4xzyqDF0",
      },
    ];

    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return { ...user, password: hashedPassword };
      })
    );

    const usersResult = await User.insertMany(hashedUsers);
  } catch (error) {}
};
const seedProductsAndOrders = async () => {
  try {
    const products = [
      {
        title: "Greek pizza",
        desc: "Traditional Greek pizza with feta and olives",
        img: "/images/l.png",
        prices: 20.99,
        extraOptions: [
          { text: "Option 1", price: 2.5 },
          { text: "Option 2", price: 3.0 },
        ],
      },
      {
        title: "Chicken pizza",
        desc: "Savory chicken pizza with a variety of toppings",
        img: "/images/l.png",
        prices: 30.99,
        ratings: 4.2,
        extraOptions: [
          { text: "Option 1", price: 2.0 },
          { text: "Option 2", price: 2.5 },
        ],
      },
      {
        title: "Calzone",
        desc: "Folded pizza filled with delicious ingredients",
        img: "/images/l.png",
        prices: 33.99,
        ratings: 4.8,
        extraOptions: [
          { text: "Option 1", price: 3.0 },
          { text: "Option 2", price: 3.5 },
        ],
      },
      {
        title: "Margherita pizza",
        desc: "Classic Margherita pizza with fresh tomatoes and basil",
        img: "/images/l.png",
        prices: 36.99,
        ratings: 4.9,
        extraOptions: [
          { text: "Option 1", price: 2.5 },
          { text: "Option 2", price: 3.0 },
        ],
      },
      {
        title: "Veggie pizza",
        desc: "Vegetarian pizza loaded with fresh vegetables",
        img: "/images/l.png",
        prices: 26.99,
        ratings: 4.6,
        extraOptions: [
          { text: "Option 1", price: 2.0 },
          { text: "Option 2", price: 2.5 },
        ],
      },
      {
        title: "Hawaiian pizza",
        desc: "Sweet and savory Hawaiian pizza with ham and pineapple",
        img: "/images/l.png",
        prices: 21.99,
        ratings: 4.3,
        extraOptions: [
          { text: "Option 1", price: 3.0 },
          { text: "Option 2", price: 3.5 },
        ],
      },
      {
        title: "Cheese pizza",
        desc: "Simple and cheesy pizza for cheese lovers",
        img: "/images/l.png",
        prices: 22.99,
        ratings: 4.7,
        extraOptions: [
          { text: "Option 1", price: 2.5 },
          { text: "Option 2", price: 3.0 },
        ],
      },
      {
        title: "Pizza rolls",
        desc: "Delicious pizza rolls with various fillings",
        img: "/images/l.png",
        prices: 23.99,
        ratings: 4.4,
        extraOptions: [
          { text: "Option 1", price: 2.0 },
          { text: "Option 2", price: 2.5 },
        ],
      },
      {
        title: "Meat pizza",
        desc: "Hearty meat lovers pizza with assorted meats",
        img: "/images/l.png",
        prices: 23.99,
        ratings: 4.5,
        extraOptions: [
          { text: "Option 1", price: 3.0 },
          { text: "Option 2", price: 3.5 },
        ],
      },
      {
        title: "Buffalo pizza",
        desc: "Spicy Buffalo chicken pizza with a kick",
        img: "/images/l.png",
        prices: 21.99,
        ratings: 4.1,
        extraOptions: [
          { text: "Option 1", price: 2.5 },
          { text: "Option 2", price: 3.0 },
        ],
      },
      {
        title: "Pepperoni pizza",
        desc: "Classic pepperoni pizza with extra pepperoni",
        img: "/images/l.png",
        prices: 21.99,
        ratings: 4.8,
        extraOptions: [
          { text: "Option 1", price: 2.0 },
          { text: "Option 2", price: 2.5 },
        ],
      },
      {
        title: "Pizzette",
        desc: "Miniature pizzas with a variety of toppings",
        img: "/images/l.png",
        prices: 29.99,
        ratings: 4.6,
        extraOptions: [
          { text: "Option 1", price: 3.0 },
          { text: "Option 2", price: 3.5 },
        ],
      },
      {
        title: "Gusta pizza",
        desc: "Gourmet Gusta pizza with unique flavors",
        img: "/images/l.png",
        prices: 21.99,
        ratings: 4.2,
        extraOptions: [
          { text: "Option 1", price: 2.5 },
          { text: "Option 2", price: 3.0 },
        ],
      },
      {
        title: "Taglio pizza",
        desc: "Sliced Taglio pizza with a crispy crust",
        img: "/images/l.png",
        prices: 21.99,
        ratings: 4.3,
        extraOptions: [
          { text: "Option 1", price: 2.0 },
          { text: "Option 2", price: 2.5 },
        ],
      },
      {
        title: "Caprese pizza",
        desc: "Fresh Caprese pizza with mozzarella and tomatoes",
        img: "/images/l.png",
        prices: 21.99,
        ratings: 4.9,
        extraOptions: [
          { text: "Option 1", price: 3.0 },
          { text: "Option 2", price: 3.5 },
        ],
      },
    ];

    const productsResult = await Product.insertMany(products);
    console.log("Sample products inserted:", productsResult);

    const orders = [
      {
        customer: "Danie",
        address: "123 Main St",
        total: 80,
        status: 0,
        method: 1,
      },
      {
        customer: "Jassy",
        address: "Ngr",
        total: 100,
        status: 0,
        method: 1,
      },
      {
        customer: "Sigiey",
        address: "Nrb",
        total: 200,
        status: 0,
        method: 1,
      },
    ];

    const ordersResult = await Order.insertMany(orders);
  } catch (error) {
    console.error("Error seeding products and orders:", error);
  }
};

seedDatabase();
