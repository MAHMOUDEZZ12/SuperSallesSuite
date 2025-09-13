
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Wand2, FileText, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';

interface GetMarketTrendsInput {
  topic: string;
}

interface Trend {
  trend: string;
  description: string;
}

interface GetMarketTrendsOutput {
  overallSentiment: string;
  emergingTrends: Trend[];
  futureOutlook: string;
}

const ResultDisplay = ({ result, topic }: { result: GetMarketTrendsOutput, topic: string }) => {
    return (
      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-heading">Market Trend Analysis: {topic}</CardTitle>
                 <CardDescription>Based on an analysis of recent articles and data from sources like Property Finder's Insights Hub.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-lg mb-2 text-primary">Overall Sentiment</h4>
                    <p className="text-foreground/80">{result.overallSentiment}</p>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-2">Key Emerging Trends</h4>
                    <ul className="space-y-3">
                        {result.emergingTrends.map((item, index) => (
                        <li key={index} className="p-3 bg-muted/50 rounded-md border">
                            <p className="font-semibold">{item.trend}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </li>
                        ))}
                    </ul>
                </div>
                
                 <div>
                    <h4 className="font-semibold text-lg mb-2">Future Outlook</h4>
                    <p className="text-foreground/80">{result.futureOutlook}</p>
                </div>
            </CardContent>
        </Card>
      </div>
    );
};


export default function MarketTrendsPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GetMarketTrendsOutput | null>(null);
    const [topic, setTopic] = useState('');

    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic) {
            toast({ title: 'Topic Required', description: 'Please enter a topic to analyze.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResult(null);
        track('market_trends_generation_started', { topic });

        try {
            const payload: GetMarketTrendsInput = { topic };
            
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toolId: 'market-trends', payload }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Trend analysis generation failed.');
            }

            const responseData = await response.json();
            setResult(responseData);
            track('market_trends_generation_succeeded');
            toast({ title: 'Trend Analysis Complete!', description: 'Your new report is ready for review.'});
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Generation Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('market_trends_generation_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Market Trends Watcher"
                description="Synthesize news and data to identify emerging trends before they become mainstream."
                icon={<TrendingUp className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle>Analysis Topic</CardTitle>
                            <CardDescription>What area of the market do you want to analyze?</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleGeneration}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="topic">Topic</Label>
                                    <Input id="topic" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., 'Dubai real estate rental yields'" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Analyzing...</> : <><Wand2 className="mr-2 h-5 w-5" />Analyze Market Trends</>}
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
                                <p className="font-semibold">Your AI Co-Pilot is analyzing the latest news...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        </Card>
                    ) : result ? (
                        <ResultDisplay result={result} topic={topic} />
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center p-6">
                            <FileText className="h-16 w-16 mx-auto mb-4 opacity-10" />
                            <h3 className="text-lg font-semibold text-foreground">Your Trend Report Will Appear Here</h3>
                            <p className="text-muted-foreground">Enter a topic and let the AI synthesize the latest market intelligence for you.</p>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
