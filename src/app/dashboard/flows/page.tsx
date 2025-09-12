
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Workflow, Star } from 'lucide-react';
import { tools } from '@/lib/features';
import { ConnectedAppCard } from '@/components/ui/connected-app-card';

const flowTools = tools.filter(t => t.categories.includes('Flows'));

export default function FlowsPage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Flows"
        description="Automated, multi-step workflows that act as your specialized AI agents, connecting multiple tools to achieve complex goals."
        icon={<Workflow className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flowTools.map(tool => (
            <ConnectedAppCard
                key={tool.id}
                title={tool.title}
                description={tool.description}
                icon={<Star />}
                href={tool.href}
                ctaText="Go to Pilot"
            />
        ))}
      </div>
    </main>
  );
}
