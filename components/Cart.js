'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { round2 } from '@/lib/format';

const CartContext = createContext(null);
const KEY = 'flit-cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  // Load after mount (not in useState) so server and client first render match.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(JSON.parse(localStorage.getItem(KEY)) ?? []);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  // Same pizza + size + extras merges into one line.
  const add = (item) =>
    setItems((cur) => {
      const key = [item.productId, item.size, [...item.extras].sort().join(',')].join('|');
      return cur.some((i) => i.key === key)
        ? cur.map((i) => (i.key === key ? { ...i, qty: Math.min(20, i.qty + item.qty) } : i))
        : [...cur, { ...item, key }];
    });

  const setQty = (key, qty) =>
    setItems((cur) =>
      qty < 1 ? cur.filter((i) => i.key !== key) : cur.map((i) => (i.key === key ? { ...i, qty: Math.min(20, qty) } : i)),
    );

  const value = {
    items,
    ready,
    add,
    setQty,
    clear: () => setItems([]),
    count: items.reduce((s, i) => s + i.qty, 0),
    total: round2(items.reduce((s, i) => s + i.price * i.qty, 0)),
  };
  return <CartContext value={value}>{children}</CartContext>;
}

export const useCart = () => useContext(CartContext);
