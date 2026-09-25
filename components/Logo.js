import Link from 'next/link';
import { GiFullPizza } from 'react-icons/gi';

export default function Logo({ className = '' }) {
  return (
    <Link href="/" className={`flex items-center gap-2 font-display text-2xl font-semibold tracking-tight ${className}`}>
      <GiFullPizza className="size-7 text-tomato" aria-hidden />
      <span>
        flit<span className="text-tomato">.</span>
      </span>
    </Link>
  );
}
