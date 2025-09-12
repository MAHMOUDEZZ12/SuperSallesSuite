'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, Palette, Pen, Upload, Download, MonitorPlay, LayoutTemplate, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { generateLandingPage } from '@/ai/flows/generate-landing-page';
import { fileToDataUri } from '@/lib/tools-client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { track } from '@/lib/events';
import { useCanvas } from '@/context/CanvasContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

const visualStyles = [
    { id: "Modern & Minimalist", label: "Modern & Minimalist" },
    { id: "Luxury & Elegant", label: "Luxury & Elegant" },
    { id: "Cozy & Welcoming", label: "Cozy & Welcoming" },
    { id: "Bold & Colorful", label: "Bold & Colorful" },
];

const getStructureLabel = (sections: number): string => {
    switch (sections) {
        case 2: return "Hero + Lead Capture Form";
        case 3: return "Hero + Key Features + Form";
        case 4: return "Hero + Features + Gallery + Form";
        case 5: return "Hero + Features + Gallery + Map + Form";
        default: return "";
    }
};

const EditInCanvas = ({ pageHtml, onSave, onCancel }: { pageHtml: string; onSave: (instructions: string) => void; onCancel: () => void }) => {
    const [instructions, setInstructions] = useState('');
    return (
        <div className="space-y-4">
            <iframe srcDoc={pageHtml} className="w-full h-[500px] rounded-lg border" title="Landing Page Preview"/>
            <h3 className="font-semibold">Editing Instructions</h3>
            <Textarea 
                placeholder={`Tell the AI what to change on this page...\n\ne.g., "Change the hero image to something more modern. Make the primary color a deep blue."`}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={4}
            />
            <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onSave(instructions)}>Update Page</Button>
            </div>
        </div>
    )
}

type Step = 'project' | 'details' | 'style' | 'structure' | 'brochure' | 'review';
const steps: Step[] = ['project', 'details', 'style', 'structure', 'brochure', 'review'];


