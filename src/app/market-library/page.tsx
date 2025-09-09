
'use client';

import React, { Suspense } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

function MarketLibrary() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full px-4 md:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center justify-center">
        <div className="text-center mb-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tighter mb-4 text-foreground">
             Search anything about Dubai’s real estate market
            </h1>
        </div>

        <div className="max-w-3xl mx-auto w-full">
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search for a project, developer, area, or even ask a question..."
                    className="w-full rounded-full h-14 pl-12 pr-28 text-base"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
                <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10 w-24">
                    Search
                </Button>
            </form>
        </div>
         <div className="text-center mt-8 text-sm text-muted-foreground">
              <p>Or try an example search:</p>
              <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
                  <button onClick={() => router.push('/search?q=Emaar')} className="hover:text-primary transition-colors">Emaar</button>
                  <button onClick={() => router.push('/search?q=what are the prices in Jabal Ali')} className="hover:text-primary transition-colors">Prices in Jabal Ali</button>
                  <button onClick={() => router.push('/search?q=is Nakheel a government company?')} className="hover:text-primary transition-colors">Is Nakheel a government company?</button>
              </div>
          </div>
      </main>
      <LandingFooter />
    </div>
  );
}

export default function MarketLibraryPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="h-12 w-12 animate-spin" /></div>}>
            <MarketLibrary />
        </Suspense>
    )
}
