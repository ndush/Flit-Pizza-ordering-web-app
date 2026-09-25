'use client';

import { startTransition, useActionState } from 'react';
import { createProduct } from '@/app/actions';

const images = ['/images/l.png', '/images/sump.png', '/images/cious.png', '/images/6.png', '/images/5.png', '/images/g.jpg'];

export default function AddProductForm() {
  const [state, action, pending] = useActionState(createProduct, null);

  return (
    <form
      // onSubmit instead of action={} so a validation error doesn't wipe what was typed; key resets it on success.
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      key={state?.ok}
      className="card space-y-3 p-6"
    >
      <h2 className="text-2xl font-semibold">Add a pizza</h2>
      <input name="title" required maxLength={60} placeholder="Title" className="field" />
      <textarea name="desc" required maxLength={250} rows={2} placeholder="Description" className="field resize-none" />
      <input name="img" required list="pizza-images" defaultValue={images[0]} placeholder="/images/… or https://…" className="field" />
      <datalist id="pizza-images">
        {images.map((src) => <option key={src} value={src} />)}
      </datalist>
      <div className="grid grid-cols-3 gap-2">
        {['small', 'medium', 'large'].map((k) => (
          <input key={k} name={k} type="number" step="0.01" min="0.01" required placeholder={`${k[0].toUpperCase()}${k.slice(1)} $`} className="field" />
        ))}
      </div>
      <textarea name="extras" rows={3} placeholder={'Extras, one per line\nExtra cheese: 1.50'} className="field resize-none font-mono text-xs" />
      {state?.error && <p className="text-sm text-tomato-dark" role="alert">{state.error}</p>}
      {state?.ok && <p className="text-sm text-basil" role="status">{state.ok}</p>}
      <button className="btn-primary w-full" disabled={pending}>{pending ? 'Saving…' : 'Add pizza'}</button>
    </form>
  );
}
