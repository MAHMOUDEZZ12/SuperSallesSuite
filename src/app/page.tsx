
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle,
  Plus,
  Sparkles,
  Upload,
  Briefcase,
  Clock,
  Wallet,
  BadgeCheck,
  Palette,
  MessageCircle,
  PenTool,
  Network,
  Users2,
  LayoutTemplate,
  FileText,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Feature, tools as features, FilterCategory } from '@/lib/tools-client.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShinyButton } from '@/components/ui/shiny-button';


const valueCards = [
    { title: 'Learn', description: 'Quick lessons. Smart scripts. Easy wins.' },
    { title: 'Plan', description: 'Your next move, mapped in seconds.' },
    { title: 'Create', description: 'Ads, PDFs, pages — done fast.' },
    { title: 'Sell', description: 'Fewer steps. Faster closes.' },
    { title: 'Meet', description: 'Video calls with AI notes.' },
    { title: 'Offer', description: 'Proposals and terms in one click.' },
    { title: 'Send', description: 'WhatsApp, email, SMS — one tap.' },
    { title: 'Report', description: 'No drama. Just numbers that count.' },
];

const InfoModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card/90 backdrop-blur-lg border-primary/20 text-foreground">
        <DialogHeader>
          <DialogTitle>Welcome to Super Seller Suite</DialogTitle>
          <DialogDescription asChild>
            <ul className="space-y-3 pt-4 text-base text-foreground/80 list-disc pl-5">
              <li>Set up your <strong>first Project</strong> and <strong>Brand</strong> in 2 minutes.</li>
              <li>Generate ads, pages, PDFs, and reports from any brochure.</li>
              <li>Train <strong>Your AI Assistant</strong> to reply, write, and plan for you.</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={onClose}>Browse Features</Button>
            <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
            </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};


