
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Sparkles, XCircle } from 'lucide-react';

const freeTierFeatures = [
    { text: 'Unlimited Market Searches', included: true },
    { text: 'AI-Powered Q&A', included: true },
    { text: 'Save Projects to Library', included: true },
    { text: 'Access to Community & Academy', included: true },
    { text: 'AI Chatbot Memory', included: true },
    { text: 'Access to All Apps & Flows', included: false },
    { text: 'Publish Landing Pages', included: false },
    { text: 'Automated Ad Campaigns', included: false },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            A Plan for Every Ambition
          </h1>
           <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            Start for free and unlock the core of our intelligence. Upgrade when you're ready to put your entire sales and marketing workflow on auto-pilot.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card className="border-primary/50 shadow-xl shadow-primary/10">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-heading">Free</CardTitle>
                    <CardDescription>For individuals getting started with AI in real estate.</CardDescription>
                    <p className="text-5xl font-bold pt-4">$0 <span className="text-lg font-normal text-muted-foreground">/ forever</span></p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Link href="/signup" className="w-full">
                        <Button className="w-full text-lg py-6">Get Started Free</Button>
                    </Link>
                    <ul className="space-y-3">
                        {freeTierFeatures.filter(f => f.included).map(feature => (
                             <li key={feature.text} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>{feature.text}</span>
                            </li>
                        ))}
                         {freeTierFeatures.filter(f => !f.included).map(feature => (
                             <li key={feature.text} className="flex items-center gap-3 text-muted-foreground">
                                <XCircle className="h-5 w-5" />
                                <span>{feature.text}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card className="bg-muted/30 border-dashed">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-heading text-muted-foreground">Pro</CardTitle>
                    <CardDescription>For professionals & teams ready to automate their growth.</CardDescription>
                     <p className="text-5xl font-bold pt-4 text-muted-foreground">Coming Soon</p>
                </CardHeader>
                <CardContent className="space-y-6">
                     <Button className="w-full text-lg py-6" disabled>Join Waitlist</Button>
                     <ul className="space-y-3">
                        {freeTierFeatures.map(feature => (
                             <li key={feature.text} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>{feature.text}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>

      </main>
      <LandingFooter />
    </div>
  );
}
