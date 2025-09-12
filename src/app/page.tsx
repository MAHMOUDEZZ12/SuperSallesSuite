

'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { motion } from 'framer-motion';
import { MindMapNode, ToolLeaf } from '@/components/ui/mind-map-components';
import { tools, type Feature } from '@/lib/features';
import { FeatureModal } from '@/components/feature-modal';
import MarketSearchInput from '@/components/ui/market-search-input';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User } from 'lucide-react';

function MindMapHome() {
  const [selectedTool, setSelectedTool] = React.useState<Omit<Feature, 'renderResult'> | null>(null);

  const getToolsForCategory = (category: Feature['mindMapCategory']) => {
    return tools.filter(t => t.mindMapCategory === category);
  };
  
  const archyTools = getToolsForCategory('Archy');
  const metaPilotTools = getToolsForCategory('Meta Pilot');
  const marketIntelTools = getToolsForCategory('Market Intelligence');
  const listingCrmTools = getToolsForCategory('Listing & CRM');
  const devTools = getToolsForCategory('Developer & Backend');


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
           <div className="relative flex flex-col items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.7, delay: 0.5 } }}>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
                  
                  {/* Archy (Creative) & Meta Pilot */}
                  <div className="lg:col-span-2 grid grid-cols-1 gap-8">
                     <MindMapNode title="Archy (Creative)">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                          {archyTools.map(tool => (
                            <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                          ))}
                        </div>
                     </MindMapNode>
                     <MindMapNode title="Meta Pilot (Campaigns)">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                          {metaPilotTools.map(tool => (
                            <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                          ))}
                        </div>
                     </MindMapNode>
                  </div>
                  
                  {/* Central Node placeholder could go here if needed */}
                  
                   {/* Market Intel, Listing/CRM, Dev Tools */}
                   <div className="lg:col-span-3 grid grid-cols-1 gap-8">
                     <MindMapNode title="Market Intelligence">
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {marketIntelTools.map(tool => (
                          <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                        ))}
                       </div>
                    </MindMapNode>
                     <MindMapNode title="Listing & CRM Tools">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {listingCrmTools.map(tool => (
                          <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                        ))}
                      </div>
                    </MindMapNode>
                     <MindMapNode title="Developer & Backend">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {devTools.map(tool => (
                          <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                        ))}
                      </div>
                    </MindMapNode>
                   </div>

                </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      <FeatureModal feature={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  );
}


function WhatsMAPHome() {
  // This component is the dedicated homepage for the whatsmap.ai experience
    return (
        <div className="flex min-h-screen flex-col market-library-bg text-white">
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4">
                <div className="flex items-center gap-6">
                    <Logo />
                </div>
                 <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-white rounded-full p-2">
                            <User />
                        </Button>
                    </Link>
                </div>
            </header>
            <main className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="text-center mb-8 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold font-heading tracking-tight mb-4 text-white">
                        WhatsMAP
                    </h1>
                     <p className="text-lg text-gray-400 mt-2">
                        Search or Ask anything about real EState.
                    </p>
                </div>
                <div className="w-full max-w-3xl">
                    <MarketSearchInput useSearchPage={true} />
                </div>
            </main>
        </div>
    );
}

function VideoHome() {
    // Component for videohome.ai
     return (
        <div>
            <h1>Welcome to videohome.ai</h1>
        </div>
    );
}

function ChatHome() {
     // Component for chathome.ai
     return (
        <div>
            <h1>Welcome to chathome.ai</h1>
        </div>
    );
}


export default function Home() {
    const [domainComponent, setDomainComponent] = React.useState<React.ReactNode>(null);

    React.useEffect(() => {
        const hostname = window.location.hostname;
        if (hostname.includes('selltoday.ai')) {
            setDomainComponent(
                <div className="flex min-h-screen flex-col bg-background">
                    <LandingHeader />
                    <MindMapHome />
                    <LandingFooter />
                </div>
            );
        } else if (hostname.includes('whatsmap') || hostname.includes('localhost')) {
            setDomainComponent(<WhatsMAPHome />);
        } else if (hostname.includes('video')) {
            setDomainComponent(<VideoHome />);
        } else if (hostname.includes('chat')) {
            setDomainComponent(<ChatHome />);
        } else {
             setDomainComponent(<WhatsMAPHome />);
        }
    }, []);

    return domainComponent;
}
