
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MindMapNode, ToolLeaf } from '@/components/ui/mind-map-components';
import { tools, type Feature } from '@/lib/features';
import { FeatureModal } from '@/components/feature-modal';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Puzzle } from 'lucide-react';

// New Categorization
const solutionCategories = {
  agents: ['ai-video-presenter', 'lease-reviewer', 'price-estimator', 'market-reports', 'lead-investigator', 'crm-assistant', 'market-trends', 'evaluate-lead-as-buyer', 'analyze-content-quality'],
  flows: ['meta-auto-pilot', 'lead-to-deal-pipeline', 'property-finder-sync', 'bayut-sync', 'creative-execution-terminal'],
  apps: ['insta-ads-designer', 'landing-pages', 'rebranding', 'audience-creator', 'youtube-video-editor', 'brochure-translator', 'ugc-script-writer', 'aerial-view-generator', 'payment-planner', 'listing-generator', 'instagram-content-creator', 'email-creator', 'investor-matching', 'offer-generator', 'whatsapp-campaigns', 'keyword-planner'],
};

export default function SolutionsPage() {
  const [selectedTool, setSelectedTool] = React.useState<Omit<
    Feature,
    'renderResult'
  > | null>(null);

  const getToolsForCategory = (category: keyof typeof solutionCategories) => {
    return tools.filter(t => solutionCategories[category].includes(t.id));
  };

  const agentTools = getToolsForCategory('agents');
  const flowTools = getToolsForCategory('flows');
  const appTools = getToolsForCategory('apps');

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
         <PageHeader
            icon={<Puzzle />}
            title="Solutions"
            description="The complete universe of AI-powered supertools, organized by capability."
            className="mb-16"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="space-y-16">
            <MindMapNode title="AI Agents" isRoot>
                <p className="text-center text-lg text-foreground/80 -mt-2 mb-6 max-w-2xl">Autonomous specialists that analyze, reason, and perform complex tasks on your behalf.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                    {agentTools.map(tool => <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />)}
                </div>
            </MindMapNode>
             <MindMapNode title="Flows" isRoot>
                 <p className="text-center text-lg text-foreground/80 -mt-2 mb-6 max-w-2xl">Automated, multi-step workflows that connect multiple tools to achieve complex goals with a single command.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                    {flowTools.map(tool => <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />)}
                </div>
            </MindMapNode>
             <MindMapNode title="Apps" isRoot>
                 <p className="text-center text-lg text-foreground/80 -mt-2 mb-6 max-w-2xl">Creative and utility applications for generating marketing assets, managing listings, and enabling sales.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                    {appTools.map(tool => <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />)}
                </div>
            </MindMapNode>
          </div>
        </motion.div>
      </main>
      <FeatureModal feature={selectedTool} onClose={() => setSelectedTool(null)} />
      <LandingFooter />
    </div>
  );
}
