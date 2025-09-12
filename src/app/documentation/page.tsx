

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, GitBranch, Cpu, Component, Wind, BrainCircuit, Network, Sparkles } from 'lucide-react';
import { tools } from '@/lib/features';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/code-block';
import { PageHeader } from '@/components/ui/page-header';
import { IconMap } from '@/components/ui/icon-map';
import Link from 'next/link';


const technologies = [
  {
    name: 'Next.js',
    description: 'The application is built using the Next.js App Router for optimal performance, server-side rendering, and a modern React framework.',
    icon: <Component className="h-8 w-8" />,
  },
  {
    name: 'Tailwind CSS & ShadCN UI',
    description: 'Styling is handled by Tailwind CSS for utility-first design, with a component library built on top of ShadCN UI for a consistent and professional look and feel. The app is fully themable via CSS variables, offering several curated themes including Light, Dark, and Pink/Purple.',
    icon: <Wind className="h-8 w-8" />,
  },
  {
    name: 'Genkit & Google AI',
    description: 'All AI capabilities are powered by Genkit, an open-source framework from Google that simplifies building production-ready AI flows, integrated with Gemini models.',
    icon: <BrainCircuit className="h-8 w-8" />,
  },
];

const SchemaDisplay = ({ schema }: { schema: any }) => {
    if (!schema) {
        return <CodeBlock>{`// No schema defined for this tool.`}</CodeBlock>;
    }
    const fields = Object.entries(schema.shape).map(([key, value]: [string, any]) => {
        let type = 'string';
        if (value.constructor.name.includes('ZodNumber')) type = 'number';
        if (value.constructor.name.includes('ZodArray')) type = 'array';
        if (value.constructor.name.includes('ZodObject')) type = 'object';
        if (value._def.typeName === 'ZodEffects') { // for refine, etc.
             if(value._def.schema._def.typeName === 'ZodCustom') type = 'file';
        }
       
        return `  ${key}: ${type}${value.isOptional() ? '?' : ''}; // ${value.description || ''}`;
    }).join('\n');

    return <CodeBlock>{`{\n${fields}\n}`}</CodeBlock>
};


export default function DocumentationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
         <PageHeader 
            icon={<GitBranch className="h-8 w-8" />}
            title="Suite Documentation"
            description="A technical overview of the technologies and AI flows that power WhatsMAP. For the full strategic vision, see our Ecosystem Blueprint."
        >
             <Link href="/ecosystem">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">View Blueprint</button>
            </Link>
        </PageHeader>

        <section className="my-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech) => (
              <Card key={tech.name} className="bg-card/50 backdrop-blur-lg border-primary/10">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">{tech.icon}</div>
                  <CardTitle className="text-2xl">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">AI Flows & Features</h2>
          <div className="space-y-12">
            {tools.map((tool) => {
              const Icon = IconMap[tool.icon as keyof typeof IconMap] || Sparkles;
              // Schemas would need to be imported or passed in a different way
              // For now, this will render without schemas
              const inputSchema = undefined;
              const outputSchema = undefined;

              return (
              <Card key={tool.id} className="bg-card/50 backdrop-blur-lg border-primary/10 overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Icon />
                    {tool.id}
                  </CardTitle>
                  <p className="text-foreground/70 pt-2">{tool.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2 text-foreground/90">Input Schema</h3>
                        <SchemaDisplay schema={inputSchema} />
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg mb-2 text-foreground/90">Output Schema</h3>
                        <SchemaDisplay schema={outputSchema} />
                    </div>
                </CardContent>
              </Card>
            )})}
          </div>
        </section>

        <section className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Connections & Integrations</h2>
            <Card className="bg-card/50 backdrop-blur-lg border-primary/10 overflow-hidden">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                        <Network />
                        External Service Connections
                    </CardTitle>
                    <p className="text-foreground/70 pt-2">
                        WhatsMAP connects to various external services to automate your workflow. Here's how they work.
                    </p>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg dark:prose-invert max-w-none">
                    <h3>Authentication-Based Connections (OAuth)</h3>
                    <p>
                        For services like <strong>Meta (Facebook & Instagram)</strong> and <strong>Google (Gmail & YouTube)</strong>, we use OAuth 2.0. This is the industry standard for secure authorization. When you connect these accounts, you will be redirected to their official login page. You grant our application specific, limited permissions (e.g., "post on my behalf" or "read my DMs"). We never see or store your password. This method is highly secure and gives you full control to revoke access at any time from your Google or Facebook account settings.
                    </p>
                    
                    <h3>API Key-Based Connections</h3>
                    <p>
                        For some specialized services, you may need to provide an API key. An API key is a unique string of characters that you get from the service provider, which you then save in your WhatsMAP settings.
                    </p>
                     <ul>
                        <li><strong>Google AI (Gemini):</strong> To power all AI features, the application requires a <code>GEMINI_API_KEY</code>. You obtain this from Google AI Studio and set it up once in your local environment file or server configuration.</li>
                        <li><strong>Future Integrations (e.g., Google Ads):</strong> Advanced tools like the upcoming "Gemini for Google Ads" co-expert will likely require you to generate an API key from your Google Ads account and provide it to the suite.</li>
                    </ul>
                    <p>
                        We securely encrypt and store all API keys you provide. This method is used when a direct user-based authentication flow like OAuth is not suitable for the type of integration.
                    </p>
                </CardContent>
            </Card>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
