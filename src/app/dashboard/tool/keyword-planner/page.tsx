
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { generateKeywordPlan } from '@/ai/flows/generate-keyword-plan';
import { GenerateKeywordPlanInput, GenerateKeywordPlanOutput } from '@/ai/flows/generate-keyword-plan';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ResultDisplay = ({ result }: { result: GenerateKeywordPlanOutput }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold font-heading">{result.planTitle}</h3>
            <Card>
                <CardHeader>
                    <CardTitle>Negative Keywords</CardTitle>
                    <CardDescription>Add these to your campaign to avoid wasted ad spend.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">
                        {result.negativeKeywords.join(', ')}
                    </div>
                </CardContent>
            </Card>
            {result.adGroups.map((group: any) => (
                <Card key={group.adGroupName}>
                    <CardHeader>
                        <CardTitle>{group.adGroupName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Keyword</TableHead>
                                    <TableHead>Match Type</TableHead>
                                    <TableHead className="text-right">Est. Searches</TableHead>
                                    <TableHead className="text-right">Competition</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {group.keywords.map((kw: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{kw.keyword}</TableCell>
                                        <TableCell>{kw.matchType}</TableCell>
                                        <TableCell className="text-right">{kw.monthlySearches.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant={kw.competition === 'High' ? 'destructive' : kw.competition === 'Medium' ? 'secondary' : 'default'}>
                                                {kw.competition}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default function KeywordPlannerPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerateKeywordPlanOutput | null>(null);
    const [topic, setTopic] = useState('');
    const [targetLocation, setTargetLocation] = useState('');

    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic || !targetLocation) {
            toast({ title: 'Missing Information', description: 'Please provide both a topic and a location.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResult(null);
        track('keyword_plan_generation_started', { topic });

        try {
            const payload: GenerateKeywordPlanInput = { topic, targetLocation };
            const responseData = await generateKeywordPlan(payload);
            setResult(responseData);
            track('keyword_plan_generation_succeeded');
            toast({ title: 'Keyword Plan Generated!', description: 'Your strategic plan is ready for review.' });
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Generation Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('keyword_plan_generation_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="AI Keyword Planner"
                description="Generate a strategic keyword plan for Google Ads campaigns."
                icon={<Wand2 className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <form onSubmit={handleGeneration}>
                            <CardHeader>
                                <CardTitle>Plan Parameters</CardTitle>
                                <CardDescription>Define the inputs for your keyword strategy.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="topic">Topic or Product</Label>
                                    <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., 'luxury villas in Dubai Hills'" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="targetLocation">Target Location</Label>
                                    <Input id="targetLocation" value={targetLocation} onChange={(e) => setTargetLocation(e.target.value)} placeholder="e.g., 'Dubai, UAE'" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generating Plan...</> : <><Sparkles className="mr-2 h-5 w-5" />Generate Keyword Plan</>}
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
                                <p className="font-semibold">Your AI Co-Pilot is analyzing the search market...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        </Card>
                    ) : result ? (
                        <ResultDisplay result={result} />
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center p-6">
                            <Wand2 className="h-16 w-16 mx-auto mb-4 opacity-10" />
                            <h3 className="text-lg font-semibold text-foreground">Your Keyword Plan Will Appear Here</h3>
                            <p className="text-muted-foreground">Fill out the parameters and let the AI build your Google Ads strategy.</p>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
