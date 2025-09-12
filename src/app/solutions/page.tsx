
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, ArrowRight, User, Building, Wallet, BrainCircuit, MessageCircle, FileText } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';

const techPillars = [
  {
    name: 'Persona-Driven Results',
    description: "Our engine understands who you are. An investor sees ROI and cap rates; a homebuyer sees schools and lifestyle features. Same query, different results, perfectly tailored to your goals.",
    icon: <User className="h-8 w-8" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
  },
  {
    name: 'Natural Language Understanding',
    description: "Ask complex, conversational questions. Instead of just matching keywords, our AI understands intent, context, and nuance to find what you're truly looking for.",
    icon: <MessageCircle className="h-8 w-8" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
  },
  {
    name: 'Real-Time Data Synthesis',
    description: "We don't just give you a list of links. Our AI reads, analyzes, and synthesizes data from market reports, listings, and news to give you a single, coherent answer.",
    icon: <FileText className="h-8 w-8" />,
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
  }
];

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
            icon={<BrainCircuit className="h-8 w-8" />}
            title="The AI-Native Search Engine"
            description="Discover how our search technology understands intent, context, and persona to deliver unparalleled results. It's not just a search bar; it's an answer engine."
        />

        <section className="my-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {techPillars.map((pillar) => (
              <Card key={pillar.name} className="bg-card/50 backdrop-blur-lg border-primary/10">
                  <CardHeader>
                      <div className={`p-3 rounded-lg w-fit ${pillar.bgColor} ${pillar.color}`}>
                          {pillar.icon}
                      </div>
                  </CardHeader>
                  <CardContent>
                      <h3 className="text-xl font-bold font-heading mb-2">{pillar.name}</h3>
                      <p className="text-foreground/80">{pillar.description}</p>
                  </CardContent>
              </Card>
            ))}
        </section>

        <div className="text-center my-24">
             <h2 className="text-3xl font-bold tracking-tight">See It In Action For You</h2>
             <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Explore the curated toolsets and example results for your specific role in the real estate ecosystem.</p>
        </div>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                           <span>Explore Solutions</span>
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
