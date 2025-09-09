
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, ArrowRight, Lightbulb, AlertTriangle, ShieldCheck, Megaphone, FileText, Users2, BarChart, Tv, Building, Star, BrainCircuit } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ProjectCard } from '@/components/ui/project-card';
import type { Project } from '@/types';
import Link from 'next/link';
import { ConnectedAppCard } from '@/components/ui/connected-app-card';
import { ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, BarChart as RechartsBarChart } from 'recharts';
import Image from 'next/image';


// Mock data to simulate a rich API response for "Emaar"
const mockResults = {
    overview: {
        summary: "Emaar Properties is one of the world's most valuable and admired real estate development companies. With proven competencies in properties, shopping malls & retail and hospitality & leisure, Emaar shapes new lifestyles with a focus on design excellence, build quality and timely delivery.",
        logoUrl: '/logos/emaar-logo.png',
        chartData: [ 
            { name: 'Q1 \'23', price: 4200 }, 
            { name: 'Q2 \'23', price: 4500 }, 
            { name: 'Q3 \'23', price: 4700 }, 
            { name: 'Q4 \'23', price: 5200 },
            { name: 'Q1 \'24', price: 5400 },
            { name: 'Q2 \'24', price: 5800 },
        ]
    },
    projects: [
        { id: 'emaar-b-1', name: 'Emaar Beachfront', developer: 'Emaar', area: 'Dubai Harbour', priceFrom: 'AED 2.5M', status: 'Ready', developerLogoUrl: '/logos/emaar-logo.png' },
        { id: 'emaar-dh-1', name: 'Dubai Hills Estate', developer: 'Emaar', area: 'MBR City', priceFrom: 'AED 3.1M', status: 'Ready', developerLogoUrl: '/logos/emaar-logo.png' },
        { id: 'emaar-ar-3', name: 'Arabian Ranches III', developer: 'Emaar', area: 'Dubailand', priceFrom: 'AED 2.2M', status: 'Off-plan', developerLogoUrl: '/logos/emaar-logo.png' },
        { id: 'emaar-oasis', name: 'The Oasis', developer: 'Emaar', area: 'Dubailand', priceFrom: 'AED 8.1M', status: 'New Launch', developerLogoUrl: '/logos/emaar-logo.png' },
    ],
    latestProject: { id: 'emaar-creek', name: 'Creek Waters 2', developer: 'Emaar', area: 'Dubai Creek Harbour', priceFrom: 'AED 1.7M', status: 'New Launch', developerLogoUrl: '/logos/emaar-logo.png' },
    media: [
        { type: 'image', url: 'https://picsum.photos/seed/emaar-gallery-1/600/400', caption: 'Downtown Dubai Skyline' },
        { type: 'image', url: 'https://picsum.photos/seed/emaar-gallery-2/600/400', caption: 'Dubai Hills Estate Villas' },
        { type: 'image', url: 'https://picsum.photos/seed/emaar-gallery-3/600/400', caption: 'Emaar Beachfront Residences' },
    ],
    reputation: { marketValue: '$15.8B', sentiment: 'Positive', mentions: 1240 },
    competitors: [
        { name: 'DAMAC Properties', logoUrl: '/logos/damac-logo.png' },
        { name: 'Nakheel', logoUrl: '/logos/nakheel-logo.png' },
        { name: 'Meraas', logoUrl: '/logos/meraas-logo.png' },
    ],
    insights: {
        opportunities: [
            "Strong demand in waterfront properties presents a key sales opportunity.",
            "Consistently high ROI in their established communities like Downtown and Marina.",
        ],
        risks: [
            "Premium pricing can be a barrier for first-time buyers.",
            "High competition in the luxury apartment segment.",
        ],
        investorDemand: "Very High, particularly from European and Asian markets for luxury and high-yield rental properties."
    },
    sources: [ "Dubai Land Department", "Bayut.com", "Property Finder", "Public News Archives" ]
};

