'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { placeOrder } from '@/app/actions';
import { useCart } from '@/components/Cart';
import PizzaImage from '@/components/PizzaImage';
import { SIZES, money } from '@/lib/format';

export default function CartView({ profile }) {
  const { items, ready, setQty, clear, total } = useCart();
  const router = useRouter();
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();

  const submit = (e) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget));
    setError('');
    startTransition(async () => {
      const res = await placeOrder({
        ...form,
        items: items.map(({ productId, size, extras, qty }) => ({ productId, size, extras, qty })),
      });
      if (res.error) return setError(res.error);
      router.push(`/order/${res.id}`);
      clear();
    });
  };

  if (!ready) return <section className="container-x min-h-[50vh] pt-12" aria-busy />;

  if (!items.length)
    return (
      <section className="container-x grid place-items-center py-28 text-center">
        <h1 className="text-4xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-muted">Nothing a pizza can’t fix.</p>
        <Link href="/menu" className="btn-primary mt-8">Browse the menu</Link>
      </section>
    );

  return (
    <section className="container-x pt-12">
      <h1 className="mb-8 text-5xl font-semibold">Your cart</h1>
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="card divide-y divide-crust">
          {items.map((i) => (
            <li key={i.key} className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap sm:p-5">
              <PizzaImage src={i.img} alt="" className="size-20 shrink-0" sizes="80px" />
              <div className="min-w-0 flex-1">
                <Link href={`/product/${i.productId}`} className="font-display text-lg font-semibold hover:text-tomato">{i.title}</Link>
                <p className="text-sm text-muted">
                  {SIZES[i.size]}
                  {i.extras.length > 0 && ` · ${i.extras.join(', ')}`}
                </p>
                <p className="text-sm text-muted">{money(i.price)} each</p>
              </div>
              <div className="flex items-center rounded-full border border-ink/15 bg-white">
                <button className="grid size-9 place-items-center" onClick={() => setQty(i.key, i.qty - 1)} aria-label={`One less ${i.title}`}>
                  <FiMinus />
                </button>
                <span className="w-6 text-center text-sm font-semibold tabular-nums">{i.qty}</span>
                <button className="grid size-9 place-items-center" onClick={() => setQty(i.key, i.qty + 1)} aria-label={`One more ${i.title}`}>
                  <FiPlus />
                </button>
              </div>
              <span className="w-20 text-right font-semibold tabular-nums">{money(i.price * i.qty)}</span>
              <button className="grid size-9 place-items-center rounded-full text-muted hover:bg-tomato/10 hover:text-tomato" onClick={() => setQty(i.key, 0)} aria-label={`Remove ${i.title}`}>
                <FiTrash2 />
              </button>
            </li>
          ))}
        </ul>

        {!profile ? (
          <div className="card space-y-4 p-6 lg:sticky lg:top-24">
            <div className="flex items-baseline justify-between">
              <span className="text-muted">Total</span>
              <span className="font-display text-3xl font-semibold tabular-nums">{money(total)}</span>
            </div>
            <p className="text-sm text-muted">Log in or create an account to check out. We’ll keep your cart, and you can track every order from your account.</p>
            <Link href="/login?next=/cart" className="btn-primary w-full py-3.5 text-base">Log in to check out</Link>
            <Link href="/register?next=/cart" className="btn-ghost w-full py-3">Create an account</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="card space-y-4 p-6 lg:sticky lg:top-24">
            <h2 className="text-2xl font-semibold">Delivery details</h2>
            <label className="block text-sm font-medium">
              Name
              <input name="customer" defaultValue={profile.name} required maxLength={80} autoComplete="name" className="field mt-1.5" />
            </label>
            <label className="block text-sm font-medium">
              Phone
              <input name="phone" defaultValue={profile.phone} type="tel" required maxLength={30} autoComplete="tel" className="field mt-1.5" />
            </label>
            <label className="block text-sm font-medium">
              Address
              <textarea name="address" defaultValue={profile.address} required maxLength={200} rows={3} autoComplete="street-address" className="field mt-1.5 resize-none" />
            </label>
            <div className="flex items-baseline justify-between border-t border-crust pt-4">
              <span className="text-muted">Total</span>
              <span className="font-display text-3xl font-semibold tabular-nums">{money(total)}</span>
            </div>
            <p className="text-xs text-muted">Pay cash on delivery. Delivery is free.</p>
            {error && <p className="rounded-xl bg-tomato/10 px-3 py-2 text-sm text-tomato-dark" role="alert">{error}</p>}
            <button className="btn-primary w-full py-3.5 text-base" disabled={pending}>
              {pending ? 'Placing order…' : `Place order · ${money(total)}`}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
