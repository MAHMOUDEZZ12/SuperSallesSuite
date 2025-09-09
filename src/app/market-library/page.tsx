
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, ArrowRight, Lightbulb, AlertTriangle, ShieldCheck, Megaphone, FileText, Users2, BarChart, Tv, Building, Star, BrainCircuit, Twitter, Newspaper } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ProjectCard } from '@/components/ui/project-card';
import type { Project } from '@/types';
import Link from 'next/link';
import { ConnectedAppCard } from '@/components/ui/connected-app-card';
import { ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, BarChart as RechartsBarChart } from 'recharts';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

// --- MOCK DATA ---
const developerResults = {
    overview: {
        summary: "Emaar Properties is one of the world's most valuable and admired real estate development companies. With proven competencies in properties, shopping malls & retail and hospitality & leisure, Emaar shapes new lifestyles with a focus on design excellence, build quality and timely delivery.",
        logoUrl: '/logos/emaar-logo.png',
        companySize: "10,001+ employees",
        totalProjects: 78,
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
    media: [
      { type: 'news', source: 'Bloomberg', text: 'Emaar Properties posts record profits as Dubai luxury market booms.', url: '#' },
      { type: 'social', source: 'Twitter', text: 'Just visited the new Emaar Beachfront project. The views are breathtaking! #DubaiRealEstate', url: '#' },
      { type: 'news', source: 'Gulf News', text: 'New Emaar development "The Oasis" to feature crystal lagoons and wellness centers.', url: '#' },
      { type: 'social', source: 'LinkedIn', text: 'Great analysis by Emaar on the future of branded residences in the Middle East. A must-read for investors.', url: '#' }
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

const locationResults = {
    locationName: "Jabal Ali",
    overview: "Jabal Ali is a major commercial port and business hub in Dubai, but is rapidly growing as a residential area with new developments offering affordable living options with excellent connectivity.",
    stats: {
        avgPricePerSqft: "AED 850",
        yearlyPriceChange: "+8.5%",
        rentalYield: "6.2%",
    },
    projects: [
        { id: 'ja-1', name: 'Azizi Venice', developer: 'Azizi', area: 'Jabal Ali', priceFrom: 'AED 1.1M', status: 'Off-plan' },
        { id: 'ja-2', name: 'Gardenia Livings', developer: 'Safe Developers', area: 'Jabal Ali', priceFrom: 'AED 980k', status: 'Ready' },
        { id: 'ja-3', name: 'The Community', developer: 'Aqua Properties', area: 'Jabal Ali', priceFrom: 'AED 750k', status: 'Ready' },
    ]
}

const questionResults = {
    question: "Is Nakheel a government company?",
    answer: "Yes, Nakheel Properties is a Dubai-based, state-owned developer. It is a subsidiary of Dubai World and operates under the purview of the Government of Dubai.",
    source: "Publicly available records and company information.",
}

// --- DYNAMIC RESULT COMPONENTS ---

const DeveloperDashboard = ({ query }: { query: string }) => {
    const results = developerResults;
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
                <CardContent className="space-y-6">
                    <p className="text-foreground/80">{results.overview.summary}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>{results.overview.totalProjects}</CardTitle>
                                <CardDescription>Total Projects</CardDescription>
                            </CardHeader>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>{results.overview.companySize}</CardTitle>
                                <CardDescription>Company Size</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="col-span-2 h-24 bg-muted/50 p-2">
                             <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={results.overview.chartData}>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false}/>
                                    <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`}/>
                                    <Tooltip wrapperClassName="!bg-background !border-border" cursor={{fill: 'hsl(var(--muted))'}}/>
                                    <Bar dataKey="price" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-2xl font-bold mb-6">Top Projects by {query}</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">News & Social Media Mentions</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.media.map((item, index) => (
                           <Card key={index} className="bg-card/50 hover:bg-muted/50 transition-colors">
                              <CardContent className="p-4 flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg mt-1">
                                  {item.type === 'news' ? <Newspaper className="h-5 w-5" /> : <Twitter className="h-5 w-5" />}
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground font-semibold uppercase">{item.source}</p>
                                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:underline">
                                    {item.text}
                                  </a>
                                </div>
                              </CardContent>
                           </Card>
                        ))}
                     </div>
                </div>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb className="text-primary"/> AI Insights</CardTitle>
                        <CardDescription>Generated by our market intelligence model.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><ShieldCheck className="text-green-500"/> Top Opportunities</h4>
                            <ul className="space-y-1 list-disc list-inside text-foreground/80">
                                {results.insights.opportunities.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><AlertTriangle className="text-amber-500"/> Potential Risks</h4>
                            <ul className="space-y-1 list-disc list-inside text-foreground/80">
                                {results.insights.risks.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="relative p-0.5 bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-primary/20 animate-[gradient-spin_5s_ease-in-out_infinite] opacity-50 group-hover:opacity-75 transition-opacity -z-10"/>
                 <div className="relative h-full bg-card/95 backdrop-blur-sm rounded-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl font-bold font-heading mb-2 flex items-center gap-2"><BrainCircuit /> Best Next Action</h2>
                             <p className="text-muted-foreground mb-4">How Top Agents Monetize This Intelligence</p>
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
                    </div>
                 </div>
            </Card>
            
             <div className="text-center pt-8">
                 <p className="text-xs text-muted-foreground">Data Sources: {results.sources.join(', ')}</p>
            </div>
        </div>
    );
};

const LocationReport = ({ query }: { query: string }) => {
    const results = locationResults;
    return (
         <div className="mt-12 space-y-8">
            <Card className="bg-card/50 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Location Report: {results.locationName}</CardTitle>
                    <CardDescription>{results.overview}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="text-center"><CardHeader><CardTitle>{results.stats.avgPricePerSqft}</CardTitle><CardDescription>Avg. Price/sqft</CardDescription></CardHeader></Card>
                    <Card className="text-center"><CardHeader><CardTitle>{results.stats.yearlyPriceChange}</CardTitle><CardDescription>Yearly Change</CardDescription></CardHeader></Card>
                    <Card className="text-center"><CardHeader><CardTitle>{results.stats.rentalYield}</CardTitle><CardDescription>Est. Rental Yield</CardDescription></CardHeader></Card>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-2xl font-bold mb-6">Active & Recent Projects in {results.locationName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const AnswerCard = ({ query }: { query: string }) => {
    const results = questionResults;
    return (
         <div className="mt-12">
            <Card className="bg-card/50 backdrop-blur-lg">
                 <CardHeader>
                    <CardTitle className="text-2xl">AI Answer</CardTitle>
                    <CardDescription>For your question: "{results.question}"</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-foreground/90">{results.answer}</p>
                    <p className="text-xs text-muted-foreground mt-4">Source: {results.source}</p>
                </CardContent>
            </Card>
        </div>
    );
}

const SearchResults = ({ query }: { query: string }) => {
    // This is where a real app would have an API call with NLU to determine which result type to show.
    // For this prototype, we'll use simple string matching.
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('emaar')) {
        return <DeveloperDashboard query={query} />;
    }
    if (lowerQuery.includes('jabal ali')) {
        return <LocationReport query={query} />;
    }
    if (lowerQuery.includes('?')) {
        return <AnswerCard query={query} />;
    }
    
    // Default fallback to a generic search result page or message
    return <div className="mt-12 text-center text-muted-foreground">No specific dashboard type found for your query. Showing generic results...</div>;
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
      <main className="flex-1 w-full px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tighter mb-4 text-foreground">
             Search anything about Dubai’s real estate market
            </h1>
        </div>

        <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search for a project, developer, area, or even ask a question..."
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
        
        <div className="max-w-7xl mx-auto">
          {initialQuery ? (
            <React.Suspense fallback={
              <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
                  <div className="w-full max-w-lg space-y-2 mb-4">
                      <p className="font-semibold text-lg text-center">Generating your intelligence dashboard...</p>
                      <div className="h-2.5 bg-primary/20 rounded-full w-full animate-pulse"></div>
                  </div>
              </div>
            }>
              <SearchResults query={initialQuery} />
            </React.Suspense>
          ) : (
              <div className="text-center mt-8 text-sm text-muted-foreground">
                  <p>Or try an example search:</p>
                  <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
                      <button onClick={() => router.push('/market-library?q=Emaar')} className="hover:text-primary transition-colors">Emaar</button>
                      <button onClick={() => router.push('/market-library?q=what are the prices in Jabal Ali')} className="hover:text-primary transition-colors">Prices in Jabal Ali</button>
                      <button onClick={() => router.push('/market-library?q=is Nakheel a government company?')} className="hover:text-primary transition-colors">Is Nakheel a government company?</button>
                  </div>
              </div>
          )}
        </div>

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
