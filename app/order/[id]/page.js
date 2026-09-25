import mongoose from 'mongoose';
import { notFound } from 'next/navigation';
import { FiCheck, FiHome, FiPackage, FiTruck } from 'react-icons/fi';
import { GiCookingPot } from 'react-icons/gi';
import AutoRefresh from '@/components/AutoRefresh';
import { requireUser } from '@/lib/auth';
import PizzaImage from '@/components/PizzaImage';
import { db } from '@/lib/db';
import { Order, plain } from '@/lib/models';
import { SIZES, STATUSES, money } from '@/lib/format';

export const metadata = { title: 'Your order' };

const icons = [FiPackage, GiCookingPot, FiTruck, FiHome];

export default async function OrderPage({ params }) {
  const { id } = await params;
  const session = await requireUser(`/order/${id}`);
  if (!mongoose.isValidObjectId(id)) notFound();
  await db();
  const order = plain(await Order.findById(id).lean());
  // 404 rather than 403 so order ids can't be probed.
  if (!order || (order.user !== session.id && session.role !== 'admin')) notFound();

  const done = order.status === 3;

  return (
    <section className="container-x max-w-3xl pt-12">
      {!done && <AutoRefresh />}
      <p className="eyebrow">Order #{id.slice(-6).toUpperCase()}</p>
      <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
        {done ? 'Delivered. Enjoy!' : `Thanks, ${order.customer.split(' ')[0]}! We’re on it.`}
      </h1>
      <p className="mt-2 text-muted">This page updates by itself. You can always find it under your account.</p>

      <ol className="card mt-8 grid gap-6 p-6 sm:grid-cols-4 sm:gap-2">
        {STATUSES.map((label, i) => {
          const Icon = icons[i];
          const state = i < order.status ? 'done' : i === order.status ? 'now' : 'todo';
          return (
            <li key={label} className="relative flex items-center gap-4 sm:flex-col sm:text-center">
              {i > 0 && (
                <span
                  aria-hidden
                  className={`absolute top-6 right-1/2 hidden h-0.5 w-full sm:block ${i <= order.status ? 'bg-tomato' : 'bg-crust'}`}
                />
              )}
              <span
                className={`relative grid size-12 shrink-0 place-items-center rounded-full text-xl transition ${
                  state === 'done' ? 'bg-tomato text-white' : state === 'now' ? 'bg-cheese text-ink ring-8 ring-cheese/25' : 'bg-crust text-muted'
                }`}
              >
                {state === 'done' ? <FiCheck /> : <Icon />}
                {state === 'now' && !done && <span className="absolute inset-0 animate-ping rounded-full bg-cheese/40" />}
              </span>
              <span className={`text-sm font-semibold ${state === 'todo' ? 'text-muted' : ''}`}>
                {label}
                {state === 'now' && <span className="sr-only"> (current)</span>}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="card mt-6 divide-y divide-crust">
        {order.items.map((i) => (
          <div key={i._id} className="flex items-center gap-4 p-4">
            <PizzaImage src={i.img} alt="" className="size-14 shrink-0" sizes="56px" />
            <div className="flex-1">
              <p className="font-semibold">{i.qty} × {i.title}</p>
              <p className="text-sm text-muted">
                {SIZES[i.size]}
                {i.extras.length > 0 && ` · ${i.extras.join(', ')}`}
              </p>
            </div>
            <span className="font-semibold tabular-nums">{money(i.price * i.qty)}</span>
          </div>
        ))}
        <div className="flex items-baseline justify-between p-4">
          <span className="text-muted">Total, cash on delivery</span>
          <span className="font-display text-2xl font-semibold">{money(order.total)}</span>
        </div>
        <p className="p-4 text-sm text-muted">Delivering to {order.address}</p>
      </div>
    </section>
  );
}
