
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
         <PageHeader 
            icon={<Calendar className="h-8 w-8" />}
            title="Events & Training"
            description="Upcoming webinars, live training sessions, and community meetups."
        />
        <Card className="mt-12 flex items-center justify-center h-96 border-dashed">
            <CardContent className="text-center p-6">
                <h3 className="text-2xl font-bold">Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                    Our events calendar is being prepared. Check back soon for exciting announcements!
                </p>
            </CardContent>
        </Card>
      </main>
      <LandingFooter />
    </div>
  );
}
