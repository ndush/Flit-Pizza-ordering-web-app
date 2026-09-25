import bcrypt from 'bcryptjs';
import { Account, Product } from './models';

const extras = [
  { text: 'Extra cheese', price: 1.5 },
  { text: 'Spicy sauce', price: 0.75 },
  { text: 'Garlic crust', price: 1 },
];

const pizzas = [
  ['Margherita', 'San Marzano tomato, fior di latte, fresh basil and a drizzle of olive oil.', '/images/l.png', [9.99, 12.99, 15.99]],
  ['Pepperoni', 'Double pepperoni cups that crisp at the edges, mozzarella and oregano.', '/images/sump.png', [11.99, 14.99, 17.99]],
  ['Garden Veggie', 'Peppers, olives, red onion, mushrooms and cherry tomatoes on a light tomato base.', '/images/cious.png', [10.99, 13.99, 16.99]],
  ['Hot Honey', 'Spicy salami, chilli flakes and hot honey over mozzarella.', '/images/6.png', [12.99, 15.99, 18.99]],
  ['Chicken Supreme', 'Roast chicken, sweetcorn, peppers and smoky BBQ swirl.', '/images/5.png', [12.49, 15.49, 18.49]],
  ['Rocket & Parma', 'Prosciutto, wild rocket, shaved parmesan and lemon.', '/images/g.jpg', [13.99, 16.99, 19.99]],
];

export async function seed() {
  if ((await Product.estimatedDocumentCount()) === 0) {
    await Product.insertMany(pizzas.map(([title, desc, img, prices]) => ({ title, desc, img, prices, extras })));
    console.log(`[seed] inserted ${pizzas.length} pizzas`);
  }

  if (!(await Account.exists({ role: 'admin' }))) {
    const email = process.env.ADMIN_EMAIL || 'admin@flit.test';
    const password = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== 'production' && 'admin123');
    if (!password) return console.warn('[seed] no admin created: set ADMIN_PASSWORD');
    await Account.create({ name: 'Flit Kitchen', email, password: await bcrypt.hash(password, 10), role: 'admin' });
    console.log(`[seed] created admin account ${email}`);
  }
}
