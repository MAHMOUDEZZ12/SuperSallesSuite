
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, User, Mic, Video, Download, Play, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { generateVideoPresenter } from '@/ai/flows/generate-video-presenter';
import { GenerateVideoPresenterInput, GenerateVideoPresenterOutput } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { track } from '@/lib/events';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const sampleCharacters = [
  { id: 'male-1', name: 'David Chen', description: 'A confident, friendly male presenter in his early 40s, Asian ethnicity, wearing a smart business casual outfit.', imageUri: 'https://picsum.photos/seed/david/200/200' },
  { id: 'female-1', name: 'Aisha Khan', description: 'A warm, professional female presenter in her late 30s, of Middle Eastern descent, wearing elegant business attire.', imageUri: 'https://picsum.photos/seed/aisha/200/200' },
  { id: 'male-2', name: 'James Smith', description: 'A trustworthy, experienced male presenter in his 50s, Caucasian, with a classic suit and tie.', imageUri: 'https://picsum.photos/seed/james/200/200' },
  { id: 'female-2', name: 'Maria Garcia', description: 'An energetic and bright female presenter in her early 30s, Hispanic, with a modern and stylish look.', imageUri: 'https://picsum.photos/seed/maria/200/200' },
];

type PresenterStep = 'character' | 'script' | 'generate';

export default function AiVideoPresenterPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerateVideoPresenterOutput | null>(null);
    const [currentStep, setCurrentStep] = useState<PresenterStep>('character');

    const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
    const [customCharacterDescription, setCustomCharacterDescription] = useState('');
    const [script, setScript] = useState('');

    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!script) {
            toast({ title: 'Script is required', description: 'Please enter a script for the presenter.', variant: 'destructive' });
            return;
        }
        if (!selectedCharacter && !customCharacterDescription) {
             toast({ title: 'Character is required', description: 'Please select a sample character or describe a custom one.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResult(null);
        track('video_presenter_generation_started');

        try {
            const payload: GenerateVideoPresenterInput = {
                script,
                characterImageUri: selectedCharacter?.imageUri,
                characterDescription: customCharacterDescription,
            };
            const responseData = await generateVideoPresenter(payload);
            setResult(responseData);
            track('video_presenter_generation_succeeded');
            toast({ title: 'Video Generated!', description: 'Your AI presenter video is ready.' });
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Generation Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('video_presenter_generation_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };
    
    const renderStepContent = () => {
        switch (currentStep) {
            case 'character':
                return (
                    <div className="space-y-6">
                        <div>
                            <Label>Choose a Sample Presenter</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                {sampleCharacters.map((char) => (
                                    <div key={char.id} onClick={() => { setSelectedCharacter(char); setCustomCharacterDescription(''); }}
                                        className={cn("relative rounded-lg border-2 p-2 cursor-pointer transition-all", selectedCharacter?.id === char.id ? 'border-primary ring-2 ring-primary' : 'border-transparent hover:border-primary/50')}>
                                        <Image src={char.imageUri} alt={char.name} width={200} height={200} className="w-full rounded-md aspect-square object-cover" />
                                        <p className="text-center font-medium text-sm mt-2">{char.name}</p>
                                        {selectedCharacter?.id === char.id && <CheckCircle className="absolute -top-2 -right-2 h-6 w-6 text-primary bg-background rounded-full" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="text-center text-muted-foreground font-semibold">OR</div>
                        <div>
                            <Label htmlFor="customCharacter">Create a Custom Presenter</Label>
                            <Input id="customCharacter" placeholder="e.g., a friendly female agent in her 30s with blonde hair" value={customCharacterDescription} onChange={(e) => { setCustomCharacterDescription(e.target.value); setSelectedCharacter(null); }} />
                        </div>
                    </div>
                );
            case 'script':
                return (
                    <div>
                        <Label htmlFor="script">Enter the Presenter's Script</Label>
                        <Textarea id="script" value={script} onChange={(e) => setScript(e.target.value)} placeholder="e.g., Welcome to Emaar Beachfront, where luxury meets the sea..." rows={10} />
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="AI Video Presenter"
                description="Create a lifelike AI presenter to deliver your project pitch or market update."
                icon={<Video className="h-8 w-8" />}
            />

             <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="max-w-4xl mx-auto">
                        <form onSubmit={handleGeneration}>
                            <CardHeader>
                                <CardTitle className="capitalize flex items-center gap-2">
                                    {currentStep === 'character' ? <User className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                                    {currentStep} Setup
                                </CardTitle>
                                <CardDescription>Step {currentStep === 'character' ? 1 : 2} of 2</CardDescription>
                            </CardHeader>
                            <CardContent className="min-h-[300px]">
                                {renderStepContent()}
                            </CardContent>
                             <CardFooter className="flex justify-between">
                                <Button type="button" variant="ghost" onClick={() => setCurrentStep('character')} disabled={currentStep === 'character'}>
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Character
                                </Button>
                                {currentStep === 'character' ? (
                                    <Button type="button" onClick={() => setCurrentStep('script')} disabled={!selectedCharacter && !customCharacterDescription}>
                                        Next to Script <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button type="submit" size="lg" disabled={isLoading}>
                                        {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-5 w-5" />Generate Video</>}
                                    </Button>
                                )}
                            </CardFooter>
                        </form>
                    </Card>
                </motion.div>
             </AnimatePresence>

            {isLoading && (
                <Card className="flex flex-col items-center justify-center h-96 border-dashed">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                    <p className="mt-4 font-semibold text-lg">Your video is being generated...</p>
                    <p className="text-muted-foreground">This is a complex task and may take several minutes.</p>
                </Card>
            )}

            {result && (
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle>Your AI Presenter is Ready!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <video key={result.videoUrl} controls className="w-full rounded-lg border bg-black" crossOrigin="anonymous">
                            <source src={result.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                         <audio key={result.audioDataUri} controls className="w-full mt-4" src={result.audioDataUri}>
                            Your browser does not support the audio element.
                        </audio>
                         <p className="text-xs text-muted-foreground mt-2 text-center">Note: Video and audio are generated separately. Combine them in your favorite video editor.</p>
                    </CardContent>
                    <CardFooter className="gap-2">
                        <a href={result.videoUrl} download="presenter_video.mp4">
                           <Button variant="outline"><Download className="mr-2" /> Download Video</Button>
                        </a>
                         <a href={result.audioDataUri} download="presenter_audio.wav">
                           <Button variant="outline"><Download className="mr-2" /> Download Audio</Button>
                        </a>
                    </CardFooter>
                </Card>
            )}
        </main>
    );
}

    