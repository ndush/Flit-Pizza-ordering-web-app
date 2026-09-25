'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AutoRefresh({ seconds = 15 }) {
  const router = useRouter();
  useEffect(() => {
    const t = setInterval(() => router.refresh(), seconds * 1000);
    return () => clearInterval(t);
  }, [router, seconds]);
  return null;
}
