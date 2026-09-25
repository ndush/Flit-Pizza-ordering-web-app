import CartView from '@/components/CartView';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { Account } from '@/lib/models';

export const metadata = { title: 'Your cart' };

export default async function CartPage() {
  const session = await getSession();
  let profile = null;
  if (session) {
    await db();
    const a = await Account.findById(session.id).lean();
    profile = { name: a?.name ?? session.name, phone: a?.phone ?? '', address: a?.address ?? '' };
  }
  return <CartView profile={profile} />;
}
