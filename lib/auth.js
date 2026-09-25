import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE = 'flit_session';
const MAX_AGE = 7 * 24 * 3600;

function secret() {
  const s = process.env.JWT_SECRET || (process.env.NODE_ENV !== 'production' && 'dev-only-secret');
  if (!s) throw new Error('JWT_SECRET is not set');
  return s;
}

export async function startSession(account) {
  const token = jwt.sign({ sub: String(account._id), name: account.name, role: account.role }, secret(), { expiresIn: MAX_AGE });
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE,
    path: '/',
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

// -> { id, name, role } or null
export async function getSession() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { sub, name, role } = jwt.verify(token, secret());
    return { id: sub, name, role };
  } catch {
    return null;
  }
}

export async function requireUser(next = '/') {
  const session = await getSession();
  if (!session) redirect(`/login?next=${encodeURIComponent(next)}`);
  return session;
}

export async function requireAdmin() {
  const session = await requireUser('/admin');
  if (session.role !== 'admin') redirect('/account');
  return session;
}

// Only same-site paths, so ?next= can't bounce users to another domain.
export const safeNext = (next, fallback) => (typeof next === 'string' && /^\/(?![/\\])/.test(next) ? next : fallback);
