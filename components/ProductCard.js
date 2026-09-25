import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import SpotlightCard from './bits/SpotlightCard';
import PizzaImage from './PizzaImage';
import { money } from '@/lib/format';

export default function ProductCard({ product }) {
  return (
    <SpotlightCard className="card group h-full transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5" spotlightColor="rgba(245, 185, 58, 0.22)">
      <Link href={`/product/${product._id}`} className="flex h-full flex-col p-5">
        <div className="relative mx-auto aspect-square w-full max-w-60">
          <div className="absolute inset-6 rounded-full bg-crust/70 transition group-hover:scale-105" />
          <PizzaImage src={product.img} alt={product.title} className="size-full transition duration-700 group-hover:rotate-12" sizes="240px" />
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold">{product.title}</h3>
          <span className="shrink-0 rounded-full bg-cheese/25 px-2.5 py-1 text-sm font-bold">from {money(product.prices[0])}</span>
        </div>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-muted">{product.desc}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-tomato">
          Choose size <FiArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </SpotlightCard>
  );
}
