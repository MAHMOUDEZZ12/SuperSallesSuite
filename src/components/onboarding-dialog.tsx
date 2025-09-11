
'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useOnboarding, MOCK_DEVELOPERS } from '@/hooks/useOnboarding';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, MapPin, Building, Briefcase, Palette, CheckCircle, ArrowRight, ArrowLeft, Loader2, Upload } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { ProjectCard } from './ui/project-card';
import type { Project } from '@/types';
import Image from 'next/image';

const SlideWrapper = ({ children, slideKey }: { children: React.ReactNode; slideKey: string }) => (
    <motion.div
        key={slideKey}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 right-0 bottom-0"
    >
        {children}
    </motion.div>
);

const WelcomeSlide = () => (
    <div className="text-center flex flex-col justify-center items-center h-full">
        <div className="mx-auto w-fit p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Sparkles className="h-10 w-10" />
        </div>
        <DialogTitle className="text-2xl">Welcome to WhatsMAP</DialogTitle>
        <DialogDescription className="mt-2 max-w-sm mx-auto">Let's set up your intelligent workspace. It only takes a minute.</DialogDescription>
    </div>
);

const LocationSlide = () => {
    const { state } = useOnboarding();
    return (
        <div className="flex flex-col justify-center h-full">
            <DialogTitle className="text-2xl mb-4">Confirm your market</DialogTitle>
            <div className="flex items-center gap-4 rounded-xl border p-4 bg-muted/50">
                <MapPin className="h-6 w-6 text-primary"/>
                <p>We've set your primary market to: <span className="font-bold text-foreground">{state.city}, {state.country}</span></p>
            </div>
             <p className="text-xs text-muted-foreground mt-2">You can change this later in settings.</p>
        </div>
    )
};

const DevelopersSlide = () => {
    const { state, updateState } = useOnboarding();
    const toggleDeveloper = (dev: string) => {
        const newDevs = state.devFocus.includes(dev)
            ? state.devFocus.filter(d => d !== dev)
            : [...state.devFocus, dev];
        updateState({ devFocus: newDevs });
    };
    return (
        <div className="flex flex-col justify-center h-full">
            <DialogTitle className="text-2xl mb-2">Which developers do you focus on?</DialogTitle>
            <DialogDescription className="mb-6">Choose 1-3 to start. This helps us find relevant projects for you.</DialogDescription>
             <div className="flex flex-wrap gap-2">
                {MOCK_DEVELOPERS.map(dev => (
                    <button key={dev} onClick={() => toggleDeveloper(dev)} aria-pressed={state.devFocus.includes(dev)}
                        className={cn("rounded-full border px-4 py-1.5 text-sm font-medium transition-colors", state.devFocus.includes(dev) ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted/50')}>
                        {dev}
                    </button>
                ))}
                <button className="rounded-full border border-dashed px-4 py-1.5 text-sm text-muted-foreground hover:border-primary hover:text-primary">
                    + Add another
                </button>
            </div>
        </div>
    );
};

const ProjectsSlide = () => {
    const { state, updateState, scannedProjects, isLoading } = useOnboarding();
    const toggleSelection = (project: Project) => {
        const isSelected = state.shortlist.some(p => p.id === project.id);
        const newShortlist = isSelected
            ? state.shortlist.filter(p => p.id !== project.id)
            : [...state.shortlist, project];
        updateState({ shortlist: newShortlist });
    };
    
     if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                <Loader2 className="mr-3 h-6 w-6 animate-spin text-primary" />
                <span>Scanning our Market Library for projects...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
             <DialogTitle className="text-2xl mb-2">Build your initial library</DialogTitle>
            <DialogDescription className="mb-6">We found these projects based on your choices. Select a few to add to your personal library.</DialogDescription>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-2 flex-grow">
                {scannedProjects.map((proj) => (
                    <ProjectCard 
                        key={proj.id} 
                        project={proj} 
                        selectable 
                        selected={state.shortlist.some(p => p.id === proj.id)}
                        onToggle={() => toggleSelection(proj)}
                    />
                ))}
            </div>
        </div>
    );
};

const BrandSlide = () => {
    const { state, updateState } = useOnboarding();
    const [logoPreview, setLogoPreview] = useState<string | null>(state.brandKit.logoUrl);

    const handleFileChange = (files: FileList | null) => {
        const file = files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            setLogoPreview(result);
            updateState(prev => ({ brandKit: { ...prev.brandKit, logoUrl: result }}));
          };
          reader.readAsDataURL(file);
        }
    };
    return (
        <div className="flex flex-col justify-center h-full">
            <DialogTitle className="text-2xl mb-2">Make it yours</DialogTitle>
            <DialogDescription className="mb-6">Add your brand to personalize all AI-generated content. You can skip this and do it later.</DialogDescription>
            <div className="space-y-4">
                 <div className="space-y-2">
                    <Label>Company Logo (Optional)</Label>
                     <div className="relative flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:border-primary transition-colors">
                       <Input id="logo" type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(e.target.files)} />
                       <label htmlFor="logo" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                         {logoPreview ? (
                            <Image src={logoPreview} alt="Logo preview" fill={true} className="object-contain rounded-md p-2" />
                         ) : (
                           <div className="text-center text-muted-foreground">
                             <Upload className="mx-auto h-8 w-8 mb-1" />
                             <p className="text-xs">Click to upload</p>
                           </div>
                         )}
                       </label>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label>Primary Color</Label>
                        <Input type="text" value={state.brandKit.colors.primary} onChange={(e) => updateState(prev => ({ brandKit: {...prev.brandKit, colors: {...prev.brandKit.colors, primary: e.target.value}}}))} />
                    </div>
                     <div className="space-y-2">
                        <Label>Accent Color</Label>
                        <Input type="text" value={state.brandKit.colors.accent} onChange={(e) => updateState(prev => ({ brandKit: {...prev.brandKit, colors: {...prev.brandKit.colors, accent: e.target.value}}}))} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FinishSlide = () => (
     <div className="text-center flex flex-col justify-center items-center h-full">
        <div className="mx-auto w-fit p-4 bg-green-500/10 text-green-500 rounded-full mb-4">
            <CheckCircle className="h-10 w-10" />
        </div>
        <DialogTitle className="text-2xl">You're all set!</DialogTitle>
        <DialogDescription className="mt-2 max-w-sm mx-auto">Your intelligent workspace is ready. Let's start selling.</DialogDescription>
    </div>
);


