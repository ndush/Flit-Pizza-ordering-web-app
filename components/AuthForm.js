'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { login, register } from '@/app/actions';
import Logo from './Logo';

export default function AuthForm({ mode, next }) {
  const isLogin = mode === 'login';
  const [state, action, pending] = useActionState(isLogin ? login : register, null);
  const q = next ? `?next=${encodeURIComponent(next)}` : '';

  return (
    <section className="container-x grid place-items-center py-20">
      <form action={action} className="card w-full max-w-sm space-y-4 p-8">
        <Logo />
        <h1 className="text-3xl font-semibold">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
        {next && <input type="hidden" name="next" value={next} />}
        {!isLogin && (
          <label className="block text-sm font-medium">
            Name
            <input name="name" required maxLength={80} autoComplete="name" defaultValue={state?.name} className="field mt-1.5" />
          </label>
        )}
        <label className="block text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" defaultValue={state?.email} className="field mt-1.5" />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            name="password"
            type="password"
            required
            minLength={isLogin ? undefined : 8}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            className="field mt-1.5"
          />
        </label>
        {state?.error && <p className="rounded-xl bg-tomato/10 px-3 py-2 text-sm text-tomato-dark" role="alert">{state.error}</p>}
        <button className="btn-primary w-full py-3" disabled={pending}>
          {pending ? 'One moment…' : isLogin ? 'Log in' : 'Create account'}
        </button>
        <p className="text-center text-sm text-muted">
          {isLogin ? 'New here? ' : 'Already have an account? '}
          <Link href={`${isLogin ? '/register' : '/login'}${q}`} className="font-semibold text-tomato underline-offset-4 hover:underline">
            {isLogin ? 'Create an account' : 'Log in'}
          </Link>
        </p>
      </form>
    </section>
  );
}
