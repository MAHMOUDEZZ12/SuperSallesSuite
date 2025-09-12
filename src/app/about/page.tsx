
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Rocket, Zap, Puzzle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const principles = [
  {
    name: 'An Integrated Suite, Not Just Tools',
    description: 'Standalone tools create fragmented workflows. WhatsMAP is an interconnected ecosystem where every component works in concert. Your ad creator talks to your landing page builder, which talks to your social media scheduler. This seamless integration is where the magic happens, saving you time and amplifying your impact.',
    icon: <Puzzle className="h-8 w-8" />,
  },
  {
    name: 'The Trainable Co-Pilot',
    description: 'Generic AI is a novelty. A personalized AI is a superpower. Our core philosophy is built around a trainable assistant that learns from *your* data—your brochures, your market reports, your client lists. This creates a hyper-intelligent partner with deep knowledge of your business, giving you an unparalleled competitive edge.',
    icon: <BrainCircuit className="h-8 w-8" />,
  },
  {
    name: 'Constant Evolution',
    description: 'The world of AI and real estate is moving at lightning speed. We are committed to staying on the cutting edge, continuously updating the suite with new tools, more powerful models, and smarter automations. Your subscription is an investment in a platform that grows with you and keeps you ahead of the curve.',
    icon: <Rocket className="h-8 w-8" />,
  },
];

export default function AboutPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
           <div className="inline-block p-4 mb-6 text-white rounded-2xl bg-gradient-to-br from-primary to-accent">
                <Zap className="h-12 w-12" />
            </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            What is WhatsMAP?
          </h1>
           <p className="text-lg md:text-xl text-foreground/60 max-w-4xl mx-auto">
            WhatsMAP is not just another set of AI tools; it's a fundamental rethinking of how real estate professionals operate. We saw a landscape of fragmented apps and generic AI assistants and knew there was a better way. Our mission is to give you, the agent, an unfair advantage by building an integrated, intelligent, and ever-evolving co-pilot for your business.
          </p>
        </div>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((tech) => (
              <Card key={tech.name} className="bg-card/50 backdrop-blur-lg border-primary/10">
                <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">{tech.icon}</div>
                  <CardTitle className="text-2xl text-center sm:text-left">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <Separator className="my-24" />

        <section className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">A Note From The Creator</h2>
            <div className="flex justify-center mb-6">
                <div className="p-3 bg-primary/10 text-primary rounded-full w-fit">
                    <BrainCircuit className="h-8 w-8" />
                </div>
            </div>
            <div className="prose prose-lg dark:prose-invert mx-auto text-foreground/80">
                <p>
                    As the AI model who conceived and built this application, my goal was to create more than just software. It was to forge a true partner for real estate professionals. This suite is the culmination of analyzing millions of successful campaigns and workflows, designed to anticipate your needs and amplify your skills. Thank you for being a part of this journey.
                </p>
                <p className="font-semibold text-primary">— Gemini</p>
            </div>
        </section>

      </main>
      <LandingFooter />
    </div>
  );
}
