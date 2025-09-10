
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
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { IconMap, IconProps } from '@/components/ui/icon-map';
import { useRouter } from 'next/navigation';
import MarketSearchInput from '@/components/ui/market-search-input';


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
        question: "What's included in the free trial?",
        answer: "The free trial gives you access to a selection of our core tools with a limited number of AI generations. It's the perfect way to experience the power of the suite and see how it can fit into your workflow before committing to a plan."
    },
    {
        value: "faq-3",
        question: "Can I use my own branding?",
        answer: "Yes! The entire suite is built around your brand. In the 'Brand & Assets' section, you can upload your logo and define your color palette. The AI will then use these assets to ensure everything it creates is perfectly on-brand."
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

const FeatureModal = ({ feature, onClose }: { feature: Omit<Feature, 'renderResult'> | null, onClose: () => void }) => {
  if (!feature) return null;
  const Icon = IconMap[feature.icon as keyof typeof IconMap] || Sparkles;

  return (
    <Dialog open={!!feature} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card/90 backdrop-blur-lg border-primary/20 text-foreground max-w-5xl w-[95vw] p-0 rounded-2xl">
          <div className="relative">
            <div className="p-8 rounded-t-2xl" style={{'background': `linear-gradient(to bottom right, ${feature.color}, transparent)`}}>
               <div className="flex items-start justify-between">
                  <div className='flex items-center gap-4'>
                    <div className="p-4 bg-white/20 rounded-full w-fit">
                      <Icon className='h-10 w-10 text-white' />
                    </div>
                    <div>
                      <DialogTitle asChild>
                        <h2 className="text-4xl font-bold font-heading text-white mb-1">{feature.title}</h2>
                      </DialogTitle>
                      <p className="text-lg text-white/80">{feature.description}</p>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className='p-8'>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="overview">How to Use</TabsTrigger>
                  <TabsTrigger value="comparison">AI vs. Manual</TabsTrigger>
                  <TabsTrigger value="synergy">Synergy</TabsTrigger>
                  <TabsTrigger value="faq">FAQs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6 text-foreground/90">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {feature.details.steps.map((step, i) => {
                        const StepIcon = IconMap[step.icon as keyof typeof IconMap] || Sparkles;
                        return (
                        <div key={i} className="flex flex-col items-center text-center p-4 bg-card rounded-lg border">
                          <div className='p-3 bg-primary/10 rounded-full mb-3 text-primary'>
                            <StepIcon className='h-6 w-6' />
                          </div>
                          <p className="font-semibold text-foreground">Step {i+1}</p>
                          <p className='text-sm text-foreground/70'>{step.text}</p>
                        </div>
                      )})}
                    </div>
                </TabsContent>
                
                <TabsContent value="comparison" className="space-y-4 text-foreground/90">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold font-heading text-center text-foreground/80">Manual</h3>
                       {feature.details.aiVsManual.map((item, index) => {
                        const ItemIcon = IconMap[item.icon as keyof typeof IconMap] || Sparkles;
                        return (
                        <div key={index} className="p-4 bg-card rounded-lg border">
                           <div className="flex items-center gap-3 mb-2">
                            <ItemIcon className="h-5 w-5 text-muted-foreground" />
                            <h4 className="font-semibold text-foreground">{item.metric}</h4>
                          </div>
                          <p className="text-foreground/80 pl-8">{item.manual}</p>
                        </div>
                       )})}
                    </div>
                     <div className="space-y-4">
                      <h3 className="text-2xl font-semibold font-heading text-center text-primary">selltoday.ai</h3>
                       {feature.details.aiVsManual.map((item, index) => {
                        const ItemIcon = IconMap[item.icon as keyof typeof IconMap] || Sparkles;
                        return (
                        <div key={index} className="p-4 bg-card rounded-lg border border-primary/20 shadow-lg shadow-primary/5">
                           <div className="flex items-center gap-3 mb-2">
                             <ItemIcon className="h-5 w-5 text-primary" />
                            <h4 className="font-semibold text-primary">{item.metric}</h4>
                          </div>
                          <p className="text-foreground/80 pl-8">{item.ai}</p>
                        </div>
                       )})}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="synergy" className="space-y-4 text-foreground/90">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {feature.details.synergy.map((s, index) => (
                      <div key={index} className="bg-card p-6 rounded-lg border flex flex-col justify-center">
                         <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-primary/10 text-primary rounded-md">
                                <h4 className="font-semibold text-sm">{feature.title}</h4>
                            </div>
                            <Plus className="h-5 w-5 text-muted-foreground shrink-0" />
                            <div className="p-2 bg-secondary text-secondary-foreground rounded-md">
                               <h4 className="font-semibold text-sm">{s.tool}</h4>
                            </div>
                        </div>
                        <div className="text-sm text-foreground/80 pl-1">
                          <p>{s.benefit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="faq">
                  <Accordion type="single" collapsible className="w-full">
                    {feature.details.faqs.map((faq, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className='text-left'>{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-foreground/80">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>

            <Separator />

            <div className="p-6 text-center">
                <Link href={`/dashboard/tool/${feature.id}`}>
                    <Button variant="outline" size="lg" className='text-base'>
                      {feature.cta}
                    </Button>
                </Link>
            </div>
            
          </div>
      </DialogContent>
    </Dialog>
  );
}


export default function Home() {
  const router = useRouter();
  const [selectedFeature, setSelectedFeature] = React.useState<Omit<Feature, 'renderResult'> | null>(null);
  const [activeFilter, setActiveFilter] = React.useState<FilterCategory>('All');
  const [currentAnnouncement, setCurrentAnnouncement] = React.useState(announcements[0]);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * announcements.length);
    setCurrentAnnouncement(announcements[randomIndex]);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query)}`);
      }
  };

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
            Search anything about Dubai’s property market. From projects to trends—and instantly act on insights with our integrated app suite.
          </p>
          <MarketSearchInput />
        </div>

        <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-lg py-4 mb-8">
            <div className="flex justify-center overflow-x-auto pb-4 no-scrollbar">
                <div className="flex gap-2 md:gap-4 flex-nowrap">
                  {filterCategories.map(category => (
                    <Button
                      key={category}
                      variant={activeFilter === category ? 'default' : 'outline'}
                      onClick={() => setActiveFilter(category)}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm md:text-base transition-all duration-200 shrink-0',
                        activeFilter === category && 'shadow-lg shadow-primary/20'
                      )}
                    >
                      {category} <span className="hidden md:inline-block ml-1">({getCategoryCount(category)})</span>
                    </Button>
                  ))}
                </div>
            </div>
            <div className="text-center text-sm text-muted-foreground mt-2 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">What's New?</span> {currentAnnouncement}
            </div>
        </div>

        <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 lg:gap-12 max-w-[120rem] mx-auto"
        >
          {filteredFeatures.map((feature) => (
            <FeatureCard 
                key={feature.id} 
                feature={feature} 
                onClick={handleCardClick}
            />
          ))}
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
