
'use client';

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import MarketSearchInput from '@/components/ui/market-search-input';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { tools } from '@/lib/features';
import { FeatureCard } from '@/components/ui/feature-card';
import { ShinyButton } from '@/components/ui/shiny-button';
import Link from 'next/link';

const featuredTools = [
  'meta-ads-copilot',
  'market-reports',
  'rebranding',
  'ai-video-presenter',
  'audience-creator',
  'lead-to-deal-pipeline'
];

const highlightedFeatures = tools.filter(t => featuredTools.includes(t.id));

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingHeader />
      <main className="flex-1 flex flex-col items-center px-4">
        {/* Hero Section */}
        <section className="w-full text-center py-24 md:py-32 lg:py-40">
           <div className="container max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
                The AI Co-Pilot for Real Estate
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
                An integrated suite of AI agents that can generate marketing materials, analyze market data, and automate your entire sales workflow.
              </p>
              <div className="w-full max-w-2xl mx-auto">
                  <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-primary" />}>
                      <MarketSearchInput />
                  </Suspense>
              </div>
           </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 md:py-24 bg-muted/50">
            <div className="container max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">One Platform, Infinite Capabilities</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">From generating ads to reviewing legal documents, your AI co-pilot handles it all.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {highlightedFeatures.map(tool => (
                        <FeatureCard key={tool.id} tool={tool} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link href="/solutions">
                      <ShinyButton>Explore the Full Solutions Universe</ShinyButton>
                    </Link>
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
