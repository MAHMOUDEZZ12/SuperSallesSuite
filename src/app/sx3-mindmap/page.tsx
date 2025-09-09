
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { type Feature } from '@/lib/tools-client';
import { tools } from '@/lib/features';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight, BookOpen, BrainCircuit, Check, MessageCircle, Plus, Sparkles, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

const MindMapNode = ({
  title,
  children,
  className,
  isRoot = false,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
  isRoot?: boolean;
}) => {
  return (
    <div className={cn("relative flex flex-col items-center w-full", className)}>
      <div
        className={cn(
          "relative rounded-xl border-2 p-4 text-center shadow-lg flex flex-col items-center justify-center z-10 w-full",
          isRoot
            ? "border-primary bg-primary/10 min-h-24"
            : "border-border bg-card/80 backdrop-blur-sm min-h-20"
        )}
      >
        <h3 className={cn(isRoot ? 'text-primary text-2xl font-bold' : 'text-foreground font-semibold text-lg')}>{title}</h3>
      </div>
      {children && (
        <div className="relative pt-8 w-full flex flex-col items-center">
           <div className="relative z-10 flex flex-col items-center gap-4 w-full">
            {children}
           </div>
        </div>
      )}
    </div>
  );
};

const ToolLeaf = ({ tool, onClick, className }: { tool: Feature; onClick: (tool: Feature) => void; className?: string }) => {
    const Icon = tool.icon;
    return (
    <div className={cn("group w-full max-w-xs flex justify-center", className)}>
        <button onClick={() => onClick(tool)} className="w-full text-left h-full">
            <div className={cn("relative flex items-center justify-center h-full", tool.id === 'ai-assistant' ? 'min-h-[16rem]' : 'h-12')}>
                <div className="flex w-full h-full flex-col justify-center rounded-lg border bg-card/90 p-3 pr-4 shadow-md transition-all duration-200 hover:border-primary/50 hover:shadow-primary/10 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md text-white" style={{backgroundColor: tool.color}}><Icon className='h-5 w-5' /></div>
                        <span className="font-medium text-sm text-foreground/90">{tool.title}</span>
                        {tool.badge && (
                           <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span
                                  className={cn(
                                    'ml-auto px-1.5 py-0.5 text-xs font-semibold text-white rounded-full',
                                    tool.badge === 'NEW' ? 'bg-blue-500' : tool.badge === 'Pilot*' ? 'bg-amber-400' : 'bg-yellow-500'
                                  )}
                                >
                                  {tool.badge}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                 <p>{tool.badge === 'NEW' ? 'This is a brand new feature!' : tool.badge === 'Pilot*' ? 'This is an automated workflow pilot.' : 'This feature is in active development.'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 ml-auto" />
                    </div>
                     {tool.id === 'ai-assistant' && (
                        <div className="space-y-3 p-2 text-left text-sm mt-4">
                            <div className="flex items-start gap-2 text-foreground/70">
                                <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                                <span><span className="font-bold text-foreground/90">Trainable:</span> Upload your brochures & reports.</span>
                            </div>
                             <div className="flex items-start gap-2 text-foreground/70">
                                <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                                <span><span className="font-bold text-foreground/90">Commandable:</span> Issue direct orders, not just prompts.</span>
                            </div>
                             <div className="flex items-start gap-2 text-foreground/70">
                                <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                                <span><span className="font-bold text-foreground/90">Integrated:</span> Crosstool tasks from the chat.</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </button>
    </div>
)};

const FeatureModal = ({ feature, onClose }: { feature: Feature | null, onClose: () => void }) => {
  if (!feature) return null;
  const Icon = feature.icon;

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
                      {feature.details.steps.map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-4 bg-card rounded-lg border">
                          <div className='p-3 bg-primary/10 rounded-full mb-3 text-primary'>
                            {step.icon}
                          </div>
                          <p className="font-semibold text-foreground">Step {i+1}</p>
                          <p className='text-sm text-foreground/70'>{step.text}</p>
                        </div>
                      ))}
                    </div>
                </TabsContent>
                
                <TabsContent value="comparison" className="space-y-4 text-foreground/90">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold font-heading text-center text-foreground/80">Manual</h3>
                       {feature.details.aiVsManual.map((item, index) => (
                        <div key={index} className="p-4 bg-card rounded-lg border">
                           <div className="flex items-center gap-3 mb-2">
                            {React.cloneElement(item.icon, { className: "h-5 w-5 text-muted-foreground" })}
                            <h4 className="font-semibold text-foreground">{item.metric}</h4>
                          </div>
                          <p className="text-foreground/80 pl-8">{item.manual}</p>
                        </div>
                      ))}
                    </div>
                     <div className="space-y-4">
                      <h3 className="text-2xl font-semibold font-heading text-center text-primary">Super Seller Suite</h3>
                       {feature.details.aiVsManual.map((item, index) => (
                        <div key={index} className="p-4 bg-card rounded-lg border border-primary/20 shadow-lg shadow-primary/5">
                           <div className="flex items-center gap-3 mb-2">
                             {React.cloneElement(item.icon, { className: "h-5 w-5 text-primary" })}
                            <h4 className="font-semibold text-primary">{item.metric}</h4>
                          </div>
                          <p className="text-foreground/80 pl-8">{item.ai}</p>
                        </div>
                      ))}
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
                <Link href={feature.isPage ? `/dashboard/tool/${feature.id}` : `/dashboard/tool/${feature.id}`}>
                    <Button variant="outline" size="lg" className='text-base'>
                      Create your first {feature.cta} today
                    </Button>
                </Link>
            </div>
            
          </div>
      </DialogContent>
    </Dialog>
  );
}


export default function SX3MindmapPage() {
    const [selectedFeature, setSelectedFeature] = React.useState<Feature | null>(null);
    const languages = ['مرحبا', 'Hello', 'Hola', 'こんにちは', '你好', 'Bonjour'];
    const [currentLang, setCurrentLang] = React.useState(0);

     React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLang(prev => (prev + 1) % languages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [languages.length]);


    const toolCategories = [
        { name: "Meta Ads AI Suite", tools: tools.filter(t => t.mindMapCategory === 'Meta Ads AI Suite') },
        { name: "Creative Suite", tools: tools.filter(t => t.mindMapCategory === 'Creative Suite') },
        { name: "Sales Enablement", tools: tools.filter(t => t.mindMapCategory === 'Sales Enablement') },
        { name: "Core Intelligence", tools: tools.filter(t => t.mindMapCategory === 'Core Intelligence') },
    ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center justify-start">
         <div className="relative text-center mb-16 mt-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute inset-0 flex items-center justify-center -z-10"
            >
                 <div className="relative h-24 w-full flex items-center justify-center">
                    <AnimatePresence>
                         <motion.span
                            key={currentLang}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                            className="absolute text-7xl font-bold text-foreground/5"
                        >
                            {languages[currentLang]}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            SX3 Services Mind Map
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            A visual overview of the powerful, interconnected tools in the Super Seller Suite.
          </p>
        </div>
        
        <div className="relative flex w-full flex-col justify-center items-center">
            <div className="w-full max-w-xs mb-16 z-10">
                 <MindMapNode title="Super Seller Suite" isRoot />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
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
            </div>
        </div>

        <section className="mt-24 w-full max-w-4xl">
             <div className="relative rounded-lg group p-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-primary">
                <Card className="bg-card/95 backdrop-blur-lg">
                    <Link href="/blog" className="block w-full h-full">
                        <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                            <div className="p-4 bg-primary/10 text-primary rounded-lg">
                                <BookOpen className="h-8 w-8" />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-bold font-heading text-foreground">The Super Seller Handbook</h3>
                                <p className="text-foreground/70">From a high-level view to a deep dive. Explore detailed guides and expert hacks for every tool.</p>
                            </div>
                            <div className="ml-auto">
                               <Button variant="ghost">
                                    Read Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </div>
                    </Link>
                </Card>
            </div>
        </section>

      </main>
      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      <LandingFooter />
    </div>
  );
}
