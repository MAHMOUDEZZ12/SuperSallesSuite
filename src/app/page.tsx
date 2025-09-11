
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { motion } from 'framer-motion';
import { MindMapNode, ToolLeaf } from '@/components/ui/mind-map-components';
import { tools, type Feature } from '@/lib/features';
import { FeatureModal } from '@/components/feature-modal';

function MindMapHome() {
  const [selectedTool, setSelectedTool] = React.useState<Omit<Feature, 'renderResult'> | null>(null);

  const getToolsForCategory = (category: Feature['mindMapCategory']) => {
    return tools.filter(t => t.mindMapCategory === category);
  };
  
  const marketingTools = getToolsForCategory('Marketing');
  const creativeTools = getToolsForCategory('Creative Suite');
  const salesTools = getToolsForCategory('Sales Enablement');
  const intelligenceTools = getToolsForCategory('Core Intelligence');
  const metaTools = getToolsForCategory('Meta Ads AI Suite');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
           <div className="relative flex flex-col items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.7, delay: 0.5 } }}>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
                  
                  {/* Meta Ads AI Suite */}
                  <MindMapNode title="Meta Ads AI Suite" className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      {metaTools.map(tool => (
                        <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                      ))}
                    </div>
                  </MindMapNode>
                  
                  {/* Creative Suite */}
                  <MindMapNode title="Creative Suite" className="lg:col-span-1">
                    <div className="grid grid-cols-1 gap-4 w-full">
                       {creativeTools.map(tool => (
                        <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                      ))}
                    </div>
                  </MindMapNode>

                   {/* Sales Enablement & Core Intelligence */}
                   <div className="lg:col-span-2 grid grid-cols-1 gap-8">
                     <MindMapNode title="Sales Enablement">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {salesTools.map(tool => (
                          <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedTool} />
                        ))}
                       </div>
                    </MindMapNode>

                     <MindMapNode title="Core Intelligence">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {intelligenceTools.map(tool => (
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


function SearchDxbHome() {
    // This component can be built out for the searchdxb.ai experience
    return (
        <div>
            <h1>Welcome to searchdxb.ai</h1>
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
        if (hostname.includes('selltoday.ai') || hostname.includes('localhost')) {
            setDomainComponent(<MindMapHome />);
        } else if (hostname.includes('searchdxb')) {
            setDomainComponent(<SearchDxbHome />);
        } else if (hostname.includes('video')) {
            setDomainComponent(<VideoHome />);
        } else if (hostname.includes('chat')) {
            setDomainComponent(<ChatHome />);
        } else {
            setDomainComponent(<MindMapHome />);
        }
    }, []);

    return (
       <div className="flex min-h-screen flex-col bg-background">
        <LandingHeader />
        {domainComponent}
        <LandingFooter />
       </div>
    );
}
