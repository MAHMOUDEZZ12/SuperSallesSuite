
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


// --- The main routing component ---
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <MindMapHome />
      <LandingFooter />
    </div>
  );
}
