
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Briefcase, Building, Shield, GitBranch, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';

const personas = [
  {
    name: 'For Enterprise & Governments',
    description: 'Utilize our data foundation and analytical agents for urban planning, market monitoring, and policy impact analysis. Partner with us for custom data solutions.',
    icon: <Shield className="h-8 w-8" />,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    ctaLink: '/contact'
  },
  {
    name: 'For Brokerages & Portals',
    description: 'Integrate our AI-powered tools into your existing platforms. Offer advanced features to your agents and users through our powerful APIs and partnership programs.',
    icon: <Briefcase className="h-8 w-8" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    ctaLink: '/contact'
  },
];

export default function EcosystemPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
         <PageHeader 
            icon={<GitBranch className="h-8 w-8" />}
            title="Partnerships & Enterprise"
            description="WhatsMAP is a collaborative intelligence platform. Discover how we partner with large-scale organizations."
        />

        <section className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {personas.map((persona) => (
              <Link key={persona.name} href={persona.ctaLink} className="group flex">
                  <Card className="bg-card/50 backdrop-blur-lg border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-primary/10 flex flex-col w-full">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg w-fit ${persona.bgColor} ${persona.color}`}>
                                {persona.icon}
                            </div>
                            <CardTitle className="text-2xl">{persona.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-foreground/80">{persona.description}</p>
                    </CardContent>
                    <div className="px-6 pb-6">
                         <div className="text-primary font-semibold flex items-center gap-2">
                           <span>Contact Us</span>
                           <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                  </Card>
              </Link>
            ))}
        </section>

      </main>
      <LandingFooter />
    </div>
  );
}
