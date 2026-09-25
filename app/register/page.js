import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { getSession, safeNext } from '@/lib/auth';

export const metadata = { title: 'Create account' };

export default async function RegisterPage({ searchParams }) {
  const next = safeNext((await searchParams).next, '');
  if (await getSession()) redirect(next || '/account');
  return <AuthForm mode="register" next={next} />;
}
