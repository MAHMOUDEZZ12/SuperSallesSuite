
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, FileText, Download, ShieldCheck, AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { reviewLeaseAgreement } from '@/ai/flows/review-lease-agreement';
import { ReviewLeaseAgreementInput, ReviewLeaseAgreementOutput } from '@/ai/flows/review-lease-agreement';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';
import { fileToDataUri } from '@/lib/tools-client';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const ResultDisplay = ({ result }: { result: ReviewLeaseAgreementOutput }) => {
    
    const riskConfig: {[key: string]: {color: string, icon: React.ReactNode}} = {
        'Low': { color: 'text-green-500', icon: <ShieldCheck className="h-4 w-4" />},
        'Medium': { color: 'text-yellow-500', icon: <AlertTriangle className="h-4 w-4" />},
        'High': { color: 'text-red-500', icon: <AlertTriangle className="h-4 w-4" />},
        'Informational': { color: 'text-blue-500', icon: <ShieldCheck className="h-4 w-4" />},
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Lease Agreement Review</CardTitle>
                <CardDescription>{result.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {result.findings.map((finding, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-muted/50">
                        <h4 className="font-semibold text-foreground">{finding.concern}</h4>
                         <div className="flex items-center gap-2 mt-1">
                             <Badge variant={finding.riskLevel === 'High' ? 'destructive' : 'secondary'} className={cn(riskConfig[finding.riskLevel]?.color, 'border-none')}>
                                {riskConfig[finding.riskLevel]?.icon}
                                <span className="ml-1">{finding.riskLevel} Risk</span>
                             </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">{finding.explanation}</p>
                        <blockquote className="mt-2 border-l-2 pl-3 text-xs font-mono text-muted-foreground bg-background p-2 rounded-md">
                           "{finding.clause}"
                        </blockquote>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                 <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Download Report</Button>
            </CardFooter>
        </Card>
    );
};

export default function LeaseReviewerPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ReviewLeaseAgreementOutput | null>(null);
    const [leaseFile, setLeaseFile] = useState<File | null>(null);
    const [concerns, setConcerns] = useState<string[]>(['Summarize key terms', 'Check penalty for early termination']);
    const [newConcern, setNewConcern] = useState('');

    const handleAddConcern = () => {
        if (newConcern.trim()) {
            setConcerns([...concerns, newConcern.trim()]);
            setNewConcern('');
        }
    }

    const handleRemoveConcern = (index: number) => {
        setConcerns(concerns.filter((_, i) => i !== index));
    }

    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!leaseFile || concerns.length === 0) {
            toast({ title: 'Missing Information', description: 'Please upload a lease and add at least one concern.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResult(null);
        track('lease_review_started');

        try {
            const leaseUri = await fileToDataUri(leaseFile);
            const payload: ReviewLeaseAgreementInput = { 
                leaseDocumentUri: leaseUri, 
                userConcerns: concerns
            };
            const responseData = await reviewLeaseAgreement(payload);
            setResult(responseData);
            track('lease_review_succeeded');
            toast({ title: 'Lease Review Complete!', description: 'Your AI legal analysis is ready.' });
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Review Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('lease_review_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="AI Lease Reviewer"
                description="Your AI legal assistant. Analyze lease agreements for risks and get plain-English summaries."
                icon={<ShieldCheck className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <form onSubmit={handleGeneration}>
                            <CardHeader>
                                <CardTitle>Review Inputs</CardTitle>
                                <CardDescription>Upload the lease and specify your concerns.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="leaseFile">Lease Agreement (PDF)</Label>
                                    <Input id="leaseFile" type="file" accept=".pdf" onChange={(e) => setLeaseFile(e.target.files?.[0] || null)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Your Concerns</Label>
                                    <div className="space-y-2">
                                        {concerns.map((concern, index) => (
                                            <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md text-sm">
                                                <span className="flex-grow">{concern}</span>
                                                <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveConcern(index)}>
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input value={newConcern} onChange={(e) => setNewConcern(e.target.value)} placeholder="e.g., 'Check maintenance responsibilities'" 
                                          onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddConcern(); } }}
                                        />
                                        <Button type="button" onClick={handleAddConcern}><Plus className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Reviewing...</> : <><Sparkles className="mr-2 h-5 w-5" />Review Document</>}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    {isLoading ? (
                        <Card className="flex items-center justify-center h-96 border-dashed">
                            <div className="text-center text-muted-foreground">
                                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                                <p className="font-semibold">The AI is reading the fine print...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        </Card>
                    ) : result ? (
                        <ResultDisplay result={result} />
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center p-6">
                            <FileText className="h-16 w-16 mx-auto mb-4 opacity-10" />
                            <h3 className="text-lg font-semibold text-foreground">Your Analysis Will Appear Here</h3>
                            <p className="text-muted-foreground">Upload a lease agreement and add your concerns to get started.</p>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
