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
import { FeatureModal } from '@/components/feature-modal';

const featuredTools = [
  'meta-ads-copilot',
  'market-reports',
  'rebranding',
  'ai-video-presenter',
  'price-estimator',
  'market-trends',
];

const highlightedFeatures = tools.filter(t => featuredTools.includes(t.id));

function HomePage() {
  const [selectedTool, setSelectedTool] = React.useState<any>(null);

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

        {/* Features Section */}
        <section className="w-full py-20 md:py-24 bg-muted/50">
            <div className="container max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">One Platform, Infinite Capabilities</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">From generating ads to reviewing legal documents, your AI co-pilot handles it all.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {highlightedFeatures.map(tool => (
                       <div key={tool.id} onClick={() => setSelectedTool(tool)}>
                         <FeatureCard tool={tool} />
                       </div>
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
      <FeatureModal feature={selectedTool} onClose={() => setSelectedTool(null)} />
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
