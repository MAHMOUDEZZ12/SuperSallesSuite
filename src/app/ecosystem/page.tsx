
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, BrainCircuit, Rocket, ShieldCheck, Users, GitBranch, Share2, Workflow } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Separator } from '@/components/ui/separator';

const pillars = [
  {
    name: 'Pillar 1: The Intelligent Data Foundation',
    description: 'The bedrock of WhatsMAP\'s intelligence. This involves ingesting data from numerous sources, storing it in optimized databases like Google Cloud Storage, BigQuery, and Neo4j, and then creating high-dimensional vector embeddings for advanced semantic search and retrieval via Vertex AI.',
    icon: <Database className="h-8 w-8" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20'
  },
  {
    name: 'Pillar 2: The Core AI Intelligence Layer',
    description: 'This is where Gemini and our intelligent agents come alive. Using a robust RAG pattern, specialized agents (like EBRAM for legal and Archy for marketing) perform complex reasoning, content generation, and task orchestration, communicating via a Pub/Sub messaging layer.',
    icon: <BrainCircuit className="h-8 w-8" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20'
  },
  {
    name: 'Pillar 3: The Action & Delivery Layer',
    description: 'Bringing WhatsMAP\'s intelligence to the user. This layer handles all user-facing experiences, from web and mobile apps built with Firebase to external integrations with APIs like Meta. It ensures a seamless, secure, and intuitive experience across all devices.',
    icon: <Rocket className="h-8 w-8" />,
    color: 'text-green-400',
    bgColor: 'bg-green-900/20'
  },
  {
    name: 'Pillar 4: Operational Excellence',
    description: 'Ensuring the platform runs reliably and securely. This includes centralized logging, real-time performance monitoring, robust IAM security controls, data partitioning for sovereignty, and cost optimization strategies. A CI/CD pipeline ensures consistent and safe deployments.',
    icon: <ShieldCheck className="h-8 w-8" />,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20'
  },
   {
    name: 'Pillar 5: User Management & Application Quality',
    description: 'Focusing on the end-user journey and app health. Firebase Authentication provides secure identity management, while tools like Crashlytics and Performance Monitoring give us real-time insights into application stability and speed, ensuring a high-quality experience.',
    icon: <Users className="h-8 w-8" />,
    color: 'text-pink-400',
    bgColor: 'bg-pink-900/20'
  },
];

export default function EcosystemPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
         <PageHeader 
            icon={<GitBranch className="h-8 w-8" />}
            title="Ecosystem Blueprint"
            description="The complete technical and strategic vision for the WhatsMAP platform."
        />

        <section className="my-16 space-y-8">
            {pillars.map((pillar) => (
              <Card key={pillar.name} className="bg-card/50 backdrop-blur-lg border-primary/10">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className={`p-3 rounded-lg w-fit ${pillar.bgColor} ${pillar.color}`}>
                    {pillar.icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{pillar.name}</CardTitle>
                    <p className="text-foreground/80 mt-2">{pillar.description}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
        </section>

         <Separator className="my-16" />

         <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Data & Interaction Flow</h2>
            <Card className="bg-card/50">
                <CardContent className="p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <div className="p-3 bg-primary/10 text-primary rounded-lg"><Share2 className="h-6 w-6"/></div>
                        <div>
                            <h3 className="text-xl font-semibold">Shared Intelligence</h3>
                            <p className="text-muted-foreground">All orbiting modules feed insights back to the central WhatsMAP brain, creating a continuously learning and optimizing system.</p>
                        </div>
                    </div>
                     <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <div className="p-3 bg-primary/10 text-primary rounded-lg"><Workflow className="h-6 w-6"/></div>
                        <div>
                            <h3 className="text-xl font-semibold">Command & Execution</h3>
                            <p className="text-muted-foreground">WhatsMAP orchestrates the specialized agents based on user queries or business goals, ensuring the right tool is used for the right job.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
         </section>

      </main>
      <LandingFooter />
    </div>
  );
}
