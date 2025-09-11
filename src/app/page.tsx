
'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { ShinyButton } from '@/components/ui/shiny-button';
import MarketSearchInput from '@/components/ui/market-search-input';
import { FeatureModal } from '@/components/feature-modal';
import { type Feature, tools } from '@/lib/features';


export default function Home() {
  const [selectedFeature, setSelectedFeature] = React.useState<Omit<Feature, 'renderResult'> | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold font-heading tracking-tighter mb-4 text-foreground">
             Your AI-powered gateway to Dubai real estate intelligence.
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 mb-8">
            Search anything about Dubai’s property market. From projects to trends—and instantly act on insights with the selltoday.ai suite.
          </p>
          <React.Suspense fallback={<div>Loading...</div>}>
            <MarketSearchInput />
          </React.Suspense>
           <div className="mt-8">
            <Link href="/signup">
                <ShinyButton>
                   Sign Up Free & Unlock The Suite
                   <ArrowRight />
                </ShinyButton>
            </Link>
           </div>
        </div>
      </main>
      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      <LandingFooter />
    </div>
  );
}
