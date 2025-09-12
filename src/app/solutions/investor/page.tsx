'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { LineChart, Sparkles } from 'lucide-react';
import { tools, type Feature } from '@/lib/features';
import { ToolLeaf } from '@/components/ui/mind-map-components';
import { FeatureModal } from '@/components/feature-modal';
import { MindMapNode } from '@/components/ui/mind-map-components';

const investorToolIds = [
    'market-reports',
    'market-trends',
    'price-estimator',
    'investor-matching',
    'lease-reviewer',
    'offer-generator'
];

const investorTools = tools.filter(t => investorToolIds.includes(t.id));


export default function InvestorSolutionsPage() {
    const [selectedTool, setSelectedTool] = React.useState<Omit<
    Feature,
    'renderResult'
  > | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
         <PageHeader
            icon={<LineChart />}
            title="Solutions for Investors"
            description="Data-driven tools to find, analyze, and secure your next real estate investment."
            className="mb-16"
        />
        <div className="space-y-16">
            <MindMapNode title="Investment Analysis Suite" isRoot>
                <p className="text-center text-lg text-foreground/80 -mt-2 mb-6 max-w-2xl">From market-level trend analysis to property-specific price estimation, make your decisions with confidence.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                    {investorTools.map(tool => <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />)}
                </div>
            </MindMapNode>
        </div>
      </main>
      <FeatureModal feature={selectedTool} onClose={() => setSelectedTool(null)} />
      <LandingFooter />
    </div>
  );
}
