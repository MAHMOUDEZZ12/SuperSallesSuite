
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
         <PageHeader 
            icon={<Briefcase className="h-8 w-8" />}
            title="Careers at WhatsMAP"
            description="Join us in building the future of real estate intelligence."
        />
        <Card className="mt-12 flex items-center justify-center h-96 border-dashed">
            <CardContent className="text-center p-6">
                <h3 className="text-2xl font-bold">We're Always Looking for Talent</h3>
                <p className="text-muted-foreground mt-2">
                    Our careers page is currently under construction. Please check back soon for open positions.
                </p>
            </CardContent>
        </Card>
      </main>
      <LandingFooter />
    </div>
  );
}