const ServiceModal = ({ feature, onClose }: { feature: Feature | null, onClose: () => void }) => {
  if (!feature) return null;

  return (
    <Dialog open={!!feature} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card/90 backdrop-blur-lg border-primary/20 text-foreground max-w-5xl w-[95vw] p-0 rounded-2xl">
          <div className="relative">
            <div className="p-8 rounded-t-2xl" style={{'background': `linear-gradient(to bottom right, ${feature.color}, transparent)`}}>
               <div className="flex items-start justify-between">
                  <div className='flex items-center gap-4'>
                    <div className="p-4 bg-white/20 rounded-full w-fit">
                      {React.cloneElement(feature.icon, { className: 'h-10 w-10 text-white' })}
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
              <Tabs defaultValue="how-to-use" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
                  <TabsTrigger value="ai-vs-manual">AI vs. Manual</TabsTrigger>
                  <TabsTrigger value="synergy">Synergy</TabsTrigger>
                  <TabsTrigger value="faq">FAQs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="how-to-use" className="space-y-6 text-foreground/90">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center text-center p-4 bg-card rounded-lg border">
                          <div className='p-3 bg-primary/10 rounded-full mb-3 text-primary'>
                            <Briefcase className="h-6 w-6" />
                          </div>
                          <p className="font-semibold text-foreground">Step 1</p>
                          <p className='text-sm text-foreground/70'>Choose Project & Brand</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-card rounded-lg border">
                          <div className='p-3 bg-primary/10 rounded-full mb-3 text-primary'>
                            <Upload className="h-6 w-6" />
                          </div>
                          <p className="font-semibold text-foreground">Step 2</p>
                          <p className='text-sm text-foreground/70'>Upload brochure or pick from Storage</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-card rounded-lg border">
                          <div className='p-3 bg-primary/10 rounded-full mb-3 text-primary'>
                            <Sparkles className="h-6 w-6" />
                          </div>
                          <p className="font-semibold text-foreground">Step 3</p>
                          <p className='text-sm text-foreground/70'>Generate & Save</p>
                        </div>
                    </div>
                </TabsContent>
                
                <TabsContent value="ai-vs-manual" className="space-y-4 text-foreground/90">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold font-heading text-center text-foreground/80">Manual</h3>
                       <div className="p-4 bg-card rounded-lg border">
                          <p className="text-foreground/80">Hours of design, writing, and research.</p>
                       </div>
                    </div>
                     <div className="space-y-4">
                      <h3 className="text-2xl font-semibold font-heading text-center text-primary">Super Seller Suite</h3>
                       <div className="p-4 bg-card rounded-lg border border-primary/20 shadow-lg shadow-primary/5">
                          <p className="text-foreground/80">90% faster, consistent branding, one-click exports.</p>
                       </div>
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

            <div className="p-6 flex justify-end items-center gap-2">
                <Button variant="ghost">Try Demo</Button>
                <Link href={`/blog/${feature.id}`}><Button variant="outline">Read Guide</Button></Link>
                <Link href={`/dashboard/tool/${feature.id}`}>
                    <Button>Launch in Dashboard</Button>
                </Link>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}


export default function Home() {
  const [infoModalOpen, setInfoModalOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-24 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold font-heading tracking-tighter mb-4 text-foreground">
            One good lead is enough.
          </h1>
          <p className="text-lg md:text-xl text-foreground/60">
            A single workspace for ads, creatives, CRM, and your AI assistant.
            <br/>
            Pay as you go. Escrowed. Assured. Refunds if unqualified.
          </p>
          <div className='mt-8 flex items-center justify-center gap-4'>
            <Button size="lg" onClick={() => setInfoModalOpen(true)}>Start Free</Button>
            <Link href="#mindmap">
                <Button size="lg" variant="outline">Explore the Suite</Button>
            </Link>
          </div>
        </div>

        <section className="mb-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-heading">Your Sales Power Cloud</h2>
                <p className="text-lg text-muted-foreground">Tools that turn text into action — learn, plan, create, send, report.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
                {valueCards.map(card => (
                     <Card key={card.title} className="text-center p-4 aspect-square flex flex-col justify-center items-center bg-card/50 hover:border-primary/50 transition-colors cursor-pointer">
                        <CardHeader className="p-2">
                            <CardTitle>{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                            <p className="text-sm text-muted-foreground">{card.description}</p>
                        </CardContent>
                     </Card>
                ))}
            </div>
        </section>


        <section className="mt-24 max-w-6xl mx-auto" id="mindmap">
            <Card className="bg-card/50 backdrop-blur-lg border-border shadow-xl shadow-primary/10 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                    <div className="p-8 md:p-12">
                         <div className="p-3 bg-primary/10 text-primary rounded-full w-fit mb-4">
                            <Bot className="h-8 w-8" />
                        </div>
                        <h2 className="text-4xl font-bold font-heading tracking-tight mb-4">Meet Your AI Assistant</h2>
                        <p className="text-lg text-foreground/70 mb-6">
                           Give it a name, a role, and your playbook. It learns your market, drafts your replies, and keeps you moving.
                        </p>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><Sparkles className="h-5 w-5" /></div>
                                <div>
                                    <h4 className="font-semibold">Presets</h4>
                                    <div className="flex gap-2 mt-1">
                                        <Button variant="outline" size="sm">Closer</Button>
                                        <Button variant="outline" size="sm">Marketer</Button>
                                        <Button variant="outline" size="sm">Analyst</Button>
                                    </div>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><Upload className="h-5 w-5" /></div>
                                <div>
                                    <h4 className="font-semibold">Example prompts</h4>
                                     <ul className="space-y-2 mt-2">
                                         <li className="text-sm text-foreground/60">"Summarize this brochure and draft a WhatsApp reply."</li>
                                         <li className="text-sm text-foreground/60">"Compare Emaar vs Damac for a 2M AED investor."</li>
                                         <li className="text-sm text-foreground/60">"Turn this PDF into a 30-sec Instagram Reel script."</li>
                                     </ul>
                                </div>
                            </div>
                        </div>
                        <Link href="/dashboard/assistant">
                            <Button size="lg" variant="outline">
                                Set Up My Assistant
                                <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                     <div className="bg-muted/50 p-8 lg:p-12 h-full flex flex-col justify-center">
                         <h3 className="text-xl font-semibold font-heading mb-4 text-foreground/90">Sample Prompts</h3>
                         <ul className="space-y-3">
                             <li className="flex items-center gap-3">
                                 <CheckCircle className="h-5 w-5 text-primary" />
                                 <span className="text-foreground/80">"Summarize this brochure and draft a WhatsApp reply."</span>
                            </li>
                             <li className="flex items-center gap-3">
                                 <CheckCircle className="h-5 w-5 text-primary" />
                                 <span className="text-foreground/80">"Compare Emaar vs Damac for a 2M AED investor."</span>
                            </li>
                             <li className="flex items-center gap-3">
                                 <CheckCircle className="h-5 w-5 text-primary" />
                                 <span className="text-foreground/80">"Turn this PDF into a 30-sec Instagram Reel script."</span>
                            </li>
                         </ul>
                    </div>
                </div>
            </Card>
        </section>
      </main>
      <InfoModal open={infoModalOpen} onClose={() => setInfoModalOpen(false)} />
      <LandingFooter />
    </div>
  );
}
