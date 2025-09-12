
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, ArrowRight, User, Building, Wallet } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';

const personas = [
  {
    name: 'For Agents',
    description: 'A suite of tools designed to automate your marketing, generate leads, and close deals faster. Your 24/7 AI assistant.',
    icon: <User className="h-8 w-8" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    href: '/solutions/agent'
  },
  {
    name: 'For Developers',
    description: 'Launch projects with unparalleled speed and intelligence. Generate complete marketing campaigns, from brochures to landing pages, in minutes.',
    icon: <Building className="h-8 w-8" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    href: '/solutions/developer'
  },
  {
    name: 'For Investors',
    description: 'Find and analyze opportunities with AI-powered tools. Get data-driven price estimates, market reports, and find deals before anyone else.',
    icon: <Wallet className="h-8 w-8" />,
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    href: '/solutions/investor'
  }
];

export default function SolutionsDirectoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
         <PageHeader 
            icon={<Sparkles className="h-8 w-8" />}
            title="A Solution for Everyone"
            description="WhatsMAP is an integrated ecosystem built for every player in the real estate game. Discover the suite of tools tailored for you."
        />

        <section className="my-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {personas.map((persona) => (
              <Link key={persona.name} href={persona.href} className="group flex">
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
                    <div className="px-6 pb-6 mt-auto">
                         <div className="text-primary font-semibold flex items-center gap-2">
                           <span>Explore Tools</span>
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
