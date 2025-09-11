
'use client';

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import MarketSearchInput from '@/components/ui/market-search-input';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import Link from 'next/link';

function MarketLibrary() {
  // This page has been deprecated in favor of the unified /search page.
  // This content is now largely for archival purposes.
  return (
    <div className="flex min-h-screen flex-col market-library-bg text-white">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4">
        <div className="flex items-center gap-6">
          <Logo />
        </div>
        <div className="flex items-center gap-4">
            <Link href="/login">
                <Button variant="ghost" className="text-white rounded-full p-2">
                    <User />
                </Button>
            </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold font-heading tracking-tight mb-4 text-white">
             What'sMAP
            </h1>
        </div>
        <div className="w-full max-w-3xl">
            <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-white" />}>
                <MarketSearchInput useSearchPage={true} />
            </Suspense>
        </div>
      </main>
    </div>
  );
}

export default function MarketLibraryPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen bg-[#1f1f1f]"><Loader2 className="h-12 w-12 animate-spin text-white" /></div>}>
            <MarketLibrary />
        </Suspense>
    )
}
