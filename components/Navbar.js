'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiShoppingBag, FiUser } from 'react-icons/fi';
import { useCart } from './Cart';
import Logo from './Logo';

const links = [
  ['/', 'Home'],
  ['/menu', 'Menu'],
];

export default function Navbar({ user }) {
  const path = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-crust/70 bg-cream/80 backdrop-blur-md">
      <nav className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                path === href ? 'bg-ink text-cream' : 'hover:bg-crust'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href={user ? (user.role === 'admin' ? '/admin' : '/account') : '/login'}
            className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition sm:px-4 ${
              ['/account', '/admin', '/login', '/register'].includes(path) ? 'bg-ink text-cream' : 'hover:bg-crust'
            }`}
          >
            <FiUser aria-hidden />
            <span className="hidden sm:inline">{user ? (user.role === 'admin' ? 'Dashboard' : user.name.split(' ')[0]) : 'Log in'}</span>
            <span className="sr-only sm:hidden">{user ? 'Your account' : 'Log in'}</span>
          </Link>
          <Link href="/cart" className="btn-primary ml-1 px-4" aria-label={`Cart, ${count} items`}>
            <FiShoppingBag className="size-4" />
            <span className="tabular-nums">{count}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
