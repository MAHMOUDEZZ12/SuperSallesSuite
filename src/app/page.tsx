

'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { motion } from 'framer-motion';
import { MindMapNode, ToolLeaf } from '@/components/ui/mind-map-components';
import { tools, type Feature } from '@/lib/features';
import { FeatureModal } from '@/components/feature-modal';
import Link from 'next/link';
import { User } from 'lucide-react';

// THIS IS THE MAIN GATE FOR THE `selltoday.ai` domain.
// It serves the "mind map" of supertools.
// The main `whatsmap.ai` landing page can be built as a separate component/page
// and conditionally rendered here or handled via middleware in a real app.

export default function HomePage() {
  const [selectedTool, setSelectedTool] = React.useState<Omit<Feature, 'renderResult'> | null>(null);

  const getToolsForCategory = (category: Feature['mindMapCategory']) => {
    return tools.filter(t => t.mindMapCategory === category);
  };
  
  const archyTools = getToolsForCategory('Archy');
  const metaPilotTools = getToolsForCategory('Meta Pilot');
  const marketIntelTools = getToolsForCategory('Market Intelligence');
  const listingCrmTools = getToolsForCategory('Listing & CRM');
  const devTools = getToolsForCategory('Developer & Backend');
  const ebramTools = getToolsForCategory('EBRAM');


  return (
    <div className="flex flex-col min-h-screen">
       <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
           <div className="relative flex flex-col items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.7, delay: 0.5 } }}>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
                  
                  <div className="lg:col-span-2 grid grid-cols-1 gap-8">
                     <MindMapNode title="Archy (Creative Marketing)">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                          {archyTools.map(tool => (
                            <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                          ))}
                        </div>
                     </MindMapNode>
                     <MindMapNode title="Meta Pilot (Campaign Automation)">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                          {metaPilotTools.map(tool => (
                            <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                          ))}
                        </div>
                     </MindMapNode>
                  </div>
                  
                   <div className="lg:col-span-3 grid grid-cols-1 gap-8">
                     <MindMapNode title="Market Intelligence Tools">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <MindMapNode title="Developer & Backend Tools">
                            <div className="grid grid-cols-1 gap-4 w-full">
                                {devTools.map(tool => (
                                <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                                ))}
                            </div>
                        </MindMapNode>
                         <MindMapNode title="EBRAM (Legal AI)">
                            <div className="grid grid-cols-1 gap-4 w-full">
                                {ebramTools.map(tool => (
                                <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                                ))}
                            </div>
                        </MindMapNode>
                    </div>
                   </div>

                </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      <FeatureModal feature={selectedTool} onClose={() => setSelectedTool(null)} />
       <LandingFooter />
    </div>
  );
}
