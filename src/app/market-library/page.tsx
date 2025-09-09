
'use client';

import React, { useState, Suspense } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';

// This is a placeholder for the rich result component we will build out.
const SearchResults = ({ query }: { query: string }) => {
    return (
        <div className="mt-12">
            <PageHeader 
                title={`Intelligence Report for: "${query}"`}
                description="The AI is compiling market data, project details, and actionable insights..."
            />
            <div className="flex items-center justify-center h-64 text-muted-foreground">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                <span>Generating your dynamic dashboard...</span>
            </div>
        </div>
    )
}

function MarketLibrary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/market-library?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter mb-4 text-foreground">
             Search anything about Dubai’s real estate market
          </h1>
           <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            Your AI-powered gateway to Dubai real estate intelligence.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search for project, developer, area, or even a service charge..."
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
        
        {initialQuery && (
          <Suspense fallback={
            <div className="flex items-center justify-center h-64 text-muted-foreground">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            </div>
          }>
            <SearchResults query={initialQuery} />
          </Suspense>
        )}

      </main>
      <LandingFooter />
    </div>
  );
}

export default function MarketLibraryPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MarketLibrary />
        </Suspense>
    )
}
