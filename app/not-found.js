import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-x grid place-items-center py-32 text-center">
      <p className="font-display text-8xl font-semibold text-tomato">404</p>
      <h1 className="mt-4 text-3xl font-semibold">This slice has been eaten.</h1>
      <Link href="/menu" className="btn-primary mt-8">Back to the menu</Link>
    </section>
  );
}
