
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, Film, MapPin, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';

// Define the types directly in the component
interface GenerateAerialViewInput {
    address: string;
}

interface GenerateAerialViewOutput {
    videoDataUri: string;
    analysis: string;
}

const ResultDisplay = ({ result, address }: { result: GenerateAerialViewOutput; address: string }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Aerial View: {address}</CardTitle>
                <CardDescription>{result.analysis}</CardDescription>
            </CardHeader>
            <CardContent>
                <video key={result.videoDataUri} controls className="w-full rounded-lg border bg-black" crossOrigin="anonymous">
                    <source src={result.videoDataUri} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </CardContent>
            <CardFooter>
                 <a href={result.videoDataUri} download={`aerial_view_${address.replace(/, /g, '_')}.mp4`}>
                    <Button><Download className="mr-2 h-4 w-4"/> Download Video</Button>
                </a>
            </CardFooter>
        </Card>
    );
};

export default function AerialViewGeneratorPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerateAerialViewOutput | null>(null);
    const [address, setAddress] = useState('');

    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address) {
            toast({ title: 'Address Required', description: 'Please enter a property address.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResult(null);
        track('aerial_view_generation_started', { address });
        toast({ title: 'Generating Aerial View...', description: 'This is a complex task and may take up to a minute. Please wait.' });

        try {
            const payload: GenerateAerialViewInput = { address };
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toolId: 'aerial-view-generator',
                    payload: payload,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'API request failed');
            }

            const responseData: GenerateAerialViewOutput = await response.json();
            setResult(responseData);
            track('aerial_view_generation_succeeded');
            toast({ title: 'Aerial View Generated!', description: 'Your cinematic video is ready.' });
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Generation Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('aerial_view_generation_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Aerial View Generator"
                description="Create cinematic, aerial video tours of any property from just an address."
                icon={<Film className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <form onSubmit={handleGeneration}>
                            <CardHeader>
                                <CardTitle>Property Location</CardTitle>
                                <CardDescription>Enter the full address of the property.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g., Burj Khalifa, Dubai, UAE" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generating Video...</> : <><Sparkles className="mr-2 h-5 w-5" />Generate View</>}\
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
                                <p className="font-semibold">The AI is creating your cinematic tour...</p>
                                <p className="text-sm">This may take up to a minute.</p>
                            </div>
                        </Card>
                    ) : result ? (
                        <ResultDisplay result={result} address={address} />
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center p-6">
                            <MapPin className="h-16 w-16 mx-auto mb-4 opacity-10" />
                            <h3 className="text-lg font-semibold text-foreground">Your Aerial Tour Will Appear Here</h3>
                            <p className="text-muted-foreground">Enter an address to get started.</p>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
