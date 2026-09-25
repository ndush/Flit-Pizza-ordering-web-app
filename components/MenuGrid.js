'use client';

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import ProductCard from './ProductCard';

const sorters = {
  featured: () => 0,
  'price-asc': (a, b) => a.prices[0] - b.prices[0],
  'price-desc': (a, b) => b.prices[0] - a.prices[0],
  name: (a, b) => a.title.localeCompare(b.title),
};

export default function MenuGrid({ products }) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('featured');
  const needle = q.trim().toLowerCase();
  const shown = products
    .filter((p) => !needle || `${p.title} ${p.desc}`.toLowerCase().includes(needle))
    .sort(sorters[sort]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search the menu</span>
          <FiSearch className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
          <input className="field rounded-full pl-10" placeholder="Search pepperoni, veggie, spicy…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          Sort
          <select className="field w-auto rounded-full" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
      <p className="mb-4 text-sm text-muted" aria-live="polite">
        {shown.length} {shown.length === 1 ? 'pizza' : 'pizzas'}
      </p>
      {shown.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <p className="card p-10 text-center text-muted">Nothing matches “{q}”. Try another topping.</p>
      )}
    </>
  );
}
