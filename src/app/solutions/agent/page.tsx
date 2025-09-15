
'use client';
import { PageHeader } from "@/components/ui/page-header";
import { allMappedTools } from "@/lib/features";
import { FeatureCard } from "@/components/ui/feature-card";
import { Briefcase, Check } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const agentTools = allMappedTools.filter(tool => tool && tool.personas.includes('agent'));

export default function AgentSolutionsPage() {
    return (
        <div className="bg-background">
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6 text-center">
                    <div className="mx-auto w-fit p-4 bg-primary/10 text-primary rounded-full mb-6">
                        <Briefcase className="h-10 w-10" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight">
                        Stop Searching For Leads. <br /> Let Them Find You.
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-6">
                        WhatsMAP is the all-in-one real estate intelligence platform that gives elite agents an unfair advantage. Automate your marketing pipeline, close more deals, and become a market authority.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" asChild>
                            <Link href="/signup">Get Your AI Co-Pilot</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-24 space-y-20">
                 <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h3 className="text-3xl font-bold font-heading mb-4">Wasting Hours on Cold Leads?</h3>
                        <p className="text-muted-foreground mb-6">Our AI analyzes thousands of data points to identify which leads are ready to transact. Stop chasing dead ends and focus your energy on clients who are ready to move.</p>
                        <ul className="space-y-2">
                           <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>AI-Powered Lead Scoring & Prioritization</span></li>
                           <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Automated Nurture & Follow-up Sequences</span></li>
                        </ul>
                    </div>
                    <div className="p-4 bg-muted/40 border border-border/50 rounded-xl">
                        <Image src="https://picsum.photos/seed/agent-pain1/600/400" alt="AI Lead Scoring" width={600} height={400} className="rounded-lg" data-ai-hint="data charts" />
                    </div>
                </div>
                 <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="md:order-2">
                        <h3 className="text-3xl font-bold font-heading mb-4">Struggling to Create Compelling Reports?</h3>
                        <p className="text-muted-foreground mb-6">Impress clients with beautiful, data-rich Comparative Market Analysis (CMA) and neighborhood reports in seconds. Our platform pulls real-time data to position you as the market expert.</p>
                         <ul className="space-y-2">
                           <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Instant, Branded CMA Generation</span></li>
                           <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Hyper-Local Market Trend Analysis</span></li>
                        </ul>
                    </div>
                    <div className="p-4 bg-muted/40 border border-border/50 rounded-xl md:order-1">
                        <Image src="https://picsum.photos/seed/agent-pain2/600/400" alt="Market Reports" width={600} height={400} className="rounded-lg" data-ai-hint="professional report" />
                    </div>
                </div>
            </section>
            
            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold font-heading mb-10">Your Curated Tool Suite</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {agentTools.map(tool => tool && (
                             <FeatureCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
