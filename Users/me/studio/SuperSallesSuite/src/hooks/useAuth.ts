
'use client';

import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If firebase is not configured, don't do anything.
    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    if (loading) return; // Wait until auth state is confirmed

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/account');
    
    // If user is logged in and tries to access login/signup/account, redirect them away.
    if (user && isAuthPage) {
      router.push('/dashboard');
      return;
    }

    // If user is NOT logged in and IS trying to access the dashboard, redirect to account hub.
    if (!user && pathname.startsWith('/dashboard')) {
      router.push('/account');
      return;
    }

  }, [user, loading, pathname, router]);


  return { user, loading };
}
