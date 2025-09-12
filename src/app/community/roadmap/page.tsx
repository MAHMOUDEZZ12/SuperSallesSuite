
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { BarChart, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const roadmapItems = {
    'Q3 2024': [
        { title: 'Community Hub Launch', status: 'Completed', description: 'Launch the central community page as a sitemap for all resources.'},
        { title: 'AI Video Presenter', status: 'In Progress', description: 'Generate lifelike video presenters to deliver pitches and updates.'},
        { title: 'Google Ads Keyword Planner', status: 'In Progress', description: 'An AI tool to generate strategic keyword plans for Google Ads.'}
    ],
    'Q4 2024': [
        { title: 'Full CRM Integration', status: 'Planned', description: 'Connect directly to HubSpot and Salesforce for seamless lead management.'},
        { title: 'AI-Powered Virtual Staging', status: 'Planned', description: 'Upload photos of an empty room and let the AI stage it in various styles.'},
        { title: 'Advanced Performance Analytics', status: 'Planned', description: 'Deeper analytics on ad spend, ROI, and lead conversion across all platforms.'},
    ],
     'Q1 2025': [
        { title: 'Automated Competitor Analysis', status: 'Researching', description: 'An AI agent that constantly monitors competitor listings and marketing strategies.'},
        { title: 'Predictive Pricing Models', status: 'Researching', description: 'Leverage historical data to predict future price trends for specific neighborhoods.'},
    ],
}

export default function RoadmapPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
         <PageHeader 
            icon={<BarChart className="h-8 w-8" />}
            title="Our Public Roadmap"
            description="A transparent look at what we're building and what's coming next."
        />
        <div className="mt-12 space-y-8">
            {Object.entries(roadmapItems).map(([quarter, items]) => (
                <Card key={quarter}>
                    <CardHeader>
                        <CardTitle>{quarter}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {items.map(item => (
                            <div key={item.title} className="p-4 border rounded-lg flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <Badge variant={item.status === 'Completed' ? 'default' : 'secondary'}>{item.status}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
