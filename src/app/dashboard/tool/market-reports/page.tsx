
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Wand2, Download, FileText, LineChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';
import Link from 'next/link';

interface GenerateMarketReportInput {
  location: string;
  propertyType: string;
  reportType: 'Investor' | 'Home Buyer' | 'Seller';
}

interface MarketTrend {
  trend: string;
  analysis: string;
}

interface GenerateMarketReportOutput {
  reportTitle: string;
  executiveSummary: string;
  marketTrends: MarketTrend[];
  pricingAnalysis: string;
  futureOutlook: string;
}

const ResultDisplay = ({ result }: { result: GenerateMarketReportOutput }) => {
    return (
      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-heading">{result.reportTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-lg mb-2 text-primary">Executive Summary</h4>
                    <p className="text-foreground/80">{result.executiveSummary}</p>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-2">Key Market Trends</h4>
                    <ul className="space-y-3">
                        {result.marketTrends.map((item, index) => (
                        <li key={index} className="p-3 bg-muted/50 rounded-md border">
                            <p className="font-semibold">{item.trend}</p>
                            <p className="text-sm text-muted-foreground">{item.analysis}</p>
                        </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-2">Pricing Analysis</h4>
                    <p className="text-foreground/80">{result.pricingAnalysis}</p>
                </div>
                
                 <div>
                    <h4 className="font-semibold text-lg mb-2">Future Outlook</h4>
                    <p className="text-foreground/80">{result.futureOutlook}</p>
                </div>
            </CardContent>
             <CardFooter className="gap-2">
                <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Download as PDF</Button>
                 <Link href="/dashboard/tool/email-creator">
                    <Button>Share with Clients</Button>
                </Link>
            </CardFooter>
        </Card>
      </div>
    );
};


export default function MarketReportPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerateMarketReportOutput | null>(null);
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [reportType, setReportType] = useState<'Investor' | 'Home Buyer' | 'Seller' | ''>('');

    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location || !propertyType || !reportType) {
            toast({ title: 'Missing Information', description: 'Please fill out all fields to generate a report.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResult(null);
        track('market_report_generation_started', { location, reportType });

        try {
            const payload: GenerateMarketReportInput = {
                location,
                propertyType,
                reportType,
            };
            
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toolId: 'market-reports', payload }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Market report generation failed.');
            }
            
            const responseData = await response.json();
            setResult(responseData);
            track('market_report_generation_succeeded');
            toast({ title: 'Market Report Generated!', description: 'Your new report is ready for review.'});
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Generation Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('market_report_generation_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="AI Market Reports"
                description="Generate on-demand, data-rich market reports for any location or property type."
                icon={<LineChart className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle>Report Parameters</CardTitle>
                            <CardDescription>Define the scope of your analysis.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleGeneration}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., Dubai Marina, Dubai" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="propertyType">Property Type Focus</Label>
                                    <Input id="propertyType" value={propertyType} onChange={e => setPropertyType(e.target.value)} placeholder="e.g., 2-bedroom apartments" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reportType">Target Audience</Label>
                                    <Select value={reportType} onValueChange={(v) => setReportType(v as any)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an audience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Investor">For an Investor</SelectItem>
                                            <SelectItem value="Home Buyer">For a Home Buyer</SelectItem>
                                            <SelectItem value="Seller">For a Seller</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Analyzing...</> : <><Wand2 className="mr-2 h-5 w-5" />Generate Report</>}
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
                                <p className="font-semibold">Your AI Co-Pilot is analyzing market data...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        </Card>
                    ) : result ? (
                        <ResultDisplay result={result} />
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center p-6">
                            <FileText className="h-16 w-16 mx-auto mb-4 opacity-10" />
                            <h3 className="text-lg font-semibold text-foreground">Your Report Will Appear Here</h3>
                            <p className="text-muted-foreground">Fill out the parameters and let the AI generate your market analysis.</p>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