export default function LandingPageBuilderPage() {
    const { toast } = useToast();
    const { openCanvas, closeCanvas } = useCanvas();
    const [isLoading, setIsLoading] = useState(false);
    const [resultHtml, setResultHtml] = useState<string | null>(null);

    const [currentStep, setCurrentStep] = useState<Step>('project');
    const [formData, setFormData] = useState({
        projectName: '',
        projectDetails: '',
        brandingStyle: [] as string[],
        numberOfSections: 3,
        projectBrochure: null as File | null,
        headlineStrategy: '',
    });
    
    const [headlineOptions, setHeadlineOptions] = useState<any[]>([]);

    const handleNextStep = async () => {
        if (currentStep === 'brochure') {
            await handleReviewStep();
        } else {
            const currentIndex = steps.indexOf(currentStep);
            if (currentIndex < steps.length - 1) {
                setCurrentStep(steps[currentIndex + 1]);
            }
        }
    };

     const handlePrevStep = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };
    
    const handleReviewStep = async () => {
        const { projectName, projectDetails } = formData;
        if (!projectName || !projectDetails ) {
            toast({ title: 'Missing Information', description: 'Please complete all previous steps.', variant: 'destructive' });
            return;
        }
        setIsLoading(true);
        setCurrentStep('review');
        try {
            const payload = {
                projectName: formData.projectName,
                projectDetails: formData.projectDetails,
                generateHeadlinesOnly: true
            };
            // @ts-ignore
            const responseData = await generateLandingPage(payload);
            setHeadlineOptions(responseData.headlineOptions);
        } catch(e) {
            console.error(e);
            toast({ title: 'Error generating strategies', description: 'Could not generate headline strategies.', variant: 'destructive'});
            setCurrentStep('brochure'); // Go back a step on error
        } finally {
            setIsLoading(false);
        }
    }

    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        const { projectName, projectDetails, brandingStyle, headlineStrategy } = formData;
        if (!projectName || !projectDetails || brandingStyle.length === 0 || !headlineStrategy) {
            toast({ title: 'Missing Information', description: 'Please complete all steps and select a strategy.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResultHtml(null);
        track('landing_page_generation_started', { brandingStyle: brandingStyle.join(', ') });

        try {
            const brochureUri = formData.projectBrochure ? await fileToDataUri(formData.projectBrochure) : undefined;
            const selectedHeadline = headlineOptions.find(opt => opt.id === headlineStrategy);

            const payload = {
                projectName: formData.projectName,
                projectDetails: formData.projectDetails,
                brandingStyle: formData.brandingStyle.join(', '),
                numberOfSections: formData.numberOfSections,
                projectBrochureDataUri: brochureUri,
                selectedHeadline: selectedHeadline?.headline,
                selectedCta: selectedHeadline?.cta,
            };
            const responseData = await generateLandingPage(payload);
            setResultHtml(responseData.landingPageHtml);
            track('landing_page_generation_succeeded');
            toast({ title: 'Landing Page Generated!', description: 'Your new page is ready for review and editing in the canvas.'});
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Generation Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('landing_page_generation_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };
    
    const openInCanvas = () => {
        if (!resultHtml) return;
        openCanvas(
            <EditInCanvas
                pageHtml={resultHtml}
                onCancel={closeCanvas}
                onSave={(instructions) => {
                    toast({
                        title: 'Page Update Queued...',
                        description: 'The AI is rebuilding your page with the new instructions.',
                    });
                    console.log('Re-generating with instructions:', instructions);
                    closeCanvas();
                }}
            />,
            `Editing: ${formData.projectName} Landing Page`,
            "Provide instructions to modify your generated page."
        );
    }
    
    const renderStepContent = () => {
      switch(currentStep) {
        case 'project':
          return (
            <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input id="projectName" value={formData.projectName} onChange={e => setFormData({...formData, projectName: e.target.value})} placeholder="e.g., Emaar Beachfront" autoFocus/>
                 <p className="text-xs text-muted-foreground">This name will be used as the main title for the landing page.</p>
            </div>
          );
        case 'details':
          return (
             <div className="space-y-2">
                <Label htmlFor="projectDetails">Offer Details</Label>
                <Textarea id="projectDetails" value={formData.projectDetails} onChange={e => setFormData({...formData, projectDetails: e.target.value})} placeholder="Describe the main offer or message for this page. e.g., 'Luxury 1-3 bedroom apartments with stunning sea views and a 2-year post-handover payment plan...'" rows={4} autoFocus/>
                <p className="text-xs text-muted-foreground">Provide the core message or offer you want to communicate on the page.</p>
            </div>
          );
        case 'style':
           return (
                <div className="space-y-2">
                    <Label>Visual Style(s)</Label>
                    <p className="text-xs text-muted-foreground">Choose one or more styles. The AI will blend them together.</p>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        {visualStyles.map(item => (
                            <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={item.id} 
                                    checked={formData.brandingStyle.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            brandingStyle: checked ? [...prev.brandingStyle, item.id] : prev.brandingStyle.filter(s => s !== item.id)
                                        }));
                                    }}
                                />
                                <label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {item.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'structure':
            return (
                 <div className="space-y-2">
                    <Label>Page Structure</Label>
                    <p className="text-sm text-muted-foreground">Choose the number of content sections for your page.</p>
                     <div className="pt-4 space-y-4">
                        <Slider 
                            defaultValue={[formData.numberOfSections]} 
                            min={2} 
                            max={5} 
                            step={1} 
                            onValueChange={(value) => setFormData({...formData, numberOfSections: value[0]})}
                        />
                        <div className="text-center font-medium text-primary p-2 bg-primary/10 rounded-md">
                           {getStructureLabel(formData.numberOfSections)}
                        </div>
                     </div>
                 </div>
            );
        case 'brochure':
            return (
                <div className="space-y-2">
                    <Label htmlFor="projectBrochure">Brochure (Optional)</Label>
                    <Input id="projectBrochure" type="file" onChange={e => setFormData({...formData, projectBrochure: e.target.files?.[0] || null})} />
                     <p className="text-xs text-muted-foreground">Provide a brochure to give the AI more context about the project's features and visuals.</p>
                     {formData.projectBrochure && <p className="text-sm text-green-600 flex items-center gap-1 mt-2"><CheckCircle className="h-3 w-3" /> {formData.projectBrochure.name} selected.</p>}
                </div>
            );
        case 'review':
             return (
                <div className="space-y-2">
                    <Label>AI Strategy Suggestions</Label>
                    <p className="text-sm text-muted-foreground">The AI has analyzed your offer. Choose a strategic direction for your page's main headline.</p>
                     <RadioGroup onValueChange={(val) => setFormData({...formData, headlineStrategy: val})} className="mt-2 space-y-2">
                        {headlineOptions.map(opt => (
                            <div key={opt.id}>
                                <RadioGroupItem value={opt.id} id={opt.id} className="peer sr-only"/>
                                <Label htmlFor={opt.id} className="flex flex-col p-3 rounded-lg border-2 peer-data-[state=checked]:border-primary hover:border-primary/50 cursor-pointer transition-colors">
                                    <span className="font-semibold text-primary">{opt.strategy}</span>
                                    <span className="text-sm text-foreground">Headline: "{opt.headline}"</span>
                                    <span className="text-xs text-muted-foreground mt-1">CTA: "{opt.cta}"</span>
                                </Label>
                            </div>
                        ))}
                     </RadioGroup>
                </div>
            );
        default:
          return null;
      }
    };


    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Landing Page Builder"
                description="Use the AI to construct your perfect landing page, then open it in the canvas to make live edits."
                icon={<LayoutTemplate className="h-8 w-8" />}
            />
            
            {resultHtml ? (
                <Card className="max-w-5xl mx-auto">
                    <CardHeader>
                        <CardTitle>Live Preview</CardTitle>
                        <CardDescription>Your generated landing page is ready. You can now publish it or edit it in the canvas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg overflow-hidden h-[600px]">
                            <iframe srcDoc={resultHtml} className="w-full h-full" title="Landing Page Preview" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex-wrap gap-2">
                        <Button onClick={openInCanvas}>
                            <Pen className="mr-2" /> Edit in Canvas
                        </Button>
                        <a href={`data:text/html;charset=UTF-8,${encodeURIComponent(resultHtml)}`} download={`${formData.projectName}-landing-page.html`}>
                           <Button variant="outline"><Download className="mr-2" /> Download HTML</Button>
                        </a>
                        <Button onClick={() => toast({title: "Published!", description: "Your landing page is now live."})}>
                            <MonitorPlay className="mr-2" /> Publish Page
                        </Button>
                         <Button variant="ghost" onClick={() => setResultHtml(null)}>
                            <ArrowLeft className="mr-2"/> Start Over
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <Card className="max-w-2xl mx-auto">
                    <form onSubmit={handleGeneration}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                 <CardHeader>
                                    <CardTitle className="capitalize">{currentStep} Setup</CardTitle>
                                    <CardDescription>Step {steps.indexOf(currentStep) + 1} of {steps.length}</CardDescription>
                                </CardHeader>
                                <CardContent className="min-h-[220px]">
                                    {isLoading && currentStep === 'review' ? (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            <Loader2 className="h-6 w-6 animate-spin mr-2"/> Generating strategies...
                                        </div>
                                    ) : (
                                        renderStepContent()
                                    )}
                                </CardContent>
                            </motion.div>
                        </AnimatePresence>
                         <CardFooter className="flex justify-between">
                            <Button type="button" variant="ghost" onClick={handlePrevStep} disabled={currentStep === 'project'}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                            {currentStep === 'review' ? (
                                <Button type="submit" size="lg" disabled={isLoading || !formData.headlineStrategy}>
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Building...</> : <><Wand2 className="mr-2 h-5 w-5" />Generate Page</>}
                                </Button>
                            ) : (
                                <Button type="button" onClick={handleNextStep}>
                                    {currentStep === 'brochure' ? 'Review & Generate' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Card>
            )}
        </main>
    );
}
