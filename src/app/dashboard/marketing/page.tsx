
'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Puzzle, Star, BarChart } from 'lucide-react';
import { type Feature } from '@/lib/tools-client';
import { tools } from '@/lib/features';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';
import { Separator } from '@/components/ui/separator';

// Explicitly define which tools are for which suite or category
const toolCategories: { title: string; category: Feature['mindMapCategory'], icon?: React.ReactNode }[] = [
    { title: 'Meta Ads AI Suite', category: 'Meta Ads AI Suite', icon: <Star className="h-6 w-6 text-amber-400"/> },
    { title: 'Listing Intelligence AI', category: 'Listing Intelligence AI', icon: <BarChart className="h-6 w-6 text-blue-500"/> },
    { title: 'Creative Suite', category: 'Creative Suite' },
    { title: 'Sales Enablement', category: 'Sales Enablement' },
    { title: 'Core Intelligence', category: 'Core Intelligence' },
];

const appsThatNeedConnection: { [key: string]: string } = {
    'meta-ads-copilot': 'Facebook',
    'audience-creator': 'Facebook',
    'insta-ads-designer': 'Instagram',
    'instagram-admin-ai': 'Instagram',
    'email-creator': 'Gmail / Outlook',
    'whatsapp-campaigns': 'WhatsApp Business',
    'facebook-ads-ai': 'Facebook',
    'reel-ads-ai': 'Instagram',
    'story-planner-ai': 'Instagram'
};

const appsThatNeedPayment: string[] = [
    'rebranding',
    'pdf-editor',
    'landing-pages',
    'investor-matching',
    'market-reports',
    'market-trends'
];

export default function MarketingDashboardPage() {
  const [addedApps, setAddedApps] = useState<string[]>([]);

  useEffect(() => {
    // Load added apps from localStorage on component mount
    const savedApps = JSON.parse(localStorage.getItem('addedApps') || '[]');
    setAddedApps(savedApps);
  }, []);

  const handleSetIsAdded = (toolId: string, isAdded: boolean) => {
    let updatedApps: string[];
    if (isAdded) {
        updatedApps = [...addedApps, toolId];
    } else {
        updatedApps = addedApps.filter(id => id !== toolId);
    }
    setAddedApps(updatedApps);
    localStorage.setItem('addedApps', JSON.stringify(updatedApps));
  }
  
  const getToolsForCategory = (category: Feature['mindMapCategory']) => {
    return tools.filter(t => t.mindMapCategory === category && t.id !== 'ai-assistant');
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Apps"
        description="Your command center for all AI-powered applications. Add apps to your workspace to get started."
        icon={<Puzzle className="h-8 w-8" />}
      />

      <div className="space-y-12">
        {toolCategories.map(cat => {
            const categoryTools = getToolsForCategory(cat.category);
            if(categoryTools.length === 0) return null;

            return (
                <section key={cat.category}>
                    <div className="flex items-center gap-3 mb-6">
                        {cat.icon}
                        <h2 className="text-2xl font-bold font-heading tracking-tight">{cat.title}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categoryTools.map(tool => (
                            <DashboardServiceCard 
                                key={tool.id}
                                tool={tool}
                                isAdded={addedApps.includes(tool.id)}
                                setIsAdded={(isAdded) => handleSetIsAdded(tool.id, isAdded)}
                                connectionRequired={appsThatNeedConnection[tool.id]}
                                paymentRequired={appsThatNeedPayment.includes(tool.id)}
                            />
                        ))}
                    </div>
                </section>
            );
        })}
      </div>
    </main>
  );
}
