
'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle,
  Plus,
  Sparkles,
  Upload,
  Megaphone,
  User,
  ShieldQuestion,
  Search,
  MessageCircle,
  PenTool,
  Clock2,
  Wallet,
  BadgeCheck,
  ClipboardList,
  Target,
  LineChart,
  Users2,
  Network,
  LayoutTemplate,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type FilterCategory } from '@/lib/features';
import { tools as features, type Feature } from '@/lib/features';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { IconMap } from '@/components/ui/icon-map';
import { useRouter } from 'next/navigation';
import MarketSearchInput from '@/components/ui/market-search-input';
import { FeatureModal } from '@/components/feature-modal';


const filterCategories: FilterCategory[] = ['All', 'Marketing', 'Lead Gen', 'Creative', 'Sales Tools', 'Social & Comms', 'Web', 'Editing', 'Ads'];

const announcements = [
    "The new Meta Auto Pilot can now orchestrate your entire ad workflow!",
    "You can now connect your Bayut account to sync listings automatically.",
    "The Investor Matching tool now supports commercial properties.",
];


const faqItems = [
    {
        value: "faq-1",
        question: "Is my data secure?",
        answer: "Absolutely. Security is our top priority. Your data, including uploaded documents and client lists, is kept private and encrypted. We do not use your data to train AI models for other users. Your business intelligence remains your own."
    },
    {
        value: "faq-2",
        question: "Is this really free?",
        answer: "Yes. The core Market Library and AI-powered search are completely free to use. We plan to introduce premium app suites and membership plans in the future for advanced features, but the core intelligence tool will remain free."
    },
    {
        value: "faq-3",
        question: "Can I save projects or searches?",
        answer: "Yes! When you sign up for a free account, you can create your own personal project library, save searches, and begin to train your own private AI assistant with your brand and assets."
    },
    {
        value: "faq-4",
        question: "How does the AI Assistant learn?",
        answer: "The AI Assistant learns from the private documents you provide it in the 'Knowledge Base'. By uploading your brochures, market reports, and your client lists, you create a personalized co-pilot with deep, contextual knowledge of *your* business."
    },
    {
        value: "faq-5",
        question: "What if I need help or have an issue?",
        answer: "We offer comprehensive support. You can explore our detailed 'Handbook' for guides on every tool, check our real-time 'System Status' page, or report an issue directly to our support team via the link in the dashboard."
    }
];

