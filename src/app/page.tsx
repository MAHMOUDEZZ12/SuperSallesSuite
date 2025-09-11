
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
          A New Foundation
        </h1>
        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
          This is a blank canvas. From here, we will build a completely new user experience.
        </p>
        <div className="mt-8">
            <Link href="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
            </Link>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
