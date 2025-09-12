
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the new AI Command Center
        router.replace('/dashboard/assistant');
    }, [router]);

  return (
    <main className="p-4 md:p-10 space-y-8 flex items-center justify-center h-full">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-2 text-muted-foreground">Redirecting to your AI Command Center...</p>
      </div>
    </main>
  );
}
