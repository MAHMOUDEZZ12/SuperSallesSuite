
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function CommunityRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect dashboard users to the public community hub
        router.replace('/community');
    }, [router]);

  return (
    <main className="p-4 md:p-10 space-y-8 flex items-center justify-center h-full">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-2 text-muted-foreground">Redirecting to Community Hub...</p>
      </div>
    </main>
  );
}
