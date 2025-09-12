'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Briefcase, Sparkles } from 'lucide-react';
import { tools, type Feature } from '@/lib/features';
import { ToolLeaf } from '@/components/ui/mind-map-components';
import { FeatureModal } from '@/components/feature-modal';
import { MindMapNode } from '@/components/ui/mind-map-components';

const agentToolIds = [
    'lead-investigator',
    'listing-manager',
    'listing-performance',
    'rebranding',
    'meta-ads-copilot',
    'audience-creator',
    'email-creator',
    'whatsapp-campaigns',
    'crm-assistant',
    'price-estimator'
];

const agentTools = tools.filter(t => agentToolIds.includes(t.id));


export default function AgentSolutionsPage() {
    const [selectedTool, setSelectedTool] = React.useState<Omit<
    Feature,
    'renderResult'
  > | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
         <PageHeader
            icon={<Briefcase />}
            title="Solutions for Real Estate Agents"
            description="A complete toolkit to automate marketing, manage leads, and close more deals."
            className="mb-16"
        />
        <div className="space-y-16">
            <MindMapNode title="Agent Growth Engine" isRoot>
                <p className="text-center text-lg text-foreground/80 -mt-2 mb-6 max-w-2xl">Generate leads, nurture relationships, and streamline your entire sales process with these AI-powered tools.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                    {agentTools.map(tool => <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />)}
                </div>
            </MindMapNode>
        </div>
      </main>
      <FeatureModal feature={selectedTool} onClose={() => setSelectedTool(null)} />
      <LandingFooter />
    </div>
  );
}