const SearchResults = ({ query }: { query: string }) => {
    const results = mockResults;

    return (
        <div className="mt-12 space-y-12">
            <Card className="bg-card/50 backdrop-blur-lg">
                <CardHeader>
                    <div className="flex items-start justify-between">
                         <div className="flex items-center gap-4">
                            <Image src={results.overview.logoUrl} alt={`${query} Logo`} width={64} height={64} className="rounded-lg bg-white p-1" data-ai-hint="company logo" />
                            <div>
                                <CardTitle className="text-2xl">Market Overview: {query}</CardTitle>
                                <CardDescription>An AI-generated summary of the current market landscape.</CardDescription>
                            </div>
                         </div>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <p className="text-foreground/80">{results.overview.summary}</p>
                    </div>
                    <div className="md:col-span-1 h-48 bg-muted/50 rounded-lg p-2">
                         <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={results.overview.chartData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false}/>
                                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`}/>
                                <Tooltip wrapperClassName="!bg-background !border-border" cursor={{fill: 'hsl(var(--muted))'}}/>
                                <Bar dataKey="price" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Latest Project</h2>
                    <ProjectCard project={results.latestProject} />
                </div>
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Top Projects</h2>
                     <div className="space-y-3">
                        {results.projects.map((project) => (
                            <Card key={project.id} className="hover:bg-muted/50 transition-colors">
                                <CardContent className="p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Image src={project.developerLogoUrl || ''} alt={`${project.developer} Logo`} width={24} height={24} className="rounded-full bg-white" data-ai-hint="company logo" />
                                        <div>
                                            <p className="font-semibold">{project.name}</p>
                                            <p className="text-xs text-muted-foreground">{project.area}</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="ghost">View <ArrowRight className="ml-2 h-4 w-4"/></Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                 </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-4">
                     <h2 className="text-2xl font-bold">Media Gallery</h2>
                     <div className="grid grid-cols-3 gap-4">
                        {results.media.map((item, index) => (
                            <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                                <Image src={item.url} alt={item.caption} layout="fill" objectFit="cover" data-ai-hint="skyline city" />
                            </div>
                        ))}
                     </div>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Market Reputation</h2>
                    <Card>
                        <CardContent className="p-4 grid grid-cols-3 gap-2 text-center">
                            <div><p className="text-sm text-muted-foreground">Market Value</p><p className="font-bold text-lg">{results.reputation.marketValue}</p></div>
                            <div><p className="text-sm text-muted-foreground">Sentiment</p><p className="font-bold text-lg text-green-500">{results.reputation.sentiment}</p></div>
                            <div><p className="text-sm text-muted-foreground">Mentions (30d)</p><p className="font-bold text-lg">{results.reputation.mentions}</p></div>
                        </CardContent>
                    </Card>
                     <h2 className="text-2xl font-bold pt-4">Key Competitors</h2>
                     <div className="flex gap-4">
                        {results.competitors.map(c => (
                            <Card key={c.name} className="flex-1 p-2 flex items-center justify-center">
                                <Image src={c.logoUrl} alt={c.name} width={80} height={40} objectFit="contain" className="grayscale opacity-60" data-ai-hint="company logo" />
                            </Card>
                        ))}
                     </div>
                </div>
            </div>

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
                                {results.insights.opportunities.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><AlertTriangle className="text-amber-500"/> Potential Risks</h4>
                            <ul className="space-y-1 list-disc list-inside text-sm text-foreground/80">
                                {results.insights.risks.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><Users2 className="text-blue-500"/> Investor Demand</h4>
                            <p className="text-sm text-foreground/80">{results.insights.investorDemand}</p>
                        </div>
                    </CardContent>
                </Card>
                <div className="p-1 rounded-xl relative bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-primary/20 animate-[gradient-spin_5s_ease-in-out_infinite] opacity-50 group-hover:opacity-75 transition-opacity"/>
                     <Card className="relative h-full bg-card/90">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BrainCircuit /> Best Next Action</CardTitle>
                            <CardDescription>Turn these insights into action.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div>
                                <h4 className="font-semibold text-primary mb-2">How Top Agents Monetize This</h4>
                                <p className="text-sm text-foreground/80">Top agents use this dashboard to instantly identify undervalued assets, create targeted ad campaigns for high-demand projects, and arm themselves with expert-level knowledge before a client meeting.</p>
                            </div>
                            <div className="space-y-3">
                                <ConnectedAppCard
                                    title="Campaign Builder"
                                    description="Promote the latest project release with a targeted ad campaign."
                                    icon={<Megaphone />}
                                    ctaText="Launch Campaign"
                                    href="/dashboard/tool/meta-ads-copilot"
                                />
                                 <ConnectedAppCard
                                    title="Market Reports"
                                    description="Generate a professional, branded PDF report based on these insights for your clients."
                                    icon={<FileText />}
                                    ctaText="Generate Report"
                                    href="/dashboard/tool/market-reports"
                                />
                                <ConnectedAppCard
                                    title="Investor Matching"
                                    description="Scan your private client list to find the perfect buyer for these opportunities."
                                    icon={<Users2 />}
                                    ctaText="Find Investors"
                                    href="/dashboard/tool/investor-matching"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
             <div className="text-center pt-8">
                 <p className="text-xs text-muted-foreground">Data Sources: {results.sources.join(', ')}</p>
            </div>
        </div>
    );
};

function MarketLibrary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = React.useState(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/market-library?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-[120rem] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tighter mb-4 text-foreground">
             Search anything about Dubai’s real estate market
            </h1>
        </div>

        <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search for a project, developer, area, or even a service charge..."
                    className="w-full rounded-full h-14 pl-12 pr-28 text-base"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
                <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10 w-24">
                    Search
                </Button>
            </form>
        </div>
        
        {initialQuery ? (
          <React.Suspense fallback={
            <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
                 <div className="w-full max-w-lg space-y-2 mb-4">
                    <p className="font-semibold text-lg text-center">Generating your intelligence dashboard...</p>
                    <div className="h-2.5 bg-primary/20 rounded-full w-full animate-pulse"></div>
                    <div className="h-2.5 bg-primary/20 rounded-full w-3/4 animate-pulse"></div>
                </div>
            </div>
          }>
            <SearchResults query={initialQuery} />
          </React.Suspense>
        ) : (
            <div className="text-center mt-8 text-sm text-muted-foreground">
                <p>Or try an example search:</p>
                <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
                     <button onClick={() => router.push('/market-library?q=Apartments%20in%20Downtown%20with%20rental%20yield')} className="hover:text-primary transition-colors">Apartments in Downtown with rental yield</button>
                    <button onClick={() => router.push('/market-library?q=Top%20off-plan%20projects%20launching%20this%20month')} className="hover:text-primary transition-colors">Top off-plan projects</button>
                    <button onClick={() => router.push('/market-library?q=Market%20trends%20for%20Business%20Bay%20offices')} className="hover:text-primary transition-colors">Market trends for Business Bay offices</button>
                </div>
            </div>
        )}

      </main>
      <LandingFooter />
    </div>
  );
}

export default function MarketLibraryPage() {
    return (
        <React.Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="h-12 w-12 animate-spin" /></div>}>
            <MarketLibrary />
        </React.Suspense>
    )
}
