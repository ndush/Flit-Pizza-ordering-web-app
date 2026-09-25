'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiCheck, FiMinus, FiPlus } from 'react-icons/fi';
import { GiFullPizza } from 'react-icons/gi';
import ClickSpark from './bits/ClickSpark';
import { useCart } from './Cart';
import { SIZES, money, unitPrice } from '@/lib/format';

export default function ProductForm({ product }) {
  const { add } = useCart();
  const [size, setSize] = useState(1);
  const [extras, setExtras] = useState([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const price = unitPrice(product, size, extras);

  const toggle = (text) => setExtras((cur) => (cur.includes(text) ? cur.filter((t) => t !== text) : [...cur, text]));

  const addToCart = () => {
    add({ productId: product._id, title: product.title, img: product.img, size, extras, qty, price });
    setAdded(true);
  };

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="eyebrow mb-3">Size</legend>
        <div className="grid grid-cols-3 gap-3">
          {SIZES.map((label, i) => (
            <label
              key={label}
              className={`card flex cursor-pointer flex-col items-center gap-2 p-4 transition has-[:checked]:border-tomato has-[:checked]:bg-tomato/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-tomato`}
            >
              <input type="radio" name="size" className="sr-only" checked={size === i} onChange={() => setSize(i)} />
              <GiFullPizza className="text-tomato" style={{ fontSize: 22 + i * 8 }} aria-hidden />
              <span className="text-sm font-semibold">{label}</span>
              <span className="text-xs text-muted">{money(product.prices[i])}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {product.extras.length > 0 && (
        <fieldset>
          <legend className="eyebrow mb-3">Extras</legend>
          <div className="flex flex-wrap gap-2">
            {product.extras.map((e) => (
              <label
                key={e.text}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm transition has-[:checked]:border-basil has-[:checked]:bg-basil has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-tomato"
              >
                <input type="checkbox" className="sr-only" checked={extras.includes(e.text)} onChange={() => toggle(e.text)} />
                {extras.includes(e.text) && <FiCheck aria-hidden />}
                {e.text} <span className="opacity-70">+{money(e.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-full border border-ink/15 bg-white">
          <button type="button" className="grid size-11 place-items-center" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Fewer">
            <FiMinus />
          </button>
          <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">{qty}</span>
          <button type="button" className="grid size-11 place-items-center" onClick={() => setQty(Math.min(20, qty + 1))} aria-label="More">
            <FiPlus />
          </button>
        </div>
        {/* padding gives the sparks room to fly past the button edge */}
        <div className="-m-6">
          <ClickSpark sparkColor="#f5b93a" sparkRadius={28} sparkCount={10}>
            <div className="p-6">
              <button type="button" onClick={addToCart} className="btn-primary px-7 py-3.5 text-base">
                Add to cart · {money(price * qty)}
              </button>
            </div>
          </ClickSpark>
        </div>
      </div>

      {added && (
        <p className="flex items-center gap-3 rounded-2xl bg-basil/10 px-4 py-3 text-sm text-basil" role="status">
          <FiCheck /> Added to your cart.
          <Link href="/cart" className="ml-auto font-semibold underline underline-offset-4">View cart</Link>
        </p>
      )}
    </div>
  );
}
