'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, ArrowRight, ArrowLeft, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

interface InvestigateLeadInput {
    name: string;
    company?: string;
    email?: string;
    location?: string;
    role?: string;
}

interface Match {
    name: string;
    profileUrl: string;
    source: string;
    summary: string;
    matchConfidence: number;
}

interface InvestigateLeadOutput {
    matches: Match[];
    overallSummary: string;
}

type InvestigationStep = 'name' | 'company' | 'email' | 'location' | 'role' | 'submitting' | 'results';

const steps: InvestigationStep[] = ['name', 'company', 'email', 'location', 'role'];

const stepConfig: Record<InvestigationStep, { label: string; placeholder: string; type: string; }> = {
    name: { label: "What is the lead's full name?", placeholder: "e.g., Jane Doe", type: 'text' },
    company: { label: "What company do they work for? (optional)", placeholder: "e.g., Acme Inc.", type: 'text' },
    email: { label: "What is their email? (optional)", placeholder: "e.g., jane.doe@acme.com", type: 'email' },
    location: { label: "Where are they located? (optional)", placeholder: "e.g., Dubai, UAE", type: 'text' },
    role: { label: "What is their job title? (optional)", placeholder: "e.g., CEO or Founder", type: 'text' },
    submitting: { label: "Submitting", placeholder: "", type: "" },
    results: { label: "Results", placeholder: "", type: "" }
};


const ResultsDisplay = ({ results, onRefine }: { results: InvestigateLeadOutput, onRefine: (match: any) => void }) => {
    
    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>Investigation Results</CardTitle>
                <CardDescription>{results.overallSummary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {results.matches.map((match, index) => (
                    <Card key={index} className="p-4">
                        <div className="flex justify-between items-start">
                             <div>
                                <h4 className="font-semibold text-primary">{match.name}</h4>
                                <p className="text-sm text-muted-foreground">Found on: {match.source} | Confidence: <span className="font-bold">{(match.matchConfidence * 100).toFixed(0)}%</span></p>
                            </div>
                             <div className="flex items-center gap-2">
                                <Button size="sm" onClick={() => onRefine(match)}>This is them!</Button>
                                <Link href={match.profileUrl} target="_blank">
                                    <Button size="sm" variant="outline">View Profile</Button>
                                </Link>
                            </div>
                        </div>
                        <p className="text-sm mt-2">{match.summary}</p>
                    </Card>
                ))}
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-muted-foreground">If none of these are correct, try starting a new investigation with more specific details.</p>
            </CardFooter>
        </Card>
    )
}

export default function LeadInvestigatorPage() {
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState<InvestigationStep>('name');
    const [formData, setFormData] = useState<Partial<InvestigateLeadInput>>({});
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState<InvestigateLeadOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleNextStep = async (e?: React.FormEvent) => {
        e?.preventDefault();
        
        const currentStepIndex = steps.indexOf(currentStep);
        const isOptional = currentStep !== 'name';

        if (!isOptional && !inputValue.trim()) {
            toast({ title: 'Input Required', description: 'Please provide a name to start the investigation.', variant: 'destructive' });
            return;
        }

        const newFormData = { ...formData, [currentStep]: inputValue };
        setFormData(newFormData);
        setInputValue('');

        if (currentStepIndex < steps.length - 1) {
            setCurrentStep(steps[currentStepIndex + 1]);
        } else {
           await handleSubmit(newFormData);
        }
    };
    
    const handleSubmit = async (finalData: Partial<InvestigateLeadInput>) => {
        setCurrentStep('submitting');
        setIsLoading(true);
        track('lead_investigation_started');
        try {
            const payload: InvestigateLeadInput = {
                name: finalData.name!,
                ...finalData
            };

            const response = await fetch('/api/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    toolId: 'lead-investigator',
                    payload: payload
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Investigation failed');
            }

            const responseData = await response.json();
            setResults(responseData);
            setCurrentStep('results');
            track('lead_investigation_succeeded', { matches: responseData.matches.length });
        } catch (e: any) {
            console.error(e);
            toast({ title: 'Investigation Failed', description: e.message, variant: 'destructive' });
            track('lead_investigation_failed', { error: e.message });
            reset();
        } finally {
            setIsLoading(false);
        }
    }
    
    const reset = () => {
        setCurrentStep('name');
        setFormData({});
        setInputValue('');
        setResults(null);
    }
    
    const handleRefinement = (match: any) => {
        toast({
            title: "Lead Confirmed!",
            description: `${match.name}'s details have been saved to your CRM.`,
            action: <Button size="sm">View in CRM</Button>
        });
        reset();
    }


    const stepConfigData = currentStep !== 'submitting' && currentStep !== 'results' ? stepConfig[currentStep] : null;

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Lead Investigator AI"
                description="Uncover information about any lead. Provide what you know, and the AI will search for the rest."
                icon={<Search className="h-8 w-8" />}
            />
            
            <div className="max-w-2xl mx-auto">
                 <AnimatePresence mode="wait">
                    {currentStep !== 'results' ? (
                         <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {isLoading ? 'Investigating...' : stepConfigData?.label}
                                    </CardTitle>
                                </CardHeader>
                                {stepConfigData && (
                                     <form onSubmit={handleNextStep}>
                                        <CardContent>
                                            <Input 
                                                type={stepConfigData.type}
                                                placeholder={stepConfigData.placeholder}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                autoFocus
                                            />
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            {currentStep !== 'name' && <Button type="button" variant="ghost" onClick={() => setCurrentStep(steps[steps.indexOf(currentStep) - 1])}><ArrowLeft className="mr-2 h-4 w-4"/> Previous</Button>}
                                            <div className="ml-auto flex gap-2">
                                                <Button type="button" variant="secondary" onClick={() => handleSubmit(formData)}>Skip & Search</Button>
                                                <Button type="submit">
                                                    {currentStep === 'role' ? 'Investigate' : 'Next'} <ArrowRight className="ml-2 h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </form>
                                )}
                                {currentStep === 'submitting' && (
                                     <CardContent className="h-24 flex items-center justify-center text-center text-muted-foreground">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                     </CardContent>
                                )}
                            </Card>
                        </motion.div>
                    ) : (
                         <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            {results && <ResultsDisplay results={results} onRefine={handleRefinement} />}
                            <div className="text-center mt-4">
                                <Button onClick={reset}>Start New Investigation</Button>
                            </div>
                         </motion.div>
                    )}
                 </AnimatePresence>
            </div>
        </main>
    );
}