export const OnboardingDialog = () => {
    const { step, setStep, scanProjects, finishOnboarding, isLoading, state } = useOnboarding();
    const isDialogOpen = step !== 'finish' || isLoading;

    const handleNext = async () => {
        switch (step) {
            case 'welcome': setStep('location'); break;
            case 'location': setStep('developers'); break;
            case 'developers': await scanProjects(); break;
            case 'projects': setStep('brand'); break;
            case 'brand': setStep('finish'); break;
        }
    };
    
    const handleBack = () => {
         switch (step) {
            case 'location': setStep('welcome'); break;
            case 'developers': setStep('location'); break;
            case 'projects': setStep('developers'); break;
            case 'brand': setStep('projects'); break;
        }
    };
    
    const renderContent = () => {
        switch (step) {
            case 'welcome': return <WelcomeSlide />;
            case 'location': return <LocationSlide />;
            case 'developers': return <DevelopersSlide />;
            case 'projects': return <ProjectsSlide />;
            case 'brand': return <BrandSlide />;
            case 'finish': return <FinishSlide />;
            default: return null;
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={(open) => !open && finishOnboarding()}>
            <DialogContent className="sm:max-w-2xl h-[500px] flex flex-col p-8">
                <div className="flex-grow relative">
                    <AnimatePresence mode="wait">
                       <SlideWrapper slideKey={step}>
                         {renderContent()}
                       </SlideWrapper>
                    </AnimatePresence>
                </div>
                <DialogFooter className="mt-auto pt-6">
                    {step !== 'welcome' && step !== 'finish' && (
                         <Button variant="ghost" onClick={handleBack} disabled={isLoading}>
                             <ArrowLeft className="mr-2 h-4 w-4"/> Back
                         </Button>
                    )}
                     <div className="ml-auto flex items-center gap-2">
                         {step === 'projects' && <Button variant="outline" onClick={() => setStep('brand')}>Skip</Button>}
                         {step === 'brand' && <Button variant="outline" onClick={() => setStep('finish')}>Skip & Finish</Button>}
                        
                        {step !== 'finish' ? (
                            <Button onClick={handleNext} disabled={isLoading || (step === 'developers' && state.devFocus.length === 0)}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                                {step === 'welcome' ? "Let's Go" : "Continue"}
                                <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        ) : (
                             <Button size="lg" onClick={finishOnboarding} disabled={isLoading}>
                                Go to Dashboard
                             </Button>
                        )}
                     </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
