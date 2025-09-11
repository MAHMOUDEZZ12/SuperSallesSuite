
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            Simple, Transparent Pricing
          </h1>
           <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            Our core Market Library and AI search are free. Premium app suites and memberships are coming soon.
          </p>
        </div>
        
        <Card className="max-w-md mx-auto text-center">
            <CardHeader>
                <div className="mx-auto w-fit p-3 bg-primary/10 rounded-full mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Memberships Coming Soon</CardTitle>
                <CardDescription>
                    We're launching with our core intelligence tools available for free. We'll be introducing premium app suites for advanced marketing, sales, and creative tasks in the near future.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/signup">
                    <Button>Sign Up Free</Button>
                </Link>
            </CardContent>
        </Card>

      </main>
      <LandingFooter />
    </div>
  );
}
