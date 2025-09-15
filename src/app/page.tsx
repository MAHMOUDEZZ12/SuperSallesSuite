
'use client';

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

// Component code directly embedded to resolve build error
function MarketSearchInput() {
    const router = useRouter();
    const [query, setQuery] = React.useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };
    
    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                placeholder="Search the market or ask the AI anything..."
                className="w-full rounded-full h-14 pl-12 pr-32 text-lg bg-background border-2 border-border focus-visible:ring-primary/50"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10 px-6">
                Search
            </Button>
        </form>
    );
}


function HomePage() {

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingHeader />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <section className="w-full text-center">
           <div className="container max-w-4xl">
               <div className="w-full max-w-3xl mx-auto">
                  <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-primary" />}>
                      <MarketSearchInput />
                  </Suspense>
              </div>
           </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}

export default function HomePageContainer() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen bg-background"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <HomePage />
        </Suspense>
    )
}
