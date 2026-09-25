import { DM_Sans, Fraunces } from 'next/font/google';
import { CartProvider } from '@/components/Cart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSession } from '@/lib/auth';
import './globals.css';

const display = Fraunces({ subsets: ['latin'], axes: ['SOFT', 'WONK', 'opsz'], variable: '--font-fraunces' });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-dmsans' });

export const metadata = {
  title: { default: 'Flit Pizza — hand-stretched, delivered hot', template: '%s · Flit Pizza' },
  description: 'Order hand-stretched pizza online and track it to your door.',
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) add attributes to <body> */}
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <CartProvider>
          <Navbar user={session && { name: session.name, role: session.role }} />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
