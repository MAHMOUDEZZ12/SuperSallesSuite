
'use client';

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import MarketSearchInput from '@/components/ui/market-search-input';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { ShinyButton } from '@/components/ui/shiny-button';
import Link from 'next/link';

function HomePage() {

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingHeader />
      <main className="flex-1 flex flex-col items-center px-4">
        {/* Hero Section */}
        <section className="w-full text-center py-24 md:py-32 lg:py-40">
           <div className="container max-w-4xl">
               <div className="w-full max-w-3xl mx-auto">
                  <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-primary" />}>
                      <MarketSearchInput />
                  </Suspense>
              </div>
              <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mt-8">
                An AI-native real estate search engine that provides personalized results for investors, buyers, and brokers, alongside a powerful suite of B2B tools.
              </p>
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