export default function Home() {
  const [selectedFeature, setSelectedFeature] = React.useState<Omit<Feature, 'renderResult'> | null>(null);
  const [activeFilter, setActiveFilter] = React.useState<FilterCategory>('All');
  const [currentAnnouncement, setCurrentAnnouncement] = React.useState(announcements[0]);
  
  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * announcements.length);
    setCurrentAnnouncement(announcements[randomIndex]);
  }, []);

  const handleCardClick = (feature: Omit<Feature, 'renderResult'>) => {
    setSelectedFeature(feature);
  };

  const getCategoryCount = (category: FilterCategory) => {
    const visibleFeatures = features.filter(f => f.id !== 'superfreetime');
    if (category === 'All') return visibleFeatures.length;
    return visibleFeatures.filter(f => f.categories.includes(category)).length;
  }

  const filteredFeatures = (activeFilter === 'All'
    ? features
    : features.filter(feature => feature.categories.includes(activeFilter))
  ).filter(feature => feature.id !== 'superfreetime');

  const FeatureCard = ({
    feature,
    onClick,
  }: {
    feature: Omit<Feature, 'renderResult'>;
    onClick: (feature: Omit<Feature, 'renderResult'>) => void;
  }) => {
    const Icon = IconMap[feature.icon as keyof typeof IconMap] || Sparkles;
    return (
      <Card 
          className="group flex flex-col bg-card/50 backdrop-blur-lg border-border hover:border-primary/30 transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-xl shadow-primary/10"
          onClick={() => onClick(feature)}
      >
        <CardContent className="flex flex-col flex-grow p-6">
          <div className='flex items-center justify-between mb-4'>
              <div 
                className="p-3 rounded-lg w-fit text-white"
                style={{ backgroundColor: feature.color }}
              >
                  <Icon className="h-8 w-8" />
              </div>
               {(feature.badge) && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                       <span className={cn(
                          `px-2 py-0.5 text-xs font-semibold text-white rounded-full transition-all duration-200`,
                           feature.badge === 'NEW' ? 'bg-blue-500' : 'bg-amber-400'
                       )}>
                          {feature.badge}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{feature.badge === 'NEW' ? 'This is a brand new feature!' : 'This is an automated workflow pilot.'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
          </div>
          <h2 className="text-2xl font-bold font-heading text-foreground mb-2">{feature.title}</h2>
          <p className="text-lg text-foreground/70 flex-grow">{feature.description}</p>
           <div className="mt-6">
              <Button variant="link" className="p-0 text-base text-primary">
                  {feature.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
           </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold font-heading tracking-tighter mb-4 text-foreground">
             Your AI-powered gateway to Dubai real estate intelligence.
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 mb-8">
            Search anything about Dubai’s property market. From projects to trends—and instantly act on insights with our integrated app suite.
          </p>
          <React.Suspense fallback={<div>Loading...</div>}>
            <MarketSearchInput />
          </React.Suspense>
           <div className="mt-8">
            <Link href="/signup">
                <ShinyButton>
                   Sign Up Free & Build Your Library
                   <ArrowRight />
                </ShinyButton>
            </Link>
           </div>
        </div>
        
         <section className="mt-32 max-w-6xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-lg border-border shadow-xl shadow-primary/10 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                    <div className="p-8 md:p-12">
                         <div className="p-3 bg-primary/10 text-primary rounded-full w-fit mb-4">
                            <Bot className="h-8 w-8" />
                        </div>
                        <h2 className="text-4xl font-bold font-heading tracking-tight mb-4">Your AI Agent, Supercharged</h2>
                        <p className="text-lg text-foreground/70 mb-6">
                           Your assistant is more than a chatbot. It's a command center for your entire suite. Train it, command it, and let it run entire campaigns for you.
                        </p>
                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><BrainCircuit className="h-6 w-6" /></div>
                                <div>
                                    <h4 className="font-semibold text-lg">Trainable Intelligence</h4>
                                    <p className="text-md text-foreground/60">Upload your brochures, market reports, and client lists. Your assistant learns from your private data to give hyper-relevant answers that public AIs can't match.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><Sparkles className="h-6 w-6" /></div>
                                <div>
                                    <h4 className="font-semibold text-lg">Text-to-Action Commands</h4>
                                    <p className="text-md text-foreground/60">Issue direct orders. Instead of just asking for ideas, tell your assistant: "Rebrand the Emaar Beachfront brochure with my logo" or "Find three investors for this property from my list."</p>
                                </div>
                            </div>
                              <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><Megaphone className="h-6 w-6" /></div>
                                <div>
                                    <h4 className="font-semibold text-lg">Cross-Tool Workflows</h4>
                                    <p className="text-md text-foreground/60">Orchestrate multi-step campaigns. Command the assistant: "Create a new project for 'Sobha Hartland', generate a promotional video, and save the final video to my drive."</p>
                                </div>
                            </div>
                        </div>
                         <div className="mt-12 lg:w-full">
                            <Link href="/dashboard/assistant">
                                <Button size="lg" variant="outline" className="w-full py-6 text-lg">
                                    Your assistant is ready. Are you?
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="p-8 md:p-12 bg-muted/50 h-full flex flex-col justify-center min-h-[500px]">
                        <div className="w-full max-w-lg mx-auto space-y-6">
                            <div className="flex items-start gap-3 justify-end">
                                <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-br-none max-w-sm shadow-md">
                                    <p>Create a new project for 'Emaar Beachfront', generate a promotional video, and save it to my library.</p>
                                </div>
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start gap-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-6 w-6"/></AvatarFallback>
                                </Avatar>
                                <div className="bg-background border p-4 rounded-2xl rounded-bl-none max-w-sm shadow-md">
                                    <p>Of course. I've initiated the following workflow:</p>
                                    <ul className="mt-2 space-y-1 list-inside">
                                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 1. Project Created: 'Emaar Beachfront'</li>
                                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 2. Video Generation: In progress...</li>
                                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 3. File Saved: Pending</li>
                                    </ul>
                                    <p className="text-xs text-muted-foreground mt-2">I will notify you when the video is ready.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-6 w-6"/></AvatarFallback>
                                </Avatar>
                                <div className="bg-background border p-4 rounded-2xl rounded-bl-none max-w-sm shadow-md">
                                    <p>Update: The video for 'Emaar Beachfront' is ready. You can <Link href="#" className="underline">preview it here</Link>. It's also been saved to your asset library.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </section>

        <section className="mt-32 max-w-5xl mx-auto">
            <div className="text-center mb-12">
                 <div className="inline-block p-4 mb-6 text-white rounded-2xl bg-gradient-to-br from-primary to-accent">
                    <ShieldQuestion className="h-10 w-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-foreground/60">
                    Clear, simple answers to your most common questions.
                </p>
            </div>

             <Accordion type="single" collapsible className="w-full space-y-4">
                {faqItems.map((item) => (
                    <AccordionItem value={item.value} key={item.value} className="bg-card/50 backdrop-blur-lg border rounded-2xl shadow-lg shadow-primary/10">
                        <AccordionTrigger className="text-left text-lg p-6 hover:no-underline">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 text-base text-foreground/80">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>

      </main>
      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      <LandingFooter />
    </div>
  );
}
