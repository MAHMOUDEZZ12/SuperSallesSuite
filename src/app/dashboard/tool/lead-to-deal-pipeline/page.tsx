
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, Search, UserCheck, Wallet, Target, Bot, CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';
import { investigateLead } from '@/ai/flows/investigate-lead';
import { evaluateLeadAsBuyer } from '@/ai/flows/evaluate-lead-as-buyer';
import { InvestigateLeadInput, EvaluateLeadAsBuyerOutput, InvestigateLeadOutput } from '@/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Status = 'pending' | 'running' | 'completed' | 'error';

interface Step {
  id: 'investigate' | 'evaluate' | 'match';
  title: string;
  description: string;
  status: Status;
  icon: React.ReactNode;
  data?: any;
}

const initialSteps: Step[] = [
  { id: 'investigate', title: 'Step 1: Investigate Lead', description: 'Enriching lead data from public sources...', status: 'pending', icon: <Search/> },
  { id: 'evaluate', title: 'Step 2: Evaluate as Buyer', description: 'Creating a detailed buyer profile...', status: 'pending', icon: <UserCheck/> },
  { id: 'match', title: 'Step 3: Match Properties', description: 'Finding the best properties from your library...', status: 'pending', icon: <Target/> },
];


const ResultsDisplay = ({ results }: { results: Step[] }) => {
    const investigationData: InvestigateLeadOutput = results.find(s => s.id === 'investigate')?.data;
    const evaluationData: EvaluateLeadAsBuyerOutput = results.find(s => s.id === 'evaluate')?.data;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Pipeline Complete: {investigationData?.matches[0]?.name || 'Lead'}</CardTitle>
                    <CardDescription>The AI has investigated and profiled the lead. Here is the result.</CardDescription>
                </CardHeader>
            </Card>

            {investigationData && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Search/> Investigation Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{investigationData.overallSummary}</p>
                        <div className="mt-4 space-y-2">
                             {investigationData.matches.map((match: any, index: number) => (
                                <div key={index} className="p-3 bg-muted/50 rounded-md border">
                                    <h4 className="font-semibold text-primary">{match.name}</h4>
                                    <p className="text-sm text-muted-foreground">Source: {match.source} | Confidence: {(match.matchConfidence * 100).toFixed(0)}%</p>
                                    <p className="text-xs mt-1">{match.summary}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {evaluationData && (
                <Card>
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2"><UserCheck/> Buyer Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="text-sm"><strong className="text-muted-foreground">Budget:</strong> <span className="font-semibold text-primary">{evaluationData.estimatedBudget}</span></div>
                        <div className="text-sm"><strong className="text-muted-foreground">Motivation:</strong> {evaluationData.primaryMotivation}</div>
                        <div className="text-sm"><strong className="text-muted-foreground">Preferences:</strong> {evaluationData.propertyPreferences.join(', ')}</div>
                        <p className="mt-2 p-3 bg-muted rounded-md text-sm border">"{evaluationData.profileSummary}"</p>
                    </CardContent>
                </Card>
            )}

             <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-2"><Target/> Property Matches</CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground">Based on the buyer profile, here are the top 3 recommended properties from your library:</p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* These would be dynamically matched in a full implementation */}
                        <div className="p-3 bg-muted/50 rounded-lg border text-center">
                            <h4 className="font-semibold">Emaar Beachfront</h4>
                            <p className="text-xs text-muted-foreground">High ROI, Luxury</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg border text-center">
                            <h4 className="font-semibold">Damac Hills 2</h4>
                            <p className="text-xs text-muted-foreground">Family Villa, Good Value</p>
                        </div>
                         <div className="p-3 bg-muted/50 rounded-lg border text-center">
                            <h4 className="font-semibold">Sobha Hartland</h4>
                             <p className="text-xs text-muted-foreground">New Launch, Modern</p>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <Link href="/dashboard/tool/email-creator">
                            <Button>Draft Outreach Email</Button>
                        </Link>
                        <Link href="/dashboard/tool/whatsapp-campaigns">
                            <Button variant="outline">Start WhatsApp Campaign</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function LeadToDealPipelinePage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [leadName, setLeadName] = useState('');
    const [workflow, setWorkflow] = useState<Step[]>(initialSteps);
    const [isComplete, setIsComplete] = useState(false);

    const getStatusIcon = (status: Status) => {
        switch (status) {
          case 'running': return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
          case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
          default: return <Circle className="h-5 w-5 text-muted-foreground/50" />;
        }
    };
    
    const resetWorkflow = () => {
        setWorkflow(initialSteps);
        setIsLoading(false);
        setIsComplete(false);
        setLeadName('');
    }

    const handleRunPipeline = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!leadName) {
            toast({ title: 'Lead Name Required', description: 'Please enter a name to start the pipeline.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setIsComplete(false);
        setWorkflow(initialSteps);
        track('lead_pipeline_started', { leadName });

        try {
            // Step 1: Investigate
            setWorkflow(prev => prev.map(s => s.id === 'investigate' ? { ...s, status: 'running' } : s));
            const investigationResult = await investigateLead({ name: leadName });
             if (!investigationResult.matches || investigationResult.matches.length === 0) {
                throw new Error("Could not find any information on this lead.");
            }
            setWorkflow(prev => prev.map(s => s.id === 'investigate' ? { ...s, status: 'completed', data: investigationResult } : s));
            
            // Step 2: Evaluate
            setWorkflow(prev => prev.map(s => s.id === 'evaluate' ? { ...s, status: 'running' } : s));
            const evaluationResult = await evaluateLeadAsBuyer({ lead: investigationResult.matches[0] });
            setWorkflow(prev => prev.map(s => s.id === 'evaluate' ? { ...s, status: 'completed', data: evaluationResult } : s));

            // Step 3: Match (Simulated)
            setWorkflow(prev => prev.map(s => s.id === 'match' ? { ...s, status: 'running' } : s));
            await new Promise(res => setTimeout(res, 1000));
            setWorkflow(prev => prev.map(s => s.id === 'match' ? { ...s, status: 'completed' } : s));
            
            setIsComplete(true);
            toast({ title: 'Pipeline Complete!', description: `Successfully processed lead: ${leadName}` });
            track('lead_pipeline_succeeded');
        } catch (error: any) {
            setWorkflow(prev => prev.map(s => s.status === 'running' ? { ...s, status: 'error' } : s));
            toast({ title: "Pipeline Failed", description: error.message, variant: "destructive" });
            track('lead_pipeline_failed', { error: error.message });
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Lead-to-Deal Pipeline"
                description="An automated workflow that investigates, evaluates, and matches leads to properties."
                icon={<Bot className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <form onSubmit={handleRunPipeline}>
                            <CardHeader>
                                <CardTitle>Start Pipeline</CardTitle>
                                <CardDescription>Enter a lead's name to begin.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Label htmlFor="leadName">Lead Name</Label>
                                    <Input id="leadName" value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="e.g., Jane Doe" />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2">
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Running...</> : <><Sparkles className="mr-2 h-5 w-5" />Run Pipeline</>}
                                </Button>
                                { (isLoading || isComplete) && <Button onClick={resetWorkflow} variant="ghost" className="w-full">Reset</Button> }
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    { !isLoading && !isComplete && (
                        <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center p-6">
                            <Bot className="h-16 w-16 mx-auto mb-4 opacity-10" />
                            <h3 className="text-lg font-semibold text-foreground">Awaiting Instructions</h3>
                            <p className="text-muted-foreground">Enter a lead name to start the automated pipeline.</p>
                        </Card>
                    )}
                    
                    { isLoading && !isComplete && (
                         <Card>
                            <CardHeader>
                                <CardTitle>Pipeline in Progress...</CardTitle>
                                <CardDescription>Your AI agents are at work.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {workflow.map((step) => (
                                    <div key={step.id} className="flex items-start gap-4">
                                        <div>{getStatusIcon(step.status)}</div>
                                        <div className="flex-1">
                                            <p className={cn("font-medium", step.status !== 'pending' && "text-foreground")}>{step.title}</p>
                                            <p className="text-sm text-muted-foreground">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                         </Card>
                    )}

                    {isComplete && <ResultsDisplay results={workflow} />}
                </div>
            </div>
        </main>
    );
}
