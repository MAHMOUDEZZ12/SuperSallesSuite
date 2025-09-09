
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Pen, Upload, Download, Brush, Palette, ImageIcon, Type } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { fileToDataUri } from '@/lib/tools-client';
import { useCanvas } from '@/context/CanvasContext';
import { Textarea } from '@/components/ui/textarea';
import { rebrandBrochure } from '@/ai/flows/rebrand-brochure';
import Image from 'next/image';

const EditInCanvas = ({ brochureUri, onSave, onCancel }: { brochureUri: string; onSave: (instructions: string) => void; onCancel: () => void }) => {
    const [instructions, setInstructions] = useState('');

    const appendInstruction = (instruction: string) => {
        setInstructions(prev => prev ? `${prev}\n- ${instruction}` : `- ${instruction}`);
    };

    return (
        <div className="space-y-4">
            <iframe src={`${brochureUri}#view=fitH`} className="w-full h-[500px] rounded-lg border" />
            <h3 className="font-semibold">Rebranding Instructions</h3>
             <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                <p className="text-sm text-muted-foreground">Use smart tools to build your command or write freely below.</p>
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => appendInstruction("Apply my primary and accent colors to all titles and highlights.")}>
                        <Brush className="mr-2 h-4 w-4"/> Apply Brand Colors
                    </Button>
                     <Button variant="outline" size="sm" onClick={() => appendInstruction("Replace the existing logo with my company logo from my brand kit.")}>
                        <ImageIcon className="mr-2 h-4 w-4"/> Swap Logo
                    </Button>
                     <Button variant="outline" size="sm" onClick={() => appendInstruction("Add my contact details to the footer of every page.")}>
                        <Type className="mr-2 h-4 w-4"/> Add Contact Info
                    </Button>
                     <Button variant="outline" size="sm" onClick={() => appendInstruction("Change the overall font to 'Poppins' to match my brand.")}>
                        <Palette className="mr-2 h-4 w-4"/> Change Font
                    </Button>
                </div>
            </div>
            <Textarea 
                placeholder={`Tell the AI what to change on this brochure...\n\ne.g., "Apply my new blue and gold color scheme. Replace the logo on the first page with my company logo.".`}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={6}
            />
            <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onSave(instructions)}>Rebrand Document</Button>
            </div>
        </div>
    )
}

export default function RebrandingPage() {
    const { toast } = useToast();
    const { openCanvas, closeCanvas } = useCanvas();
    const [isLoading, setIsLoading] = useState(false);
    const [resultData, setResultData] = useState<any | null>(null);
    const [sourceBrochure, setSourceBrochure] = useState<File | null>(null);
    const [sourceBrochureUri, setSourceBrochureUri] = useState<string | null>(null);
  
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSourceBrochure(file);
            const dataUri = await fileToDataUri(file);
            setSourceBrochureUri(dataUri);
            openCanvas(
                <EditInCanvas
                    brochureUri={dataUri}
                    onCancel={closeCanvas}
                    onSave={(instructions) => {
                        handleGenerate(file, instructions);
                        closeCanvas();
                    }}
                />,
                `Rebranding: ${file.name}`,
                "Provide instructions for the AI to rebrand this document."
            );
        }
    };

    const handleGenerate = async (file: File, instructions: string) => {
        setIsLoading(true);
        setResultData(null);
        toast({
            title: 'Rebranding in Progress...',
            description: 'The AI is applying your changes. This may take a few moments.',
        });
        try {
            const brochureUri = await fileToDataUri(file);
            const payload = {
                brochureDataUri: brochureUri,
                contactDetails: "From Brand Kit", // These would be pulled from a user context
                companyName: "From Brand Kit", // These would be pulled from a user context
                toneOfVoice: "Professional", // This could be a user setting
                colors: "From Brand Kit", // This could be a user setting
                deepEditInstructions: instructions,
            };
            
            const response = await rebrandBrochure(payload);
            setResultData(response);
            toast({ title: 'Rebranding Complete!', description: 'Your new brochure is ready and has been saved to your Asset Library.' });

        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Automated Rebranding"
                description="Upload any brochure and open it in the Creative Canvas to apply your brand identity."
                icon={<Palette className="h-8 w-8" />}
            />

            {!sourceBrochureUri && !isLoading && !resultData && (
                <Card className="max-w-xl mx-auto">
                    <CardContent className="p-6">
                        <label
                            htmlFor="brochure-upload"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 transition-colors"
                        >
                            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold">Click to upload your Brochure</h3>
                            <p className="text-sm text-muted-foreground">or drag and drop it here</p>
                            <input id="brochure-upload" type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
                        </label>
                    </CardContent>
                </Card>
            )}
            
            {sourceBrochureUri && !resultData && !isLoading && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Brochure Loaded</CardTitle>
                        <CardDescription>Your brochure is ready for the canvas. Click the button to start editing.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <iframe src={`${sourceBrochureUri}#view=fitH`} className="w-full max-w-lg mx-auto h-[600px] border rounded-lg" />
                         <Button onClick={() => handleFileChange({ target: { files: [sourceBrochure] } } as any)} className="mt-4">
                            <Pen className="mr-2 h-4 w-4" />
                            Re-open in Canvas
                         </Button>
                    </CardContent>
                 </Card>
            )}
            
             {isLoading && (
                 <div className="flex flex-col items-center justify-center text-center h-64">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="font-semibold">The AI is rebranding your document...</p>
                    <p className="text-sm text-muted-foreground">Please wait a moment.</p>
                </div>
              )}

             {resultData && (
                <Card>
                    <CardHeader>
                        <CardTitle>Rebranded Brochure</CardTitle>
                        <CardDescription>Here is the final output from the AI, now saved in your assets.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                         {resultData.logoDataUri && (
                             <div className="mb-4">
                                <h4 className="font-semibold">AI Generated Logo</h4>
                                <Image src={resultData.logoDataUri} alt="AI Generated Logo" width={150} height={75} className="mx-auto bg-muted p-2 rounded-md border" />
                            </div>
                        )}
                        <iframe src={`${resultData.rebrandedBrochureDataUri}#view=fitH`} className="w-full max-w-lg mx-auto h-[600px] border rounded-lg" />
                         <div className="flex justify-center gap-2 mt-4">
                            <a href={resultData.rebrandedBrochureDataUri} download="rebranded-brochure.pdf">
                                <Button variant="outline"><Download className="mr-2"/> Download PDF</Button>
                            </a>
                            <Button onClick={() => handleFileChange({ target: { files: [sourceBrochure] } } as any)} className="mt-0">
                                <Pen className="mr-2 h-4 w-4" />
                                Continue Editing
                             </Button>
                         </div>
                    </CardContent>
                </Card>
             )}
        </main>
    );
}
