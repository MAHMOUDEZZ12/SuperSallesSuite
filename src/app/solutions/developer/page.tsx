
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Building } from 'lucide-react';
import { tools } from '@/lib/features';
import { FeatureCard } from '@/components/ui/feature-card';
import { FeatureModal } from '@/components/feature-modal';

// Tools curated for Developers
const developerToolIds = [
    'landing-pages',
    'payment-planner',
    'insta-ads-designer',
    'market-reports',
    'aerial-view-generator',
    'brochure-translator',
    'ai-brand-creator',
    'rebranding'
];

const developerTools = tools.filter(t => developerToolIds.includes(t.id));


export default function DeveloperSolutionsPage() {
    const [selectedTool, setSelectedTool] = React.useState<any>(null);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
                <PageHeader
                icon={<Building />}
                title="Solutions for Developers"
                description="Launch projects with maximum impact and efficiency. Generate complete marketing suites and manage sales with AI."
                className="mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {developerTools.map(tool => (
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
