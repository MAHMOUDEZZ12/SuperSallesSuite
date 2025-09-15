
'use client';
import { PageHeader } from "@/components/ui/page-header";
import { allMappedTools } from "@/lib/features";
import { FeatureCard } from "@/components/ui/feature-card";
import { Building, Check } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const devTools = allMappedTools.filter(tool => tool && tool.personas.includes('developer'));

export default function DeveloperSolutionsPage() {
    return (
        <div className="bg-background">
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6 text-center">
                    <div className="mx-auto w-fit p-4 bg-primary/10 text-primary rounded-full mb-6">
                        <Building className="h-10 w-10" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight">
                        From Blueprint to Sell-Out, Faster.
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-6">
                        SuperSellerAE provides end-to-end intelligence for property developers. De-risk your projects with data-driven site selection, demand forecasting, and automated marketing suites.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" asChild>
                            <Link href="/signup">Book a Consultation</Link>
                        </Button>
                    </div>
                </div>
            </section>
            
             <section className="container mx-auto px-6 py-24 space-y-20">
                 <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h3 className="text-3xl font-bold font-heading mb-4">Is This the Right Location?</h3>
                        <p className="text-muted-foreground mb-6">Analyze hundreds of variables—zoning, infrastructure, demographic trends, and more—to identify the highest and best use for any parcel of land. Avoid costly mistakes before you break ground.</p>
                        <ul className="space-y-2">
                           <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>AI-Powered Land Suitability Analysis</span></li>
                           <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Market Demand Forecasting</span></li>
                        </ul>
                    </div>
                    <div className="p-4 bg-muted/40 border border-border/50 rounded-xl">
                        <Image src="https://picsum.photos/seed/dev-pain1/600/400" alt="Land Analysis" width={600} height={400} className="rounded-lg" data-ai-hint="map analysis" />
                    </div>
                </div>
                 <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="md:order-2">
                        <h3 className="text-3xl font-bold font-heading mb-4">Struggling with Project Marketing?</h3>
                        <p className="text-muted-foreground mb-6">Generate a complete marketing suite for your project in minutes, not months. Create cinematic tours, branded brochures, high-converting landing pages, and automated ad campaigns with AI.</p>
                         <ul className="space-y-2">
                           <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Instant Landing Page & Brochure Generation</span></li>
                           <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Automated Ad Campaign Creation</span></li>
                        </ul>
                    </div>
                    <div className="p-4 bg-muted/40 border border-border/50 rounded-xl md:order-1">
                        <Image src="https://picsum.photos/seed/dev-pain2/600/400" alt="Marketing Suite" width={600} height={400} className="rounded-lg" data-ai-hint="brochure website" />
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold font-heading mb-10">Your Developer Tool Suite</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {devTools.map(tool => tool && (
                             <FeatureCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
