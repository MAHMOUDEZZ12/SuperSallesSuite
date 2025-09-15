
'use client';
import { PageHeader } from "@/components/ui/page-header";
import { allMappedTools } from "@/lib/features";
import { FeatureCard } from "@/components/ui/feature-card";
import { TrendingUp, Check } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const investorTools = allMappedTools.filter(tool => tool && tool.personas.includes('investor'));

export default function InvestorSolutionsPage() {
    return (
        <div className="bg-background">
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6 text-center">
                    <div className="mx-auto w-fit p-4 bg-primary/10 text-primary rounded-full mb-6">
                        <TrendingUp className="h-10 w-10" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight">
                        Find High-ROI Deals <br/> Before Anyone Else.
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-6">
                        Leverage predictive analytics and exclusive off-market data to build a more profitable real estate portfolio. WhatsMAP is your institutional-grade research terminal.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" asChild>
                            <Link href="/signup">Request a Demo</Link>
                        </Button>
                    </div>
                </div>
            </section>

             <section className="container mx-auto px-6 py-24 space-y-20">
                 <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h3 className="text-3xl font-bold font-heading mb-4">Tired of Competing for Overpriced Listings?</h3>
                        <p className="text-muted-foreground mb-6">Our proprietary algorithm identifies properties likely to sell before they hit the market. Get first-mover advantage and negotiate better terms with AI-powered off-market discovery.</p>
                         <ul className="space-y-2">
                           <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Access Exclusive Off-Market Deals</span></li>
                           <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Analyze Seller Motivation & Urgency</span></li>
                        </ul>
                    </div>
                    <div className="p-4 bg-muted/40 border border-border/50 rounded-xl">
                        <Image src="https://picsum.photos/seed/investor-pain1/600/400" alt="Off-Market Deals" width={600} height={400} className="rounded-lg" data-ai-hint="map data" />
                    </div>
                </div>
                 <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="md:order-2">
                        <h3 className="text-3xl font-bold font-heading mb-4">Uncertain About Your Numbers?</h3>
                        <p className="text-muted-foreground mb-6">Analyze any property in seconds. Our platform automatically calculates potential rental income, operating expenses, cash flow, and long-term ROI based on hyper-local data.</p>
                        <ul className="space-y-2">
                           <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Instant Deal Proformas & ROI Projections</span></li>
                           <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Compare Multiple Investment Scenarios</span></li>
                        </ul>
                    </div>
                    <div className="p-4 bg-muted/40 border border-border/50 rounded-xl md:order-1">
                         <Image src="https://picsum.photos/seed/investor-pain2/600/400" alt="Financial Projections" width={600} height={400} className="rounded-lg" data-ai-hint="financial charts" />
                    </div>
                </div>
            </section>
            
            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold font-heading mb-10">Your Investor Tool Suite</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {investorTools.map(tool => tool && (
                             <FeatureCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
