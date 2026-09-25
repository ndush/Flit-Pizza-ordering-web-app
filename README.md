# Flit Pizza

Order hand-stretched pizza online, pay cash on delivery, and track the order live. Built with Next.js 16 (App Router), MongoDB/Mongoose, Tailwind CSS v4 and [React Bits](https://reactbits.dev) animations.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

No setup needed for development: with `MONGODB_URI` unset, an embedded MongoDB starts automatically (data kept in `.data/`, delete it to reset) and is seeded with six pizzas and a staff account **admin@flit.test / admin123**.

Customers sign up at `/register`, must be logged in to check out, and see their order history at `/account`. Staff log in at the same `/login` and land on the dashboard at `/admin`.

## Production

Copy `.env.example` to `.env.local` (or set these in your host) and fill in:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (required) |
| `JWT_SECRET` | Long random string for signing admin sessions (required) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Staff account created on boot if no admin exists |

```bash
npm run build && npm start
```

## How it's put together

```
app/
  actions.js            server actions: placeOrder, login/logout, create/delete product, advance order
  page.js               home
  menu/                 searchable, sortable menu
  product/[id]/         size + extras picker
  cart/                 cart + checkout (cash on delivery)
  order/[id]/           live order tracker, visible to its owner and staff
  login/, register/     customer + staff auth
  account/              order history
  admin/                staff dashboard: orders, menu management
components/
  bits/                 React Bits components (vendored, as the library intends)
  Cart.js               cart state, persisted to localStorage
lib/
  db.js                 cached Mongoose connection (+ embedded dev fallback)
  models.js             Product, Order, User
  seed.js               first-boot data
  auth.js               JWT session (id, name, role) in an httpOnly cookie
  format.js             prices, sizes, statuses (shared client/server)
```

Pages read MongoDB directly in server components; all writes go through server actions. Order totals are always recomputed on the server from database prices. Every admin action checks the session role; orders are only visible to the customer who placed them and to staff.
