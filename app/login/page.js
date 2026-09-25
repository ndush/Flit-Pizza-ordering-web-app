import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { getSession, safeNext } from '@/lib/auth';

export const metadata = { title: 'Log in' };

export default async function LoginPage({ searchParams }) {
  const next = safeNext((await searchParams).next, '');
  const session = await getSession();
  if (session) redirect(next || (session.role === 'admin' ? '/admin' : '/account'));
  return <AuthForm mode="login" next={next} />;
}
