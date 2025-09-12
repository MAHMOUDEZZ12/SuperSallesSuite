
'use client';

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import MarketSearchInput from '@/components/ui/market-search-input';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col market-library-bg text-white">
      <LandingHeader />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold font-heading tracking-tight mb-4 text-white">
             WhatsMAP
            </h1>
        </div>
        <div className="w-full max-w-3xl">
            <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-white" />}>
                <MarketSearchInput />
            </Suspense>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}

export default function HomePageContainer() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen bg-[#1f1f1f]"><Loader2 className="h-12 w-12 animate-spin text-white" /></div>}>
            <HomePage />
        </Suspense>
    )
}
