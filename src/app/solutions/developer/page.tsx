'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Building, Sparkles } from 'lucide-react';
import { tools, type Feature } from '@/lib/features';
import { ToolLeaf } from '@/components/ui/mind-map-components';
import { FeatureModal } from '@/components/feature-modal';
import { MindMapNode } from '@/components/ui/mind-map-components';

const developerToolIds = [
    'insta-ads-designer',
    'landing-pages',
    'brochure-translator',
    'meta-ads-copilot',
    'market-reports',
    'payment-planner'
];

const developerTools = tools.filter(t => developerToolIds.includes(t.id));


export default function DeveloperSolutionsPage() {
    const [selectedTool, setSelectedTool] = React.useState<Omit<
    Feature,
    'renderResult'
  > | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
         <PageHeader
            icon={<Building />}
            title="Solutions for Developers"
            description="A suite of tools designed to accelerate your project marketing, from pre-launch to final sale."
            className="mb-16"
        />
        <div className="space-y-16">
            <MindMapNode title="Project Marketing & Sales Toolkit" isRoot>
                <p className="text-center text-lg text-foreground/80 -mt-2 mb-6 max-w-2xl">Tools to generate marketing assets, launch campaigns, and create compelling sales materials.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                    {developerTools.map(tool => <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />)}
                </div>
            </MindMapNode>
        </div>
      </main>
      <FeatureModal feature={selectedTool} onClose={() => setSelectedTool(null)} />
      <LandingFooter />
    </div>
  );
}
