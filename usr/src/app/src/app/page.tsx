
'use client';

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import MarketSearchInput from '@/components/ui/market-search-input';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

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
