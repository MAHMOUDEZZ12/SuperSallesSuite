
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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold font-heading tracking-tighter mb-4 text-foreground">
             Your AI-powered gateway to Dubai real estate intelligence.
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 mb-8">
            Search anything about Dubai’s property market. From projects to trends—and instantly act on insights with the selltoday.ai suite.
          </p>
          <React.Suspense fallback={<div>Loading...</div>}>
            <MarketSearchInput />
          </React.Suspense>
           <div className="mt-8">
            <Link href="/signup">
                <ShinyButton>
                   Sign Up Free & Unlock The Suite
                   <ArrowRight />
                </ShinyButton>
            </Link>
           </div>
        </div>
      </main>
      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      <LandingFooter />
    </div>
  );
}
