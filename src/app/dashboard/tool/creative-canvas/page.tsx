
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Upload, Pen, Loader2, Youtube, FileText, ImageIcon, Brush, Type, Palette, Scissors, Music, Film } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { fileToDataUri } from '@/lib/tools-client';
import { Textarea } from '@/components/ui/textarea';

type MediaType = 'pdf' | 'video' | 'image' | null;

export default function CreativeCanvasPage() {
    const { toast } = useToast();
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [mediaUri, setMediaUri] = useState<string | null>(null);
    const [mediaType, setMediaType] = useState<MediaType>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [instructions, setInstructions] = useState('');

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setMediaFile(file);
        const dataUri = await fileToDataUri(file);
        setMediaUri(dataUri);

        if (file.type.startsWith('image/')) setMediaType('image');
        else if (file.type.startsWith('video/')) setMediaType('video');
        else if (file.type === 'application/pdf') setMediaType('pdf');
        else setMediaType(null);
    };

    const handleGenerate = async () => {
        if (!mediaFile || !instructions) {
            toast({ title: 'Missing Inputs', description: 'Please upload a file and provide instructions.', variant: 'destructive' });
            return;
        }
        setIsLoading(true);
        toast({ title: 'AI Task Started', description: 'The creative canvas AI is processing your request...' });
        
        // This is a placeholder for the actual AI call.
        // A real implementation would call the appropriate flow based on mediaType.
        await new Promise(resolve => setTimeout(resolve, 2500));

        setIsLoading(false);
        toast({ title: 'Processing Complete!', description: 'Your updated asset has been saved to your library.' });
    };

    const getContextualTools = () => {
        switch(mediaType) {
            case 'pdf':
                return (
                     <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" onClick={() => appendInstruction("Apply my primary and accent colors to all titles and highlights.")}><Brush className="mr-2 h-4 w-4"/> Apply Brand Colors</Button>
                        <Button variant="outline" size="sm" onClick={() => appendInstruction("Replace the existing logo with my company logo from my brand kit.")}><ImageIcon className="mr-2 h-4 w-4"/> Swap Logo</Button>
                        <Button variant="outline" size="sm" onClick={() => appendInstruction("Add my contact details to the footer of every page.")}><Type className="mr-2 h-4 w-4"/> Add Contact Info</Button>
                        <Button variant="outline" size="sm" onClick={() => appendInstruction("Change the overall font to 'Poppins' to match my brand.")}><Palette className="mr-2 h-4 w-4"/> Change Font</Button>
                    </div>
                );
            case 'video':
                 return (
                     <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" onClick={() => appendInstruction("Trim the video to keep only the segment from 0:30 to 1:15.")}><Scissors className="mr-2 h-4 w-4"/> Trim Video</Button>
                        <Button variant="outline" size="sm" onClick={() => appendInstruction("Add a text overlay at 0:10 saying '...'")}><Type className="mr-2 h-4 w-4"/> Add Text Overlay</Button>
                        <Button variant="outline" size="sm" onClick={() => appendInstruction("Add upbeat, royalty-free background music.")}><Music className="mr-2 h-4 w-4"/> Change Music</Button>
                        <Button variant="outline" size="sm" onClick={() => appendInstruction("Create a 30-second highlight reel of the best moments.")}><Film className="mr-2 h-4 w-4"/> Create Highlight Reel</Button>
                    </div>
                );
            default:
                return null;
        }
    };
    
    const appendInstruction = (instruction: string) => {
        setInstructions(prev => prev ? `${prev}\n- ${instruction}` : `- ${instruction}`);
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Creative Canvas"
                description="Your unified workspace for all creative tasks. Upload media and command the AI."
                icon={<Brush className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Upload Your Media</CardTitle>
                            <CardDescription>Upload a PDF, video, or image file to begin.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <label htmlFor="media-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 transition-colors">
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <h3 className="text-md font-semibold">{mediaFile ? `${mediaFile.name} Loaded` : 'Click or drag to upload'}</h3>
                                <input id="media-upload" type="file" className="hidden" accept=".pdf,.mp4,.mov,.png,.jpg,.jpeg" onChange={handleFileChange} />
                            </label>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>2. Provide Instructions</CardTitle>
                            <CardDescription>Tell the AI what you want to change.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {mediaType && (
                            <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                                <p className="text-sm text-muted-foreground">Use smart tools to build your command or write freely below.</p>
                                {getContextualTools()}
                            </div>
                           )}
                           <Textarea
                             placeholder="e.g., 'Replace the logo on page 1 and apply my brand colors to the headings...'"
                             value={instructions}
                             onChange={(e) => setInstructions(e.target.value)}
                             rows={8}
                           />
                        </CardContent>
                         <CardFooter>
                            <Button onClick={handleGenerate} disabled={isLoading || !mediaFile || !instructions} className="w-full">
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Pen className="mr-2 h-4 w-4" />}
                                Apply Edits & Generate
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="sticky top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle>Live Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="h-[500px] border rounded-lg bg-muted/20 flex items-center justify-center">
                               {mediaUri ? (
                                   mediaType === 'pdf' ? <iframe src={`${mediaUri}#view=fitH`} className="w-full h-full"/> :
                                   mediaType === 'video' ? <video src={mediaUri} controls className="w-full h-full object-contain bg-black"/> :
                                   mediaType === 'image' ? <img src={mediaUri} alt="Preview" className="w-full h-full object-contain"/> :
                                   <p>Unsupported file type</p>
                               ) : (
                                   <div className="text-center text-muted-foreground">
                                       <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50"/>
                                       <p>Your media will be previewed here.</p>
                                   </div>
                               )}
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
