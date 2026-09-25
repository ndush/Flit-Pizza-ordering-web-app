import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiClock, FiMapPin, FiThermometer } from 'react-icons/fi';
import AnimatedContent from '@/components/bits/AnimatedContent';
import BlurText from '@/components/bits/BlurText';
import CircularText from '@/components/bits/CircularText';
import CountUp from '@/components/bits/CountUp';
import Grainient from '@/components/bits/Grainient';
import ScrollVelocity from '@/components/bits/ScrollVelocity';
import ShinyText from '@/components/bits/ShinyText';
import SplitText from '@/components/bits/SplitText';
import StarBorder from '@/components/bits/StarBorder';
import ProductCard from '@/components/ProductCard';
import { db } from '@/lib/db';
import { Product, plain } from '@/lib/models';

export const dynamic = 'force-dynamic';

const stats = [
  [30, ' min', 'average delivery'],
  [48, ' h', 'slow-proofed dough'],
  [4.9, '★', 'from 2,000+ reviews'],
];

const reasons = [
  [FiClock, 'Dough that takes its time', 'Every ball is cold-fermented for 48 hours, so the crust is light, blistered and easy on the stomach.'],
  [FiThermometer, 'Fired at 450°C', 'Ninety seconds in a screaming-hot oven gives a leopard-spotted rim and a soft, foldable middle.'],
  [FiMapPin, 'Tracked to your door', 'Watch your order go from the oven to the scooter to your street, live, no app needed.'],
];

const reviews = [
  ['/images/aa.jpg', 'Amara O.', 'The Hot Honey is ridiculous. Arrived hotter than the place down the road that is literally closer.'],
  ['/images/cc.jpg', 'Daniel K.', 'Ordering took thirty seconds and the tracker actually moved. Crust was perfect.'],
  ['/images/bb.jpg', 'Leo M.', 'Finally a Margherita that tastes like the one I had in Naples. Now a Friday ritual.'],
];

export default async function Home() {
  await db();
  const featured = plain(await Product.find().sort({ createdAt: 1 }).limit(3).lean());

  return (
    <>
      {/* Hero */}
      <section className="container-x pt-4">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink text-cream">
          <div className="absolute inset-0 -z-10 opacity-60">
            <Grainient color1="#d8412a" color2="#1d1512" color3="#f5b93a" timeSpeed={0.15} grainAmount={0.08} contrast={1.2} />
          </div>
          <div className="grid items-center gap-6 px-6 py-14 sm:px-12 md:grid-cols-[1.1fr_1fr] md:py-20">
            <div>
              <ShinyText text="Wood-fired · Delivered in 30" className="text-xs font-bold tracking-[0.25em] uppercase" color="#f5b93a" shineColor="#fff7e0" speed={3} />
              <SplitText
                tag="h1"
                text="Handmade, with an extra pinch of love."
                className="mt-4 font-display text-5xl leading-[1.02] font-semibold sm:text-6xl lg:text-7xl"
                textAlign="left"
                splitType="words"
                delay={70}
                from={{ opacity: 0, y: 50 }}
                rootMargin="0px"
              />
              <p className="mt-6 max-w-md text-base text-cream/75 sm:text-lg">
                Neapolitan-style pizza stretched by hand, fired hot and at your door while the cheese still pulls.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/menu" className="rounded-[20px]">
                  <StarBorder as="span" color="#f5b93a" speed="5s" backgroundColor="#d8412a" borderColor="#d8412a" className="font-semibold">
                    <span className="flex items-center gap-2">Order now <FiArrowRight /></span>
                  </StarBorder>
                </Link>
                <a href="#why" className="text-sm font-semibold text-cream/80 underline-offset-4 hover:underline">Why it tastes better</a>
              </div>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-cream/15 pt-6">
                {stats.map(([n, unit, label]) => (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd className="font-display text-3xl font-semibold text-cheese">
                      <CountUp to={n} duration={1.6} />
                      <span className="text-xl">{unit}</span>
                    </dd>
                    <dd className="mt-1 text-xs text-cream/60">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
              <CircularText
                text="HOT ✦ FRESH ✦ FAST ✦ HANDMADE ✦ "
                spinDuration={30}
                onHover="slowDown"
                className="absolute! inset-0 size-full! font-sans text-cheese! [&>span]:text-sm! [&>span]:tracking-widest"
              />
              <div className="absolute inset-[12%] animate-[spin_60s_linear_infinite]">
                <Image src="/images/6.png" alt="Hot honey pizza" fill priority sizes="(min-width: 768px) 420px, 80vw" className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,.45)]" />
              </div>
              <Image src="/images/v.png" alt="" width={90} height={82} className="absolute -top-2 left-2 -rotate-12" />
              <Image src="/images/c.png" alt="" width={110} height={64} className="absolute right-0 bottom-4 rotate-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-10 text-tomato" aria-hidden>
        <ScrollVelocity
          texts={['Margherita ✦ Pepperoni ✦ Hot Honey ✦ Garden Veggie ✦ Rocket & Parma ✦']}
          velocity={40}
          className="font-display font-semibold italic"
          scrollerClassName="scroller"
        />
      </div>

      {/* Featured */}
      <section className="container-x">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Popular right now</p>
            <BlurText tag="h2" text="Straight out of the oven" className="mt-2 text-4xl font-semibold sm:text-5xl" delay={90} />
          </div>
          <Link href="/menu" className="btn-ghost">Full menu <FiArrowRight /></Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <AnimatedContent key={p._id} distance={60} delay={i * 0.1} className="h-full">
              <ProductCard product={p} />
            </AnimatedContent>
          ))}
        </div>
      </section>

      {/* Why */}
      <section id="why" className="container-x mt-24 scroll-mt-24">
        <div className="card grid gap-10 bg-crust/40 p-8 sm:p-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">Our strength</p>
            <BlurText tag="h2" text="Why it tastes better" className="mt-2 text-4xl font-semibold" delay={90} />
            <Image src="/images/hlf.png" alt="" width={177} height={134} className="mt-6 hidden lg:block" />
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {reasons.map(([Icon, title, body], i) => (
              <AnimatedContent key={title} distance={40} delay={i * 0.12}>
                <span className="grid size-12 place-items-center rounded-2xl bg-tomato text-xl text-white"><Icon aria-hidden /></span>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container-x mt-24">
        <p className="eyebrow">Customer feedback</p>
        <BlurText tag="h2" text="People keep coming back" className="mt-2 text-4xl font-semibold" delay={90} />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map(([img, name, quote], i) => (
            <AnimatedContent key={name} distance={40} delay={i * 0.1}>
              <figure className="card h-full p-6">
                <blockquote className="font-display text-lg leading-snug">“{quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-sm font-semibold">
                  <Image src={img} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
                  {name}
                </figcaption>
              </figure>
            </AnimatedContent>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x mt-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-tomato px-8 py-14 text-center text-white sm:px-16">
          <h2 className="text-4xl font-semibold sm:text-5xl">Hungry yet?</h2>
          <p className="mx-auto mt-3 max-w-md text-white/85">Pick a pizza, pay the rider in cash, and watch it travel to you.</p>
          <Link href="/menu" className="btn mt-8 bg-white px-7 py-3 text-base text-tomato hover:bg-cream">Browse the menu <FiArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
