
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, PenSquare, FileText, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { track } from '@/lib/events';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface GenerateUgcScriptInput {
    productDescription: string;
}

interface ScriptScene {
    'Scene-Name': string;
    'New-Script': string;
}

interface GenerateUgcScriptOutput {
    'Concept-Name': string;
    Script: ScriptScene[];
}

const ResultDisplay = ({ result }: { result: GenerateUgcScriptOutput }) => {
    const { toast } = useToast();
    const copyScript = () => {
        const scriptText = result.Script.map(scene => scene['New-Script']).join('\n');
        navigator.clipboard.writeText(scriptText);
        toast({ title: "Script Copied!", description: "The generated script text has been copied." });
    }
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Generated UGC Script</CardTitle>
                        <CardDescription>Concept: <Badge>{result['Concept-Name']}</Badge></CardDescription>
                    </div>
                     <Button variant="outline" size="sm" onClick={copyScript}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Script
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Scene</TableHead>
                            <TableHead>Script Line</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.Script.map((scene, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{scene['Scene-Name']}</TableCell>
                                <TableCell>{scene['New-Script']}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default function UgcScriptWriterPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerateUgcScriptOutput | null>(null);
    const [productDescription, setProductDescription] = useState('');

    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productDescription.trim()) {
            toast({ title: 'Product Description Required', description: 'Please describe the product you want to create a script for.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResult(null);
        track('ugc_script_generation_started');

        try {
            const payload: GenerateUgcScriptInput = { productDescription };
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    toolId: 'ugc-script-writer',
                    payload 
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'UGC Script generation failed');
            }
            
            const responseData: GenerateUgcScriptOutput = await response.json();
            setResult(responseData);
            track('ugc_script_generation_succeeded');
            toast({ title: 'UGC Script Generated!', description: 'Your authentic ad script is ready.' });
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Generation Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('ugc_script_generation_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="UGC Script Writer"
                description="Generate authentic, user-generated content style video ad scripts using a few-shot prompting technique."
                icon={<PenSquare className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <form onSubmit={handleGeneration}>
                            <CardHeader>
                                <CardTitle>Product Details</CardTitle>
                                <CardDescription>Describe the product you want to advertise.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Label htmlFor="productDescription">Product Description</Label>
                                    <Textarea
                                        id="productDescription"
                                        value={productDescription}
                                        onChange={(e) => setProductDescription(e.target.value)}
                                        placeholder="e.g., An electric toothbrush with 3 modes, a 2-week battery life, and a sleek travel case..."
                                        rows={8}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generating Script...</> : <><Sparkles className="mr-2 h-5 w-5" />Generate Script</>}
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
                                <p className="font-semibold">The AI is writing your script...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        </Card>
                    ) : result ? (
                        <ResultDisplay result={result} />
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center p-6">
                            <FileText className="h-16 w-16 mx-auto mb-4 opacity-10" />
                            <h3 className="text-lg font-semibold text-foreground">Your Script Will Appear Here</h3>
                            <p className="text-muted-foreground">Describe your product to get started.</p>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
