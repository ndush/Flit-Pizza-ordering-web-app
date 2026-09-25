import mongoose from 'mongoose';
import { seed } from './seed';

// Cached on globalThis so dev hot-reloads reuse one connection.
export function db() {
  globalThis._flitDb ??= connect().catch((err) => {
    globalThis._flitDb = null;
    throw err;
  });
  return globalThis._flitDb;
}

async function connect() {
  let uri = process.env.MONGODB_URI;
  if (!uri) {
    if (process.env.NODE_ENV === 'production') throw new Error('MONGODB_URI is not set');
    // ponytail: embedded mongod for zero-setup dev, persisted to .data/. Set MONGODB_URI for real deployments.
    const { mkdirSync } = await import('node:fs');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    mkdirSync('.data', { recursive: true });
    const server = await MongoMemoryServer.create({ instance: { dbPath: '.data', storageEngine: 'wiredTiger' } });
    uri = server.getUri('flit');
    console.log('[db] using embedded MongoDB (set MONGODB_URI to use your own)');
  }
  await mongoose.connect(uri);
  await seed();
}
