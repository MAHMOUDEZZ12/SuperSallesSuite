
'use client';

import { useState, useEffect } from 'react';
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

      const isAuthPage = pathname === '/login' || pathname === '/signup';
      const isOnboardingPage = pathname === '/onboarding';

      if (user && isAuthPage) {
        // If user is logged in and on login/signup, redirect to dashboard
        router.push('/dashboard');
      } else if (!user && !isAuthPage && !isOnboardingPage) {
        // If user is not logged in and not on an auth/onboarding page, redirect to login
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  return { user, loading };
}
