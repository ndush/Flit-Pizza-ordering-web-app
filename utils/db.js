// utils/db.js

let MongoClient;

if (typeof window === 'undefined') {
  // Run this code only on the server side
  const { MongoClient: ServerMongoClient } = require('mongodb');
  MongoClient = ServerMongoClient;
}

export async function connectToDatabase() {
  if (!MongoClient) {
    throw new Error('MongoClient is not defined on the client side');
  }

  // Your MongoDB connection logic here
}

// Other server-only MongoDB-related code...
