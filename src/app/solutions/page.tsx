
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Bot, Sparkles, Workflow, Puzzle } from 'lucide-react';
import { tools, type Feature } from '@/lib/features';
import { ToolLeaf } from '@/components/ui/mind-map-components';
import { FeatureModal } from '@/components/feature-modal';
import { motion } from 'framer-motion';

const solutionCategories: {
  title: string;
  category: 'AI Agent' | 'Flow' | 'App';
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    title: 'AI Agents',
    category: 'AI Agent',
    icon: <Bot />,
    description: 'Autonomous, analytical, and persona-driven tools that provide insights and analysis.',
  },
  {
    title: 'Flows',
    category: 'Flow',
    icon: <Workflow />,
    description: 'Automated, multi-step "Pilot" workflows that connect multiple tools to achieve complex goals.',
  },
  {
    title: 'Apps',
    category: 'App',
    icon: <Puzzle />,
    description: 'Creative and single-purpose generation tools for creating marketing assets and sales materials.',
  },
];

const getCategoryForTool = (toolId: string): 'AI Agent' | 'Flow' | 'App' => {
  if (['ai-video-presenter', 'lease-reviewer', 'price-estimator', 'market-reports', 'lead-investigator', 'crm-assistant', 'market-trends', 'evaluate-lead-as-buyer', 'analyze-content-quality'].includes(toolId)) return 'AI Agent';
  if (['meta-auto-pilot', 'lead-to-deal-pipeline', 'property-finder-sync', 'bayut-sync', 'creative-execution-terminal'].includes(toolId)) return 'Flow';
  return 'App';
};

export default function SolutionsPage() {
  const [selectedTool, setSelectedTool] = React.useState<Omit<
    Feature,
    'renderResult'
  > | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
        <PageHeader
          icon={<Sparkles />}
          title="The Solutions Universe"
          description="Explore our interconnected ecosystem of AI Agents, Automated Flows, and Creative Apps."
          className="mb-16"
        />

        <motion.div 
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {solutionCategories.map(cat => (
            <motion.div key={cat.title} variants={itemVariants}>
              <div className="relative p-8 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-xl shadow-primary/10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg w-fit text-white bg-primary">
                        {cat.icon}
                    </div>
                    <div>
                       <h2 className="text-3xl font-bold font-heading text-primary">{cat.title}</h2>
                       <p className="text-foreground/70">{cat.description}</p>
                    </div>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {tools
                    .filter(tool => getCategoryForTool(tool.id) === cat.category)
                    .map(tool => (
                      <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <FeatureModal feature={selectedTool} onClose={() => setSelectedTool(null)} />
      <LandingFooter />
    </div>
  );
}
