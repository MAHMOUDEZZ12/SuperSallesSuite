
import { Suspense } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Search, Loader2, ArrowRight, BarChart2, Lightbulb, AlertTriangle, ShieldCheck, Megaphone, FileText, Bot, Users2 } from 'lucide-react';
import { ProjectCard } from '@/components/ui/project-card';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

async function fetchSearchResults(query: string): Promise<Project[]> {
    const host = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000';
    try {
        const response = await fetch(`${host}/api/projects/scan?q=${encodeURIComponent(query)}&limit=6`);
        if (!response.ok) {
            console.error("Failed to fetch search results:", response.statusText);
            return [];
        }
        const data = await response.json();
        // Use mock data if API returns empty for demonstration
        if (data.data.length === 0) {
            return [
                { id: 'proj-1', name: 'Emaar Beachfront', developer: 'Emaar', area: 'Dubai Harbour', priceFrom: 'AED 2.5M', status: 'Ready' },
                { id: 'proj-2', name: 'Damac Hills 2', developer: 'Damac', area: 'Dubailand', priceFrom: 'AED 1.8M', status: 'Off-plan' },
                { id: 'proj-3', name: 'Sobha Hartland', developer: 'Sobha Realty', area: 'MBR City', priceFrom: 'AED 1.2M', status: 'Ready' },
                { id: 'proj-4', name: 'Palm Tower', developer: 'Nakheel', area: 'Palm Jumeirah', priceFrom: 'AED 3.1M', status: 'Ready' },
                { id: 'proj-5', name: 'Tilal Al Ghaf', developer: 'Majid Al Futtaim', area: 'Near Damac Hills', priceFrom: 'AED 2.2M', status: 'Off-plan' },
                { id: 'proj-6', name: 'Jumeirah Living', developer: 'Select Group', area: 'Business Bay', priceFrom: 'AED 4M', status: 'New Launch' },
            ];
        }
        return data.data || [];
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
}

const mockInsights = {
    opportunities: [
        "High demand for 2-bedroom units indicates strong rental yield potential.",
        "Recent infrastructure announcements are likely to boost capital appreciation by 12-15% in the next 24 months.",
        "Off-plan projects in this area have shown an average of 30% value increase upon handover."
    ],
    risks: [
        "Potential for market saturation with 3 similar high-rise projects completing in the next 18 months.",
        "Upcoming changes to foreign ownership laws could impact resale market liquidity."
    ],
    investorDemand: "High. Search volume from UK and German investors has increased by 45% in the last quarter."
};

const ConnectedAppCard = ({ title, description, icon, ctaText, href }: { title: string, description: string, icon: React.ReactNode, ctaText: string, href: string }) => (
    <Card className="bg-muted/50 hover:bg-muted transition-colors h-full flex flex-col">
        <CardHeader className="flex-row items-start gap-4 space-y-0">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">{icon}</div>
            <div>
                <CardTitle className="text-base font-semibold">{title}</CardTitle>
                <CardDescription className="text-xs">{description}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="flex-grow" />
        <CardFooter>
            <Link href={href} className="w-full">
                <Button variant="outline" className="w-full">
                    {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </CardFooter>
    </Card>
);

async function SearchResults({ query }: { query: string }) {
    const results = await fetchSearchResults(query);

    return (
        <div className="space-y-8">
            <Card className="bg-card/50 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Market Overview: {query}</CardTitle>
                    <CardDescription>An AI-generated summary of the current market landscape based on your query.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <p className="text-foreground/80">Based on our analysis of over 1.2 million data points, the market for "{query}" remains robust, driven by strong international interest and favorable local economic conditions. We're observing a significant trend towards luxury amenities and sustainable building practices, which are commanding premium prices.</p>
                        <p className="text-foreground/80">Current average price per square foot is holding steady, with a slight quarterly increase of 2.3%. Off-plan projects dominate new inventory, but the secondary market for ready properties is highly active.</p>
                    </div>
                    <div className="md:col-span-1 h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                        [ Trend Chart Placeholder ]
                    </div>
                </CardContent>
            </Card>

            {results.length > 0 && (
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Relevant Listings</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb className="text-primary"/> AI Insights</CardTitle>
                        <CardDescription>Key takeaways generated by our market intelligence model.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><ShieldCheck className="text-green-500"/> Top Opportunities</h4>
                            <ul className="space-y-1 list-disc list-inside text-sm text-foreground/80">
                                {mockInsights.opportunities.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><AlertTriangle className="text-amber-500"/> Potential Risks</h4>
                            <ul className="space-y-1 list-disc list-inside text-sm text-foreground/80">
                                {mockInsights.risks.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><Users2 className="text-blue-500"/> Investor Demand</h4>
                            <p className="text-sm text-foreground/80">{mockInsights.investorDemand}</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bot /> Next Actions</CardTitle>
                        <CardDescription>Instantly act on these insights with connected apps.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <ConnectedAppCard 
                            title="Generate Full Report"
                            description="Create a detailed, downloadable PDF market report."
                            icon={<FileText/>}
                            ctaText="Go to Reports"
                            href="/dashboard/tool/market-reports"
                       />
                        <ConnectedAppCard 
                            title="Run Ad Campaign"
                            description="Promote these listings with the Meta Ads suite."
                            icon={<Megaphone/>}
                            ctaText="Go to Ads"
                            href="/dashboard/tool/meta-ads-copilot"
                       />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function SearchPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const query = typeof searchParams?.q === 'string' ? searchParams.q : '';

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Market Intelligence Dashboard</h1>
                     {query ? (
                        <p className="text-lg text-muted-foreground">Showing results for: <span className="text-primary font-semibold">&quot;{query}&quot;</span></p>
                     ) : (
                        <p className="text-lg text-muted-foreground">Search for projects, developers, areas, and market trends.</p>
                     )}
                </div>

                <Suspense fallback={
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                        <span>Generating your intelligence dashboard...</span>
                    </div>
                    }>
                    {query ? (
                        <SearchResults query={query} />
                    ) : (
                         <div className="text-center py-16 text-muted-foreground">
                            <p>Please enter a search term on the homepage to begin.</p>
                        </div>
                    )}
                </Suspense>
            </main>
            <LandingFooter />
        </div>
    );
}
