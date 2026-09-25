import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../actions';
import { requireUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { Order, plain } from '@/lib/models';
import { STATUSES, money } from '@/lib/format';

export const metadata = { title: 'Your account' };

export default async function AccountPage() {
  const session = await requireUser('/account');
  await db();
  const orders = plain(await Order.find({ user: session.id }).sort({ createdAt: -1 }).lean());

  return (
    <section className="container-x max-w-3xl pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Your account</p>
          <h1 className="mt-1 text-5xl font-semibold">Hi, {session.name.split(' ')[0]}</h1>
        </div>
        <div className="flex gap-2">
          {session.role === 'admin' && <Link href="/admin" className="btn-ghost">Dashboard</Link>}
          <form action={logout}>
            <button className="btn-ghost"><FiLogOut /> Log out</button>
          </form>
        </div>
      </div>

      <h2 className="mt-10 mb-4 text-3xl font-semibold">Your orders</h2>
      {orders.length ? (
        <ul className="card divide-y divide-crust">
          {orders.map((o) => (
            <li key={o._id}>
              <Link href={`/order/${o._id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 p-4 transition hover:bg-cream/60">
                <span className="font-mono font-semibold">#{o._id.slice(-6).toUpperCase()}</span>
                <span className="text-sm text-muted">{new Date(o.createdAt).toLocaleDateString('en-GB', { dateStyle: 'medium' })}</span>
                <span className="min-w-0 flex-1 truncate text-sm">{o.items.map((i) => `${i.qty}× ${i.title}`).join(', ')}</span>
                <span className="rounded-full bg-crust px-2.5 py-1 text-xs font-semibold">{STATUSES[o.status]}</span>
                <span className="w-20 text-right font-semibold tabular-nums">{money(o.total)}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card p-10 text-center">
          <p className="text-muted">No orders yet.</p>
          <Link href="/menu" className="btn-primary mt-6">Browse the menu</Link>
        </div>
      )}
    </section>
  );
}
