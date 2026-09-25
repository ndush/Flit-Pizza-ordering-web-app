// Shared by server and client — must not import mongoose.
export const SIZES = ['Small', 'Medium', 'Large'];
export const STATUSES = ['Received', 'Preparing', 'On the way', 'Delivered'];

export const money = (n) => `$${Number(n).toFixed(2)}`;
export const round2 = (n) => Math.round(n * 100) / 100;

export const unitPrice = (product, size, extras) =>
  round2(product.prices[size] + product.extras.filter((e) => extras.includes(e.text)).reduce((s, e) => s + e.price, 0));
