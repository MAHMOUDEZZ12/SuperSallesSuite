
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
} from 'lucide-react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { ShinyButton } from '@/components/ui/shiny-button';
import { FeatureModal } from '@/components/feature-modal';
import { type Feature, tools } from '@/lib/features';
import { MindMapNode, ToolLeaf } from '@/components/ui/mind-map-components';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import MarketSearchInput from '@/components/ui/market-search-input';
import { Logo } from '@/components/logo';
import { User, Video as VideoIcon, Bot, PenTool, Mic } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

// --- Components for different homepages ---

const MindMapHome = () => {
  const [selectedFeature, setSelectedFeature] = React.useState<Omit<Feature, 'renderResult'> | null>(null);

  const toolCategories = [
    { name: "Meta Ads AI Suite", tools: tools.filter(t => t.mindMapCategory === 'Meta Ads AI Suite') },
    { name: "Creative Suite", tools: tools.filter(t => t.mindMapCategory === 'Creative Suite') },
    { name: "Sales Enablement", tools: tools.filter(t => t.mindMapCategory === 'Sales Enablement') },
    { name: "Core Intelligence", tools: tools.filter(t => t.mindMapCategory === 'Core Intelligence') },
  ];

  return (
    <>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center justify-start">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16 max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-7xl font-bold font-heading tracking-tighter mb-4 text-foreground">
             The AI Co-Pilot for Real Estate
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 mb-8">
            An interconnected suite of AI-powered tools for sales, marketing, and creative work, built on a single, intelligent core. Explore the map to begin.
          </p>
           <div className="mt-8">
            <Link href="/signup">
                <ShinyButton>
                   Sign Up Free & Unlock The Suite
                   <ArrowRight />
                </ShinyButton>
            </Link>
           </div>
        </motion.div>

        <div className="relative flex w-full flex-col justify-center items-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="w-full max-w-xs mb-16 z-10"
            >
                 <MindMapNode title="selltoday.ai" isRoot />
            </motion.div>

            <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.7, delay: 0.6 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
            >
                {toolCategories.map((category) => (
                    <MindMapNode 
                      key={category.name} 
                      title={category.name}
                    >
                        {category.tools.map(tool => (
                            <ToolLeaf 
                                key={tool.id} 
                                tool={tool} 
                                onClick={setSelectedFeature}
                                className="z-10"
                            />
                        ))}
                    </MindMapNode>
                ))}
            </motion.div>
        </div>

      </main>
      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
    </>
  );
};

const SearchHome = () => (
  <main className="flex-1 flex flex-col items-center justify-center px-4 market-library-bg text-white">
    <div className="text-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold font-heading tracking-tight mb-4 text-white">
         Search anything Real Estate Dubai
        </h1>
    </div>
    <div className="w-full max-w-3xl">
        <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-white" />}>
            <MarketSearchInput useSearchPage={true} />
        </Suspense>
    </div>
  </main>
);

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
        icon: <VideoIcon />,
        title: "3. Generate Your Video",
        description: "The AI combines the character and script, generating a high-quality video with natural speech and expressions, ready for you to use."
    }
];

const VideoHome = () => (
    <main className="flex-1 w-full">
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
             <div className="container mx-auto px-4 md:px-6 text-center">
                <PageHeader 
                    icon={<VideoIcon className="h-12 w-12" />}
                    title="Meet Your Digital Twin"
                    description="The AI presenter that never sleeps. Create lifelike video presenters to deliver pitches, tours, and market updates 24/7."
                />
                 <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                     <Link href="/signup">
                        <ShinyButton>Get Started Free</ShinyButton>
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
                                <Image src="https://picsum.photos/seed/presenter-card/400/225" alt="AI Presenter speaking" fill={true} style={{objectFit:"cover"}} data-ai-hint="professional woman smiling" />
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
);

const embedCode = `
<div id="s3-chatbot-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;"></div>
<script>
  // Simplified for brevity. See src/app/dashboard/tool/chatbot-creator/page.tsx for full code.
  // In a real app, this would point to a URL hosting the chatbot widget.
</script>
`.trim();

type ChatMessage = { from: 'user' | 'ai'; text: string; };

const ChatbotPreview = () => {
    // This is a simplified, non-functional preview for the homepage.
    const [messages, setMessages] = useState<ChatMessage[]>([
        { from: 'ai', text: 'Hello! How can I help you with the real estate market today?' }
    ]);

    return (
        <div className="w-full max-w-sm h-[500px] bg-background rounded-xl border shadow-2xl flex flex-col">
            <header className="p-3 border-b flex items-center gap-3">
                <Bot className="h-6 w-6 text-primary" />
                <div>
                    <h3 className="font-semibold">Real Estate Assistant</h3>
                    <p className="text-xs text-green-500">● Online</p>
                </div>
            </header>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                            {msg.from === 'ai' && <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-4 w-4" /></AvatarFallback></Avatar>}
                            <div className={cn("max-w-[75%] rounded-2xl p-3 text-sm", msg.from === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="p-3 border-t bg-background rounded-b-xl">
                <Input placeholder="Ask about the market..." disabled />
            </div>
        </div>
    );
};

const ChatbotHome = () => {
    const { toast } = useToast();
    const copyCode = () => {
        navigator.clipboard.writeText(embedCode);
        toast({ title: "Code Copied!" });
    };
    return (
        <main className="flex-1 w-full">
             <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
                 <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                             <PageHeader 
                                icon={<Bot className="h-12 w-12" />}
                                title="Add an AI to Your Website"
                                description="Embed a market-aware AI assistant on your website to engage visitors and capture leads 24/7."
                            />
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                 <Link href="/signup">
                                    <ShinyButton>Get Your Chatbot</ShinyButton>
                                </Link>
                             </div>
                        </div>
                        <div className="flex justify-center">
                           <ChatbotPreview />
                        </div>
                    </div>
                 </div>
            </section>
        </main>
    );
};


// --- The main routing component ---
export default function Home() {
  const [activeHome, setActiveHome] = useState<'mindmap' | 'search' | 'video' | 'chatbot' | 'loading'>('loading');

  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname.includes('searchdxb') || hostname.includes('dxbbook') || hostname.includes('dubaibook')) {
      setActiveHome('search');
    } else if (hostname.includes('video')) { // Placeholder for a future video-centric domain
      setActiveHome('video');
    } else if (hostname.includes('chat')) { // Placeholder for a future chat-centric domain
      setActiveHome('chatbot');
    } else {
      setActiveHome('mindmap');
    }
  }, []);

  const renderHome = () => {
    switch(activeHome) {
      case 'search': return <SearchHome />;
      case 'video': return <VideoHome />;
      case 'chatbot': return <ChatbotHome />;
      case 'mindmap': return <MindMapHome />;
      case 'loading': 
      default:
        return (
          <main className="flex-1 flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </main>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      {renderHome()}
      <LandingFooter />
    </div>
  );
}
