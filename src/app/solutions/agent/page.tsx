
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { User, Sparkles } from 'lucide-react';
import { tools } from '@/lib/features';
import { FeatureCard } from '@/components/ui/feature-card';
import { FeatureModal } from '@/components/feature-modal';

// Tools curated for Agents
const agentToolIds = [
    'meta-ads-copilot',
    'audience-creator',
    'lead-investigator',
    'listing-manager',
    'rebranding',
    'instagram-content-creator',
    'ai-video-presenter',
    'listing-performance'
];

const agentTools = tools.filter(t => agentToolIds.includes(t.id));


export default function AgentSolutionsPage() {
    const [selectedTool, setSelectedTool] = React.useState<any>(null);
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
                <PageHeader
                icon={<User />}
                title="Solutions for Agents"
                description="Your AI-powered toolkit to automate marketing, generate high-quality leads, and close deals faster than ever before."
                className="mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {agentTools.map(tool => (
                         <div key={tool.id} onClick={() => setSelectedTool(tool)}>
                            <FeatureCard tool={tool} />
                        </div>
                    ))}
                </div>
            </main>
             <FeatureModal feature={selectedTool} onClose={() => setSelectedTool(null)} />
            <LandingFooter />
        </div>
    );
}
