
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Wallet } from 'lucide-react';
import { tools } from '@/lib/features';
import { FeatureCard } from '@/components/ui/feature-card';
import { FeatureModal } from '@/components/feature-modal';

// Tools curated for Investors
const investorToolIds = [
    'price-estimator',
    'market-trends',
    'investor-matching',
    'lease-reviewer',
    'market-reports',
    'offer-generator',
    'projects-finder',
    'lead-to-deal-pipeline'
];

const investorTools = tools.filter(t => investorToolIds.includes(t.id));


export default function InvestorSolutionsPage() {
    const [selectedTool, setSelectedTool] = React.useState<any>(null);
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
                <PageHeader
                icon={<Wallet />}
                title="Solutions for Investors"
                description="Gain an unfair advantage with AI-powered analysis. Find off-market deals, verify valuations, and track market trends automatically."
                className="mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {investorTools.map(tool => (
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
