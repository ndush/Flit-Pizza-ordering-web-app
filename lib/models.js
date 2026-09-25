import mongoose, { Schema } from 'mongoose';

// In dev, recompile on hot reload so schema edits apply without a restart.
const model = (name, schema) => {
  if (mongoose.models[name] && process.env.NODE_ENV !== 'production') mongoose.deleteModel(name);
  return mongoose.models[name] || mongoose.model(name, schema);
};

export const Product = model(
  'Product',
  new Schema(
    {
      title: { type: String, required: true, trim: true, maxlength: 60 },
      desc: { type: String, required: true, trim: true, maxlength: 250 },
      img: { type: String, required: true },
      prices: { type: [{ type: Number, min: 0 }], validate: (v) => v.length === 3 }, // small, medium, large
      extras: [{ text: { type: String, required: true }, price: { type: Number, required: true, min: 0 } }],
    },
    { timestamps: true },
  ),
);

export const Order = model(
  'Order',
  new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: 'Account', required: true, index: true },
      customer: { type: String, required: true, trim: true, maxlength: 80 },
      phone: { type: String, required: true, trim: true, maxlength: 30 },
      address: { type: String, required: true, trim: true, maxlength: 200 },
      items: [
        {
          productId: { type: Schema.Types.ObjectId, ref: 'Product' },
          title: String,
          img: String,
          size: Number,
          extras: [String],
          qty: Number,
          price: Number, // unit price at time of order
        },
      ],
      total: { type: Number, required: true },
      status: { type: Number, default: 0, min: 0, max: 3 },
      method: { type: String, default: 'cash' },
    },
    { timestamps: true },
  ),
);

export const Account = model(
  'Account',
  new Schema(
    {
      name: { type: String, required: true, trim: true, maxlength: 80 },
      email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 120 },
      password: { type: String, required: true }, // bcrypt hash
      role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
      // Remembered from the last order to prefill checkout.
      phone: { type: String, default: '' },
      address: { type: String, default: '' },
    },
    { timestamps: true },
  ),
);

// Server components can't pass Mongoose docs / ObjectIds to client components.
export const plain = (doc) => JSON.parse(JSON.stringify(doc));
