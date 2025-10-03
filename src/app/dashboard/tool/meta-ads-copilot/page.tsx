
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Facebook, Upload, ArrowRight, CheckCircle, Lightbulb, Copy, LayoutDashboard, BarChart2, GalleryVertical, PlusCircle, Send, Link as LinkIcon, MessageCircle, ArrowLeft, Building, Wallet, Calendar, Image as ImageIcon, ThumbsUp, MessageSquare, Share2, FileSignature } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { fileToDataUri } from '@/components/../lib/tools-client';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { createMetaCampaign } from '@/ai/flows/create-meta-campaign';
import { CreateMetaCampaignInput, CreateMetaCampaignOutput } from '@/types';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatePresence, motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useCanvas } from '@/context/CanvasContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const campaignWorkflows = [
    { id: 'Lead Generation to Meta Form', title: 'Leads to Meta Form', description: 'Capture leads with an instant, on-platform form. The simplest way to start.', icon: <FileSignature className="h-5 w-5"/> },
    { id: 'Lead Generation to Landing Page', title: 'Leads to Landing Page', description: 'Drive traffic to a webpage to capture leads. Requires a live landing page.', icon: <LinkIcon className="h-5 w-5"/> },
    { id: 'Lead Generation to WhatsApp', title: 'Leads to WhatsApp', description: 'Start direct conversations with potential buyers. Requires a registered WhatsApp Business number.', icon: <MessageCircle className="h-5 w-5"/> },
    { id: 'Lead Generation to Instagram', title: 'Leads to Instagram DMs', description: 'Engage with users directly in their DMs. Works best with the Instagram Admin tool.', icon: <Facebook className="h-5 w-5"/> },
];

type CampaignStep = 'project' | 'workflow' | 'media' | 'budget' | 'review';


const EditableAdMockup = ({ creative, onUpdate }: { creative: any, onUpdate: (field: string, value: string) => void }) => {
    const { toast } = useToast();
    const [isEditingBody, setIsEditingBody] = React.useState(false);
    const [isEditingHeadline, setIsEditingHeadline] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                toast({ title: "Image Updated", description: "The ad creative visual has been updated." });
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleBrainstorm = () => {
        const suggestions = [
            { headline: "Your Dream Home Awaits", bodyText: "Experience unparalleled luxury and breathtaking views. Tap 'Learn More' to discover your new life at Emaar Beachfront." },
            { headline: "Exclusive Waterfront Living", bodyText: "Discover a new standard of coastal luxury. Limited residences available. Inquire now for exclusive access." },
            { headline: "The Ultimate Investment", bodyText: "Secure your future with a property in Dubai's most sought-after community. High ROI potential. Contact us today." },
        ];
        const currentIndex = suggestions.findIndex(s => s.headline === creative.headline);
        const nextIndex = (currentIndex + 1) % suggestions.length;
        onUpdate('headline', suggestions[nextIndex].headline);
        onUpdate('bodyText', suggestions[nextIndex].bodyText);
        toast({ title: "AI Suggestion Applied!", description: "The ad copy has been updated with a new creative angle." });
    };

    return (
        <Card className="w-full max-w-[380px] mx-auto overflow-hidden font-sans text-sm">
            <CardContent className="p-0">
                <div className="p-3 bg-card">
                    <div className="flex items-center gap-2">
                        <Avatar>
                           <AvatarImage src="https://picsum.photos/seed/brand/40/40" data-ai-hint="logo" />
                            <AvatarFallback>PN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold">Your Page Name</p>
                            <p className="text-xs text-muted-foreground">Sponsored</p>
                        </div>
                    </div>
                     <div className="mt-2" onClick={() => setIsEditingBody(true)}>
                        {isEditingBody ? (
                            <Textarea
                                value={creative.bodyText}
                                onChange={(e) => onUpdate('bodyText', e.target.value)}
                                onBlur={() => setIsEditingBody(false)}
                                autoFocus
                                className="mt-2 text-sm"
                            />
                        ) : (
                            <p className="cursor-text hover:bg-muted/50 p-1 rounded-md">{creative.bodyText}</p>
                        )}
                    </div>
                </div>
                <div className="aspect-square bg-muted flex items-center justify-center relative group">
                    <Input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />
                    <Image 
                        src={imagePreview || 'https://picsum.photos/seed/ad-placeholder/400/400'} 
                        alt="Ad preview" 
                        fill={true} 
                        className="object-cover" 
                        data-ai-hint="lifestyle property"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button variant="secondary" onClick={() => fileInputRef.current?.click()}><Upload className="mr-2 h-4 w-4"/> Upload</Button>
                        <Button variant="secondary" onClick={handleBrainstorm}><Sparkles className="mr-2 h-4 w-4"/> Brainstorm</Button>
                    </div>
                </div>
                 <div className="p-3 bg-card flex justify-between items-center">
                    <div>
                        <p className="text-xs uppercase text-muted-foreground">yourwebsite.com</p>
                        <div onClick={() => setIsEditingHeadline(true)}>
                        {isEditingHeadline ? (
                             <Input 
                                value={creative.headline}
                                onChange={(e) => onUpdate('headline', e.target.value)}
                                onBlur={() => setIsEditingHeadline(false)}
                                autoFocus
                                className="text-base font-bold"
                             />
                        ) : (
                             <h3 className="font-bold text-base cursor-text hover:bg-muted/50 p-1 rounded-md">
                                {creative.headline}
                            </h3>
                        )}
                        </div>
                    </div>
                    <Button variant="secondary" size="sm" className="px-6 h-9 shrink-0">{creative.callToAction}</Button>
                </div>
                <div className="p-2 border-t flex justify-around text-muted-foreground">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2"><ThumbsUp className="h-4 w-4"/> Like</Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2"><MessageSquare className="h-4 w-4"/> Comment</Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2"><Share2 className="h-4 w-4"/> Share</Button>
                </div>
            </CardContent>
        </Card>
    )
}

