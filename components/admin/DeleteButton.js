'use client';

import { useTransition } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { deleteProduct } from '@/app/actions';

export default function DeleteButton({ id, title }) {
  const [pending, start] = useTransition();
  return (
    <button
      className="grid size-9 place-items-center rounded-full text-muted hover:bg-tomato/10 hover:text-tomato disabled:opacity-40"
      disabled={pending}
      aria-label={`Delete ${title}`}
      onClick={() => confirm(`Delete ${title} from the menu?`) && start(() => deleteProduct(id))}
    >
      <FiTrash2 />
    </button>
  );
}
