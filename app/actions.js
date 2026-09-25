'use server';

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { Account, Order, Product } from '@/lib/models';
import { endSession, getSession, requireAdmin, safeNext, startSession } from '@/lib/auth';
import { round2, unitPrice } from '@/lib/format';

const text = (v, max) => {
  const s = String(v ?? '').trim();
  return s && s.length <= max ? s : null;
};

// Prices are recomputed from the database, never trusted from the client.
export async function placeOrder(input) {
  const session = await getSession();
  if (!session) return { error: 'Please log in to place your order.' };
  const customer = text(input?.customer, 80);
  const phone = text(input?.phone, 30);
  const address = text(input?.address, 200);
  if (!customer || !phone || !address) return { error: 'Please fill in your name, phone and address.' };
  if (!/^[+\d][\d\s()-]{5,}$/.test(phone)) return { error: 'That phone number looks off.' };

  const lines = Array.isArray(input.items) ? input.items : [];
  if (!lines.length || lines.length > 50) return { error: 'Your cart is empty.' };

  await db();
  const ids = lines.map((l) => l.productId).filter((id) => mongoose.isValidObjectId(id));
  const products = new Map((await Product.find({ _id: { $in: ids } })).map((p) => [String(p._id), p]));

  const items = [];
  for (const l of lines) {
    const p = products.get(String(l.productId));
    const size = Number(l.size);
    const qty = Number(l.qty);
    if (!p || ![0, 1, 2].includes(size) || !Number.isInteger(qty) || qty < 1 || qty > 20)
      return { error: 'Something in your cart is no longer available. Please remove it and try again.' };
    const picked = Array.isArray(l.extras) ? l.extras : [];
    const extras = p.extras.map((e) => e.text).filter((t) => picked.includes(t));
    items.push({ productId: p._id, title: p.title, img: p.img, size, extras, qty, price: unitPrice(p, size, extras) });
  }

  const total = round2(items.reduce((s, i) => s + i.price * i.qty, 0));
  const order = await Order.create({ user: session.id, customer, phone, address, items, total });
  await Account.updateOne({ _id: session.id }, { phone, address });
  revalidatePath('/admin');
  return { id: String(order._id) };
}

let DUMMY_HASH;

export async function login(_prev, form) {
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  await db();
  const account = await Account.findOne({ email });
  // Always run bcrypt so response time doesn't reveal which emails exist.
  const ok = await bcrypt.compare(String(form.get('password') ?? ''), account?.password ?? (DUMMY_HASH ??= await bcrypt.hash('dummy', 10)));
  if (!account || !ok) return { error: 'Wrong email or password.', email };
  await startSession(account);
  redirect(safeNext(form.get('next'), account.role === 'admin' ? '/admin' : '/account'));
}

export async function register(_prev, form) {
  const name = text(form.get('name'), 80);
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  const password = String(form.get('password') ?? '');
  const back = { name: name ?? '', email };
  if (!name) return { ...back, error: 'Please tell us your name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) return { ...back, error: 'That email doesn’t look right.' };
  if (password.length < 8 || password.length > 200) return { ...back, error: 'Password must be at least 8 characters.' };

  await db();
  if (await Account.exists({ email })) return { ...back, error: 'An account with that email already exists. Try logging in.' };
  const account = await Account.create({ name, email, password: await bcrypt.hash(password, 10) });
  await startSession(account);
  redirect(safeNext(form.get('next'), '/account'));
}

export async function logout() {
  await endSession();
  redirect('/');
}

export async function createProduct(_prev, form) {
  await requireAdmin();
  const title = text(form.get('title'), 60);
  const desc = text(form.get('desc'), 250);
  const img = text(form.get('img'), 500);
  const prices = ['small', 'medium', 'large'].map((k) => Number(form.get(k)));
  if (!title || !desc) return { error: 'Title and description are required.' };
  if (!img || !/^(\/|https:\/\/)/.test(img)) return { error: 'Image must be a /path or an https:// URL.' };
  if (prices.some((p) => !(p > 0))) return { error: 'All three prices must be positive numbers.' };

  // One extra per line: "Extra cheese: 1.50"
  const extras = [];
  for (const line of String(form.get('extras') ?? '').split('\n')) {
    if (!line.trim()) continue;
    const m = line.match(/^(.+?)\s*:\s*(\d+(?:\.\d+)?)\s*$/);
    if (!m) return { error: `Can't read extra "${line.trim()}". Use "Name: price".` };
    extras.push({ text: m[1].trim(), price: Number(m[2]) });
  }

  await db();
  await Product.create({ title, desc, img, prices, extras });
  revalidatePath('/', 'layout');
  return { ok: `Added ${title}.` };
}

export async function deleteProduct(id) {
  await requireAdmin();
  if (!mongoose.isValidObjectId(id)) return;
  await db();
  await Product.findByIdAndDelete(id);
  revalidatePath('/', 'layout');
}

export async function advanceOrder(id) {
  await requireAdmin();
  if (!mongoose.isValidObjectId(id)) return;
  await db();
  await Order.updateOne({ _id: id, status: { $lt: 3 } }, { $inc: { status: 1 } });
  revalidatePath('/admin');
  revalidatePath(`/order/${id}`);
}
