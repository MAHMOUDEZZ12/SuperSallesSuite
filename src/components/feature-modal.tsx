
'use client';

import React from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { IconMap } from '@/components/ui/icon-map';
import { Plus, ArrowRight, Sparkles } from 'lucide-react';
import { Feature } from '@/lib/features';

const solutionCategories: { [key: string]: string } = {
  ai_agents: 'AI Agent',
  flows: 'Flow',
  apps: 'App',
};

const getCategoryForTool = (toolId: string): string => {
    if (['ai-video-presenter', 'lease-reviewer', 'price-estimator', 'market-reports', 'lead-investigator', 'crm-assistant', 'market-trends', 'evaluate-lead-as-buyer', 'analyze-content-quality'].includes(toolId)) return 'AI Agent';
    if (['meta-auto-pilot', 'lead-to-deal-pipeline', 'property-finder-sync', 'bayut-sync', 'creative-execution-terminal'].includes(toolId)) return 'Flow';
    return 'App';
}


export const FeatureModal = ({ feature, onClose }: { feature: Omit<Feature, 'renderResult'> | null, onClose: () => void }) => {
  if (!feature) return null;
  const Icon = IconMap[feature.icon as keyof typeof IconMap] || Sparkles;
  const categoryLabel = getCategoryForTool(feature.id);

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
                      <p className="font-semibold text-white/80">{categoryLabel}</p>
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
                <Link href={feature.isPage ? `/dashboard/tool/${feature.id}` : `/dashboard/tool/${feature.id}`}>
                    <Button variant="outline" size="lg" className='text-base'>
                      {feature.cta} <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                </Link>
            </div>
            
          </div>
      </DialogContent>
    </Dialog>
  );
}
