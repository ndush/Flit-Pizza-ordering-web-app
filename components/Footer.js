import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-cream/80">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="text-cream" />
          <p className="mt-3 max-w-xs text-sm">Hand-stretched dough, proofed for 48 hours, fired hot and delivered fast.</p>
        </div>
        <div className="text-sm">
          <h3 className="mb-3 font-sans text-xs font-bold tracking-[0.2em] text-cheese uppercase">Visit</h3>
          <p>12 Mozzarella Lane</p>
          <p>Open daily, 11:00 – 23:00</p>
        </div>
        <div className="text-sm">
          <h3 className="mb-3 font-sans text-xs font-bold tracking-[0.2em] text-cheese uppercase">Order</h3>
          <ul className="space-y-1.5">
            <li><Link href="/menu" className="hover:text-white">Menu</Link></li>
            <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link href="/account" className="hover:text-white">Your orders</Link></li>
            <li><Link href="/admin" className="hover:text-white">Staff login</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="mb-3 font-sans text-xs font-bold tracking-[0.2em] text-cheese uppercase">Say hi</h3>
          <p>hello@flitpizza.test</p>
          <div className="mt-4 flex gap-3">
            {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
              <span key={i} className="grid size-9 place-items-center rounded-full border border-cream/20">
                <Icon aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">© {new Date().getFullYear()} Flit Pizza</p>
    </footer>
  );
}
