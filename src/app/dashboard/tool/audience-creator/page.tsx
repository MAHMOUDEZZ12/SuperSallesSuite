
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, ArrowRight, ArrowLeft, Users2, Upload, Crown, Info, Binoculars } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

interface Strategy {
    strategyName: string;
    audienceType: string;
    demographics: string;
    interests: string;
    keywords: string;
}

interface SuggestTargetingOptionsOutput {
    strategies: Strategy[];
}


const ProFeatureLock = ({ children, title }: { children: React.ReactNode, title: string }) => (
    <div className="relative">
        <div className="blur-sm grayscale pointer-events-none opacity-60">
            {children}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 rounded-lg">
            <div className="p-4 bg-background border shadow-lg rounded-xl text-center">
                <Crown className="mx-auto h-8 w-8 text-amber-500 mb-2" />
                <h3 className="font-bold text-lg text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">This is a Pro-level feature.</p>
                <Button>Upgrade to Pro</Button>
            </div>
        </div>
    </div>
);


const AudienceRefinementCard = ({ strategy, toast, onBack }: { strategy: any, toast: any, onBack: () => void }) => {
    const [country, setCountry] = React.useState('United Arab Emirates');
    const [city, setCity] = React.useState('Dubai');
    const [audienceSize, setAudienceSize] = React.useState<number | null>(null);
    const [isEstimating, setIsEstimating] = React.useState(false);

    const handleEstimate = () => {
        setIsEstimating(true);
        setAudienceSize(null);
        setTimeout(() => {
            const size = 50000 + Math.floor(Math.random() * 2000000);
            setAudienceSize(size);
            setIsEstimating(false);
            toast({ title: "Audience Refined!", description: `New estimate for ${city}, ${country} is ready.`});
        }, 1500);
    };

    return (
         <Card className="flex flex-col bg-muted/30 col-span-full">
            <CardHeader>
                <Button variant="ghost" size="sm" onClick={onBack} className="absolute top-4 right-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Strategies
                </Button>
                <CardTitle className="text-xl text-primary">{strategy.strategyName}</CardTitle>
                <CardDescription>
                     <Badge>{strategy.audienceType}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                 <div>
                    <p className="font-semibold text-foreground">Demographics:</p>
                    <p className="text-muted-foreground">{strategy.demographics}</p>
                </div>
                <div>
                    <p className="font-semibold text-foreground">Interests (Social):</p>
                    <p className="text-muted-foreground">{strategy.interests}</p>
                </div>
                <div>
                    <p className="font-semibold text-foreground">Keywords (Search):</p>
                    <p className="text-muted-foreground">{strategy.keywords}</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold text-foreground mb-2">Refine Audience &amp; Estimate Reach</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                         <div className="space-y-1">
                            <Label htmlFor={`country-${strategy.strategyName}`}>Country</Label>
                            <Input id={`country-${strategy.strategyName}`} value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g., United States" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor={`city-${strategy.strategyName}`}>City</Label>
                            <Input id={`city-${strategy.strategyName}`} value={city} onChange={e => setCity(e.target.value)} placeholder="e.g., New York" />
                        </div>
                    </div>
                     <Button onClick={handleEstimate} disabled={isEstimating} size="sm">
                        {isEstimating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                        Refine &amp; Estimate
                    </Button>
                </div>
                {audienceSize !== null && (
                    <div className="p-3 bg-background rounded-lg border space-y-2 animate-in fade-in-50">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-muted-foreground">Est. Audience Size:</span>
                            <span className="font-bold text-lg text-primary">{audienceSize.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">Potential Daily Reach:</span>
                            <span className="font-semibold">{(audienceSize * 0.05).toLocaleString('en-US', { maximumFractionDigits: 0 })} - {(audienceSize * 0.15).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                 <Button className="w-full" onClick={() => toast({title: "Strategy Sent!", description: `The "${strategy.strategyName}" has been sent to the Campaign Builder.`})}>
                    Send to Campaign Builder
                </Button>
            </CardFooter>
        </Card>
    );
};


const AudienceIdeationResult = ({ result, toast }: { result: any, toast: any }) => {
    const [selectedStrategy, setSelectedStrategy] = React.useState<any | null>(null);
    
    if (selectedStrategy) {
        return <AudienceRefinementCard strategy={selectedStrategy} toast={toast} onBack={() => setSelectedStrategy(null)} />
    }

    return (
      <Tabs defaultValue="suggestions">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggestions">
            <Sparkles className="mr-2 h-4 w-4" /> AI Suggestions
          </TabsTrigger>
          <TabsTrigger value="custom">
            <Upload className="mr-2 h-4 w-4" /> Custom Audience
          </TabsTrigger>
          <TabsTrigger value="lookalike">
            <Users2 className="mr-2 h-4 w-4" /> Lookalike Audience
          </TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="mt-6">
            <div className="text-center mb-6">
                 <h3 className="font-semibold text-xl text-foreground">Recommended Targeting Strategies</h3>
                <p className="text-muted-foreground mt-1 text-sm">The AI has generated multiple distinct strategies for your project. Select one to refine and estimate its potential reach.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.strategies.map((strategy: any, index: number) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg">{strategy.strategyName}</CardTitle>
                            <CardDescription>
                                <Badge variant="outline">{strategy.audienceType}</Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground">{strategy.demographics}</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => setSelectedStrategy(strategy)}>
                                Select &amp; Refine <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
            <ProFeatureLock title="Custom Audience from File">
                <Card>
                    <CardHeader>
                        <CardTitle>Create a Custom Audience</CardTitle>
                        <CardDescription>Upload a list of your existing customers or leads (CSV or TXT). The data is securely hashed before being sent to Meta.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="audienceName">Audience Name</Label>
                            <Input id="audienceName" placeholder="e.g., 'Past Buyers Q1 2024'" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="customerFile">Customer File</Label>
                            <Input id="customerFile" type="file" accept=".csv,.txt" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Upload &amp; Create Audience</Button>
                    </CardFooter>
                </Card>
            </ProFeatureLock>
        </TabsContent>
        
        <TabsContent value="lookalike" className="mt-6">
            <ProFeatureLock title="Lookalike Audience">
                 <Card>
                    <CardHeader>
                        <CardTitle>Create a Lookalike Audience</CardTitle>
                        <CardDescription>Find new people who are similar to your most valuable audiences. This is a powerful way to scale your campaigns.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="sourceAudience">Source Audience</Label>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a source..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="past-buyers">Custom Audience: Past Buyers</SelectItem>
                                    <SelectItem value="website-visitors">Custom Audience: Website Visitors (30 days)</SelectItem>
                                    <SelectItem value="azure-leads">Campaign Leads: Azure Lofts</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lookalike-location">Target Location</Label>
                            <Input id="lookalike-location" placeholder="e.g., United States" />
                        </div>
                        <div className="space-y-2">
                            <Label>Audience Size</Label>
                            <p className="text-sm text-muted-foreground">1% is most similar to your source, while 10% increases reach.</p>
                             <Select defaultValue="1">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1%</SelectItem>
                                    <SelectItem value="2">2%</SelectItem>
                                    <SelectItem value="5">5%</SelectItem>
                                    <SelectItem value="10">10%</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full">Create Lookalike Audience</Button>
                    </CardFooter>
                </Card>
            </ProFeatureLock>
        </TabsContent>
      </Tabs>
    );
}

export default function AudienceCreatorPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<SuggestTargetingOptionsOutput | null>(null);
    const [projectId, setProjectId] = useState('');
    const [showCampaignNotice, setShowCampaignNotice] = React.useState(true);


    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectId) {
            toast({ title: 'Project Required', description: 'Please select a project to generate an audience.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResult(null);
        track('audience_generation_started', { projectId });

        try {
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toolId: 'audience-creator',
                    payload: { projectId },
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.error || 'An unexpected error occurred.');
            }
            setResult(responseData);
            track('audience_generation_succeeded');
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Generation Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('audience_generation_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
             {showCampaignNotice && (
                 <Card data-state={showCampaignNotice ? 'open' : 'closed'} className="max-w-full mx-auto animate-in fade-in-0 slide-in-from-top-5 duration-500 bg-primary/10 border-primary/20">
                     <CardContent className='p-4'>
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
                           <div className="flex-grow flex items-center gap-3">
                               <Info className="h-5 w-5 text-primary" />
                               <div>
                                  <p className="font-semibold text-primary">You're in Discovery Mode</p>
                                  <p className="text-sm text-primary/80">You can generate audience ideas, but to use them, you must first create a campaign.</p>
                               </div>
                           </div>
                           <div className='flex gap-2 flex-shrink-0 mt-2 sm:mt-0'>
                                <Link href="/dashboard/tool/meta-ads-copilot">
                                    <Button size="sm">Start a Campaign</Button>
                                </Link>
                                <Button size="sm" variant="ghost" onClick={() => setShowCampaignNotice(false)}>I'm just exploring</Button>
                           </div>
                        </div>
                     </CardContent>
                 </Card>
            )}

            <PageHeader
                title="Audience Creator AI"
                description="Define your ideal buyer persona and find high-intent customers for any project."
                icon={<Binoculars className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Selection</CardTitle>
                            <CardDescription>Choose the project you want to build an audience for.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleGeneration}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="projectId">Project</Label>
                                    <Select value={projectId} onValueChange={setProjectId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="emaar-beachfront">Emaar Beachfront</SelectItem>
                                            <SelectItem value="damac-hills-2">Damac Hills 2</SelectItem>
                                            <SelectItem value="sobha-hartland">Sobha Hartland</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Building Audience...</> : <><Wand2 className="mr-2 h-5 w-5" />Generate Audience Strategies</>}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    {isLoading ? (
                        <Card className="flex items-center justify-center h-96">
                            <div className="text-center text-muted-foreground">
                                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                                <p className="font-semibold">Your AI Co-Pilot is analyzing the market...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        </Card>
                    ) : result ? (
                        <AudienceIdeationResult result={result} toast={toast} />
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center p-6">
                            <Users2 className="h-16 w-16 mx-auto mb-4 opacity-10" />
                            <h3 className="text-lg font-semibold text-foreground">Your Audience Awaits</h3>
                            <p className="text-muted-foreground">Select a project to let the AI build your ideal customer profile.</p>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
