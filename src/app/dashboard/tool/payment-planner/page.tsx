
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, Percent, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generatePaymentPlan } from '@/ai/flows/generate-payment-plan';
import { GeneratePaymentPlanInput, GeneratePaymentPlanOutput } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';

const ResultDisplay = ({ result }: { result: GeneratePaymentPlanOutput }) => {
    const { toast } = useToast();
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-heading">{result.planName}</CardTitle>
                <CardDescription>{result.planDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="p-3 text-left font-medium">Milestone</th>
                                <th className="p-3 text-left font-medium">Date</th>
                                <th className="p-3 text-right font-medium">Amount (AED)</th>
                                <th className="p-3 text-right font-medium">Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.milestones.map((item: any, index: number) => (
                                <tr key={index} className="border-t">
                                    <td className="p-3 font-medium">{item.milestone}</td>
                                    <td className="p-3 text-muted-foreground">{item.date}</td>
                                    <td className="p-3 text-right font-mono">{item.amount.toLocaleString()}</td>
                                    <td className="p-3 text-right font-mono text-primary">{item.percentage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
            <CardFooter className="gap-2">
                 <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download as PDF</Button>
                 <Button onClick={() => toast({ title: "Plan Saved!", description: "The payment plan has been saved to the project." })}>
                    Save Plan to Project
                </Button>
            </CardFooter>
        </Card>
    );
};


export default function PaymentPlannerPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GeneratePaymentPlanOutput | null>(null);
    const [projectId, setProjectId] = useState('');
    const [totalPrice, setTotalPrice] = useState<number | ''>('');
    const [planType, setPlanType] = useState('');

    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectId || !totalPrice || !planType) {
            toast({ title: 'Missing Information', description: 'Please fill out all fields to generate a plan.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResult(null);
        track('payment_plan_generation_started', { projectId, planType });

        try {
            const payload: GeneratePaymentPlanInput = {
                projectId,
                totalPrice: Number(totalPrice),
                planType,
            };
            const responseData = await generatePaymentPlan(payload);
            setResult(responseData);
            track('payment_plan_generation_succeeded');
            toast({ title: 'Payment Plan Generated!', description: 'Your new client-friendly plan is ready.' });
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Generation Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('payment_plan_generation_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="AI Payment Planner"
                description="Generate a clear, client-friendly payment plan for any property."
                icon={<Percent className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <form onSubmit={handleGeneration}>
                            <CardHeader>
                                <CardTitle>Plan Details</CardTitle>
                                <CardDescription>Define the inputs for the payment plan.</CardDescription>
                            </CardHeader>
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
                                <div className="space-y-2">
                                    <Label htmlFor="totalPrice">Total Property Price (AED)</Label>
                                    <Input
                                        id="totalPrice"
                                        type="number"
                                        value={totalPrice}
                                        onChange={(e) => setTotalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                                        placeholder="e.g., 2500000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="planType">Plan Type</Label>
                                    <Select value={planType} onValueChange={setPlanType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select plan structure" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Standard">Standard (e.g., 20/80)</SelectItem>
                                            <SelectItem value="Post-Handover">Post-Handover</SelectItem>
                                            <SelectItem value="Construction-Linked">Construction-Linked</SelectItem>
                                            <SelectItem value="Flexible (AI Suggestion)">Flexible (AI Suggestion)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-5 w-5" />Generate Plan</>}
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
                                <p className="font-semibold">Your AI Co-Pilot is drafting the plan...</p>
                            </div>
                        </Card>
                    ) : result ? (
                        <ResultDisplay result={result} />
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center p-6">
                            <Percent className="h-16 w-16 mx-auto mb-4 opacity-10" />
                            <h3 className="text-lg font-semibold text-foreground">Your Payment Plan Will Appear Here</h3>
                            <p className="text-muted-foreground">Fill out the details to generate a payment schedule.</p>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