const ResultDisplay = ({ result: initialResult, toast, onPublish }: { result: CreateMetaCampaignOutput, toast: any, onPublish: (campaign: CreateMetaCampaignOutput) => void }) => {
    const { openCanvas, closeCanvas } = useCanvas();
    const [result, setResult] = useState(initialResult);

    const handlePublish = () => {
        onPublish(result);
    };

    const openCreativeInCanvas = (creativeIndex: number) => {
        const creative = result.adCreatives[creativeIndex];
        openCanvas(
            <EditableAdMockup
                creative={creative}
                onUpdate={(field, value) => {
                    const updatedCreatives = [...result.adCreatives];
                    updatedCreatives[creativeIndex] = { ...updatedCreatives[creativeIndex], [field]: value };
                    setResult(prev => ({...prev!, adCreatives: updatedCreatives}));
                }}
            />,
            "Edit Ad Creative",
            "Make live edits to your ad creative before publishing."
        );
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>Campaign Strategy: {result.campaignName}</CardTitle>
                            <CardDescription>
                                Meta Objective: <Badge>{result.campaignObjective}</Badge>
                            </CardDescription>
                        </div>
                        <Button onClick={handlePublish}>
                            <Send className="mr-2 h-4 w-4"/>
                            Send to Auto-Pilot
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Ad Sets</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {result.adSets.map((adSet, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-base">{adSet.name}</CardTitle>
                                        <CardDescription>Daily Budget: ${adSet.dailyBudget.toFixed(2)}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">{adSet.targetingSummary}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg mb-2">Ad Creatives to Test</h3>
                        <div className="space-y-4">
                             {result.adCreatives.map((creative, index) => (
                                <Card key={index} className="bg-muted/50 hover:bg-muted cursor-pointer" onClick={() => openCreativeInCanvas(index)}>
                                    <CardContent className="p-4">
                                        <p className="font-semibold">Headline: "{creative.headline}"</p>
                                        <p className="text-sm my-2">Body: "{creative.bodyText}"</p>
                                        <p className="text-sm"><span className="font-semibold">Suggested CTA:</span> <Badge variant="secondary">{creative.callToAction}</Badge></p>
                                        <p className="text-sm mt-2 italic text-muted-foreground"><span className="font-semibold not-italic">Image Idea:</span> {creative.imageSuggestion}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card className="bg-primary/10 border-primary/20">
                <CardHeader className="flex-row items-center gap-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    <CardTitle>Optimization Advice</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{result.optimizationAdvice}</p>
                </CardContent>
            </Card>
        </div>
    );
};


export default function CampaignBuilderPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const [result, setResult] = React.useState<CreateMetaCampaignOutput | null>(null);
    const { openCanvas } = useCanvas();

    const [currentStep, setCurrentStep] = React.useState<CampaignStep>('project');
    const [campaignData, setCampaignData] = React.useState<Partial<CreateMetaCampaignInput & { projectId: string, projectBrochureFile: File | null }>>({});

    const handleNextStep = (step: CampaignStep) => {
        setCurrentStep(step);
    };

    const updateCampaignData = (update: Partial<typeof campaignData>) => {
        setCampaignData(prev => ({ ...prev, ...update }));
    };

    const handleGeneration = async () => {
        if (!campaignData.campaignGoal || !campaignData.projectBrochureFile || !campaignData.budget || !campaignData.durationDays) {
            toast({ title: 'Missing Information', description: 'Please complete all steps before generating.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const brochureUri = await fileToDataUri(campaignData.projectBrochureFile);
            
            const payload: CreateMetaCampaignInput = {
                campaignGoal: campaignData.campaignGoal,
                projectBrochureDataUri: brochureUri,
                budget: Number(campaignData.budget),
                durationDays: Number(campaignData.durationDays)
            };
            
            const responseData = await createMetaCampaign(payload);
            setResult(responseData);
            toast({title: "Campaign Strategy Generated!", description: "Review the plan and creatives below. When ready, send it to the Auto-Pilot."})
        } catch (e: any) {
            console.error(e);
            toast({
              title: "Generation Failed",
              description: e.message,
              variant: 'destructive',
          });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendToPilot = (campaignResult: CreateMetaCampaignOutput) => {
        try {
            localStorage.setItem('autopilot_payload', JSON.stringify(campaignResult));
            toast({ 
                title: 'Plan Sent to Auto-Pilot!', 
                description: 'Navigate to the Meta Auto-Pilot to execute the campaign.',
                action: <Link href="/dashboard/tool/meta-auto-pilot"><Button size="sm">Go to Pilot</Button></Link>
            });
        } catch (error) {
            toast({ title: 'Error', description: 'Could not send the plan to the pilot.', variant: 'destructive' });
        }
    };
    
    const renderStepContent = () => {
        switch (currentStep) {
            case 'project':
                return (
                    <div className="space-y-2">
                        <Label htmlFor="projectId">Which project is this campaign for?</Label>
                        <Select onValueChange={(val) => updateCampaignData({ projectId: val })} defaultValue={campaignData.projectId}>
                            <SelectTrigger id="projectId">
                                <SelectValue placeholder="Select a project from your library" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="emaar-beachfront">Emaar Beachfront</SelectItem>
                                <SelectItem value="damac-hills-2">Damac Hills 2</SelectItem>
                                <SelectItem value="sobha-hartland">Sobha Hartland</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                );
            case 'workflow':
                return (
                    <div className="space-y-2">
                        <Label>What is the primary goal of this campaign?</Label>
                        <div className="grid grid-cols-1 gap-2">
                            {campaignWorkflows.map(wf => (
                                <div key={wf.id}>
                                    <button type="button" onClick={() => updateCampaignData({ campaignGoal: wf.id })}
                                        className={cn('w-full flex items-start text-left gap-3 p-3 rounded-lg border transition-colors',
                                            campaignData.campaignGoal === wf.id ? 'bg-primary/10 border-primary' : 'bg-muted/50 hover:bg-muted')}>
                                        {React.cloneElement(wf.icon, { className: 'h-5 w-5 mt-1' })}
                                        <div>
                                            <p className="font-semibold">{wf.title}</p>
                                            <p className="text-xs text-muted-foreground">{wf.description}</p>
                                        </div>
                                    </button>
                                     {wf.id === 'Lead Generation to Landing Page' && campaignData.campaignGoal === wf.id && (
                                        <div className="p-2 text-center">
                                             <Link href="/dashboard/tool/landing-pages">
                                                <Button variant="link" size="sm">Need a page? Build one with AI</Button>
                                             </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'media':
                return (
                    <div className="space-y-2">
                        <Label htmlFor="projectBrochure">Upload the campaign media (Brochure)</Label>
                        <Input id="projectBrochure" type="file" accept=".pdf,.jpg,.png" onChange={(e) => updateCampaignData({ projectBrochureFile: e.target.files?.[0] || null })} />
                        {campaignData.projectBrochureFile && <p className="text-xs text-green-600 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> {campaignData.projectBrochureFile.name} uploaded.</p>}
                         <Button type="button" variant="outline" className="w-full mt-2" onClick={() => openCanvas(<div>Canvas Content for Media Editing</div>, "Edit Media")}>
                            <ImageIcon className="mr-2 h-4 w-4" /> Open in Creative Canvas
                        </Button>
                    </div>
                );
            case 'budget':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="budget">What is the total campaign budget ($)?</Label>
                            <Input id="budget" type="number" placeholder="e.g., 500" value={campaignData.budget || ''} onChange={(e) => updateCampaignData({ budget: Number(e.target.value) })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="durationDays">And for how many days will it run?</Label>
                            <Input id="durationDays" type="number" placeholder="e.g., 14" value={campaignData.durationDays || ''} onChange={(e) => updateCampaignData({ durationDays: Number(e.target.value) })} />
                        </div>
                    </div>
                );
            case 'review':
                return (
                    <div className="space-y-4">
                        <h4 className="font-semibold">Review your campaign setup:</h4>
                        <div className="p-4 border rounded-lg bg-muted/50 space-y-2 text-sm">
                            <p><strong>Project:</strong> {campaignData.projectId || 'Not set'}</p>
                            <p><strong>Workflow:</strong> {campaignData.campaignGoal || 'Not set'}</p>
                            <p><strong>Media:</strong> {campaignData.projectBrochureFile?.name || 'Not set'}</p>
                            <p><strong>Budget:</strong> ${campaignData.budget?.toLocaleString() || 'Not set'} for {campaignData.durationDays || 'N/A'} days</p>
                        </div>
                    </div>
                );
        }
    };

    const getStepButton = () => {
        const steps: CampaignStep[] = ['project', 'workflow', 'media', 'budget', 'review'];
        const currentStepIndex = steps.indexOf(currentStep);

        const isNextDisabled = () => {
            switch(currentStep) {
                case 'project': return !campaignData.projectId;
                case 'workflow': return !campaignData.campaignGoal;
                case 'media': return !campaignData.projectBrochureFile;
                case 'budget': return !campaignData.budget || !campaignData.durationDays;
                default: return false;
            }
        };

        const nextStep = steps[currentStepIndex + 1];
        if (nextStep) {
            return <Button onClick={() => handleNextStep(nextStep)} disabled={isNextDisabled()}>Next <ArrowRight /></Button>;
        }

        return (
            <Button size="lg" onClick={handleGeneration} disabled={isLoading || isNextDisabled()}>
                {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Building Campaign...</> : <><Sparkles className="mr-2 h-5 w-5" />Generate Campaign Structure</>}
            </Button>
        );
    };
    
    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Campaign Builder AI"
                description="Your dedicated suite for Facebook & Instagram advertising. Define, generate, and review your campaign strategy."
                icon={<Facebook className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-6">
                <div className="lg:col-span-1 space-y-8 sticky top-24">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="capitalize">{currentStep} Setup</CardTitle>
                                    <CardDescription>Step {['project', 'workflow', 'media', 'budget', 'review'].indexOf(currentStep) + 1} of 5</CardDescription>
                                </CardHeader>
                                <CardContent className="min-h-[200px]">
                                    {renderStepContent()}
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    {currentStep !== 'project' && <Button variant="ghost" onClick={() => handleNextStep(['project', 'workflow', 'media', 'budget', 'review'][['project', 'workflow', 'media', 'budget', 'review'].indexOf(currentStep) - 1])}><ArrowLeft /> Back</Button>}
                                    <div className="ml-auto">
                                        {getStepButton()}
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="lg:col-span-2">
                    {isLoading && (
                        <Card className="flex items-center justify-center h-96">
                            <div className="text-center text-muted-foreground">
                                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                                <p className="font-semibold">Your AI Co-Pilot is building your campaign...</p>
                                <p className="text-sm">This may take up to a minute.</p>
                            </div>
                        </Card>
                    )}
                    {result ? (
                        <ResultDisplay result={result} toast={toast} onPublish={handleSendToPilot} />
                    ) : !isLoading && (
                        <Card className="flex items-center justify-center h-96 border-dashed">
                            <div className="text-center text-muted-foreground">
                                <Facebook className="h-16 w-16 mx-auto mb-4 opacity-10" />
                                <h3 className="text-lg font-semibold text-foreground">Your Campaign Plan Awaits</h3>
                                <p>Complete the setup steps to let the AI build your path to success.</p>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
