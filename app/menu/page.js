import BlurText from '@/components/bits/BlurText';
import MenuGrid from '@/components/MenuGrid';
import { db } from '@/lib/db';
import { Product, plain } from '@/lib/models';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Menu' };

export default async function MenuPage() {
  await db();
  const products = plain(await Product.find().sort({ createdAt: 1 }).lean());

  return (
    <section className="container-x pt-12">
      <p className="eyebrow">The menu</p>
      <BlurText tag="h1" text="Pick your pizza" className="mt-2 mb-8 text-5xl font-semibold sm:text-6xl" delay={90} />
      <MenuGrid products={products} />
    </section>
  );
}
