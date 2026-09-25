import mongoose from 'mongoose';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import TiltedCard from '@/components/bits/TiltedCard';
import ProductForm from '@/components/ProductForm';
import { db } from '@/lib/db';
import { Product, plain } from '@/lib/models';

async function getProduct(id) {
  if (!mongoose.isValidObjectId(id)) return null;
  await db();
  return plain(await Product.findById(id).lean());
}

export async function generateMetadata({ params }) {
  const product = await getProduct((await params).id);
  return { title: product?.title ?? 'Not found' };
}

export default async function ProductPage({ params }) {
  const product = await getProduct((await params).id);
  if (!product) notFound();

  return (
    <section className="container-x pt-8">
      <Link href="/menu" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
        <FiArrowLeft /> Back to menu
      </Link>
      <div className="mt-6 grid items-center gap-10 md:grid-cols-2">
        <div className="relative grid place-items-center">
          <div className="absolute aspect-square w-[min(420px,80vw)] rounded-full bg-crust" />
          <TiltedCard
            imageSrc={product.img}
            altText={product.title}
            containerHeight="min(460px, 90vw)"
            imageWidth="min(400px, 78vw)"
            imageHeight="min(400px, 78vw)"
            rotateAmplitude={10}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip={false}
          />
        </div>
        <div>
          <h1 className="text-5xl font-semibold sm:text-6xl">{product.title}</h1>
          <p className="mt-4 max-w-md text-lg text-muted">{product.desc}</p>
          <div className="mt-8">
            <ProductForm product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
