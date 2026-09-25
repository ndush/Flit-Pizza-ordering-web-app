import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { advanceOrder, logout } from '../actions';
import AddProductForm from '@/components/admin/AddProductForm';
import DeleteButton from '@/components/admin/DeleteButton';
import AutoRefresh from '@/components/AutoRefresh';
import PizzaImage from '@/components/PizzaImage';
import { requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { Order, Product, plain } from '@/lib/models';
import { STATUSES, money } from '@/lib/format';

export const metadata = { title: 'Dashboard' };

const badge = ['bg-cheese/30', 'bg-tomato/15 text-tomato-dark', 'bg-basil/15 text-basil', 'bg-crust text-muted'];

export default async function AdminPage() {
  await requireAdmin();
  await db();
  const [orders, products] = await Promise.all([
    Order.find().sort({ createdAt: -1 }).limit(50).lean().then(plain),
    Product.find().sort({ createdAt: 1 }).lean().then(plain),
  ]);
  const open = orders.filter((o) => o.status < 3);
  const revenue = orders.filter((o) => o.status === 3).reduce((s, o) => s + o.total, 0);

  return (
    <section className="container-x pt-10">
      <AutoRefresh seconds={20} />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Kitchen</p>
          <h1 className="mt-1 text-5xl font-semibold">Dashboard</h1>
        </div>
        <form action={logout}>
          <button className="btn-ghost"><FiLogOut /> Log out</button>
        </form>
      </div>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ['Open orders', open.length],
          ['Delivered revenue', money(revenue)],
          ['Pizzas on menu', products.length],
        ].map(([k, v]) => (
          <div key={k} className="card p-5">
            <dt className="text-sm text-muted">{k}</dt>
            <dd className="mt-1 font-display text-3xl font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 mb-4 text-3xl font-semibold">Orders</h2>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-crust text-xs tracking-wider text-muted uppercase">
            <tr>
              <th className="p-4 font-semibold">Order</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Items</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-crust">
            {orders.map((o) => (
              <tr key={o._id} className="align-top">
                <td className="p-4">
                  <Link href={`/order/${o._id}`} className="font-mono font-semibold hover:text-tomato">#{o._id.slice(-6).toUpperCase()}</Link>
                  <p className="text-xs text-muted">{new Date(o.createdAt).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}</p>
                </td>
                <td className="p-4">
                  <p className="font-semibold">{o.customer}</p>
                  <p className="text-xs text-muted">{o.phone}</p>
                  <p className="max-w-48 text-xs text-muted">{o.address}</p>
                </td>
                <td className="p-4 text-xs">{o.items.map((i) => `${i.qty}× ${i.title}`).join(', ')}</td>
                <td className="p-4 font-semibold tabular-nums">{money(o.total)}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${badge[o.status]}`}>{STATUSES[o.status]}</span>
                </td>
                <td className="p-4 text-right">
                  {o.status < 3 && (
                    <form action={advanceOrder.bind(null, o._id)}>
                      <button className="btn-primary px-3 py-1.5 text-xs whitespace-nowrap">Mark {STATUSES[o.status + 1].toLowerCase()}</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {!orders.length && (
              <tr><td colSpan={6} className="p-10 text-center text-muted">No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 mb-4 text-3xl font-semibold">Menu</h2>
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
        <ul className="card divide-y divide-crust">
          {products.map((p) => (
            <li key={p._id} className="flex items-center gap-4 p-4">
              <PizzaImage src={p.img} alt="" className="size-12 shrink-0" sizes="48px" />
              <div className="min-w-0 flex-1">
                <Link href={`/product/${p._id}`} className="font-semibold hover:text-tomato">{p.title}</Link>
                <p className="text-xs text-muted">{p.prices.map(money).join(' / ')}{p.extras.length > 0 && ` · ${p.extras.length} extras`}</p>
              </div>
              <DeleteButton id={p._id} title={p.title} />
            </li>
          ))}
        </ul>
        <AddProductForm />
      </div>
    </section>
  );
}
