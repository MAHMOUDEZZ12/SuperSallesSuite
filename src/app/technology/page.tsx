
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, Check, Cpu, Globe, Instagram, MessageCircle, Network, Bot, Send, Loader2, Sparkles, Upload, ArrowRight, Share2, FileText, Link as LinkIcon, File, Plus, Video, Phone, Users2, Facebook, ClipboardList, PenTool, Mic } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const steps = [
    {
        icon: <PenTool />,
        title: "1. Describe Your Character",
        description: "Start by describing your ideal presenter. Or, choose from a gallery of pre-rendered, professional characters."
    },
    {
        icon: <Mic />,
        title: "2. Provide the Script",
        description: "Write or paste the script you want your AI presenter to speak. This can be a project pitch, a market update, or a property tour."
    },
    {
        icon: <Video />,
        title: "3. Generate Your Video",
        description: "The AI combines the character and script, generating a high-quality video with natural speech and expressions, ready for you to use."
    }
];

export default function AIHostPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full">
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
             <div className="container mx-auto px-4 md:px-6 text-center">
                <PageHeader 
                    icon={<Video className="h-12 w-12" />}
                    title="Meet Your Digital Twin"
                    description="The AI presenter that never sleeps. Create lifelike video presenters to deliver pitches, tours, and market updates 24/7."
                />
                 <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                     <Link href="/signup">
                        <ShinyButton>Get Your AI Presenter Now</ShinyButton>
                    </Link>
                 </div>
            </div>
        </section>

        <section className="py-20 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <Card className="w-full max-w-4xl mx-auto shadow-2xl shadow-primary/10 border-primary/20">
                    <CardContent className="p-4">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                             <Image 
                                src="https://picsum.photos/seed/presenter-hero/1280/720"
                                alt="AI Presenter Preview"
                                width={1280}
                                height={720}
                                className="w-full h-full object-cover"
                                data-ai-hint="professional presenter"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>

        <section className="py-20 md:py-24 bg-muted/50">
             <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">A Revolution in Content Creation</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Stop spending hours and thousands of dollars on video production. Create professional, personalized videos in minutes.</p>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <Card key={step.title} className="text-center">
                            <CardHeader>
                                <div className="p-4 bg-primary/10 text-primary rounded-full w-fit mx-auto mb-4">
                                    {React.cloneElement(step.icon, { className: 'h-8 w-8' })}
                                </div>
                                <CardTitle>{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{step.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </div>
        </section>

        <section className="py-20 md:py-32">
             <div className="container mx-auto px-4 md:px-6">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <Badge>Use Cases</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Endless Possibilities</h2>
                        <p className="text-lg text-muted-foreground">From hyper-personalized sales pitches to automated social media content, your AI presenter is your new secret weapon.</p>
                        <ul className="space-y-3 pt-4">
                            <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Personalized Lead Follow-up:</span><br /><span className="text-muted-foreground">Send a unique video to each new lead, addressing them by name.</span></div></li>
                            <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Automated Property Tours:</span><br /><span className="text-muted-foreground">Generate a virtual tour for every listing without leaving your desk.</span></div></li>
                            <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Weekly Market Updates:</span><br /><span className="text-muted-foreground">Create consistent, professional video content for your social media channels in minutes.</span></div></li>
                        </ul>
                    </div>
                    <div className="p-4 bg-muted rounded-2xl">
                         <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-2xl">
                            <div className="aspect-video bg-background flex items-center justify-center relative">
                                <Image src="https://picsum.photos/seed/presenter-card/400/225" alt="AI Presenter speaking" layout="fill" objectFit="cover" data-ai-hint="professional woman smiling" />
                            </div>
                            <div className="p-4 bg-card">
                                <h3 className="font-bold">Weekly Market Update: Dubai Marina</h3>
                                <p className="text-sm text-muted-foreground mt-1">Your AI-powered look at this week's trends, prices, and opportunities.</p>
                            </div>
                         </Card>
                    </div>
                 </div>
            </div>
        </section>

      </main>
      <LandingFooter />
    </div>
  );
}
