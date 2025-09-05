
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Link as LinkIcon, ArrowRight, Target, Palette, Share2, LineChart, PenTool, LayoutTemplate, Bot } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { tools as allTools, Feature } from '@/lib/tools-client';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const toolCards = [
    { id: 'ad-creation', title: 'Ad Snap', description: 'Create ads from any brochure.' },
    { id: 'rebranding', title: 'One-Tap Rebrand', description: 'Swap logo, colors, contacts.' },
    { id: 'social-posts', title: 'Social Posts Week', description: 'One link → seven posts.' },
    { id: 'market-reports', title: 'Market Scan', description: 'Hyper-local insights in seconds.' },
    { id: 'landing-pages', title: 'Instant Landing Page', description: 'From brochure to live link.' },
    { id: 'pdf-editor', title: 'Smart PDF Editor', description: 'Edit text, images, layout with AI.' },
    { id: 'page-admin', title: 'AI Page Admin', description: 'Schedule posts, handle replies.' },
    { id: 'crm-assistant', title: 'CRM Memory', description: 'Never forget a client detail.' },
    { id: 'lead-generation', title: 'AI Social Leads', description: 'Find buyers before they search.' },
    { id: 'email-creator', title: 'AI Email Campaigns', description: 'Write and send engaging emails.' },
    { id: 'investor-matching', title: 'Investor Fit', description: 'Match budgets to projects.' },
    { id: 'offer-generator', title: 'Multi-Offer Builder', description: 'Compare packages side by side.' },
];

const assistantPrompts = [
    "Draft a WhatsApp reply from this brochure.",
    "Create a 3-tile story for Azure Lofts.",
    "Summarize Q3 trends for Dubai Marina.",
]

export default function DashboardPage() {
    const [selectedFeature, setSelectedFeature] = React.useState<Feature | null>(null);

    const handleCardClick = (toolId: string) => {
        const feature = allTools.find(t => t.id === toolId);
        if (feature) {
            setSelectedFeature(feature);
        }
    };
  
    return (
        <main className="flex-1 flex-col p-4 md:p-10 space-y-8">
            <PageHeader
                title="Welcome to the Super Seller Suite!"
                description="Get started by exploring some of our most powerful AI tools below."
                icon={<PlusCircle className="h-8 w-8" />}
            />

            <div>
                <h3 className="text-2xl font-bold font-heading tracking-tight mb-4">
                    Ready to create?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {toolCards.map(tool => (
                        <Card 
                            key={tool.id} 
                            onClick={() => handleCardClick(tool.id)}
                            className="group hover:border-primary/30 transition-colors hover:bg-card/80 cursor-pointer"
                        >
                             <CardHeader>
                                <CardTitle className='font-heading'>{tool.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-muted-foreground'>{tool.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

             <div>
                <h3 className="text-2xl font-bold font-heading tracking-tight mb-4">
                    Your AI Sales Partner
                </h3>
                <Card>
                     <CardHeader>
                        <CardTitle className='flex items-center gap-4'>
                            <div className='p-3 bg-primary/10 text-primary rounded-lg'>
                               <Bot className='h-6 w-6' />
                            </div>
                           <span className='font-heading'>Your AI Sales Partner</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
                       <div className="space-y-2">
                        {assistantPrompts.map(prompt => (
                             <div key={prompt} className="flex items-center gap-2 p-2 rounded-md bg-muted/50 w-fit">
                                <p className="text-sm text-muted-foreground italic">"{prompt}"</p>
                            </div>
                        ))}
                       </div>
                        <Button variant="outline" size="lg">Open Assistant</Button>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h3 className="text-2xl font-bold font-heading tracking-tight mb-4">
                    Power On Automations
                </h3>
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-4'>
                            <div className='p-3 bg-primary/10 text-primary rounded-lg'>
                               <Share2 className='h-6 w-6' />
                            </div>
                           <span className='font-heading'>Connect Your Accounts</span>
                        </CardTitle>
                        <CardDescription>
                           Connect socials and email to schedule posts, sync leads, and run campaigns automatically.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/dashboard/settings?tab=connections">
                            <Button>
                                <LinkIcon className="mr-2 h-4 w-4" />
                                Connect Now
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
            
        </main>
    );
}

