
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ProjectCard } from '@/components/ui/project-card';
import { ProviderTile } from '@/components/ui/provider-tile';
import { Check, ChevronRight, X, ArrowLeft, Loader2, Sparkles, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Image from 'next/image';
import { track } from '@/lib/events';
import type { Project } from '@/types';

const MOCK_DEVELOPERS = ['Emaar', 'Damac', 'Sobha', 'Nakheel', 'Meraas', 'Aldar'];

function OnboardingComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const step = parseInt(searchParams.get('step') || '1', 10);
    
    const [isLoading, setIsLoading] = useState(false);
    const [suggestedProjects, setSuggestedProjects] = useState<Project[]>([]);
    const [scannedProjects, setScannedProjects] = useState<Project[]>([]);

    const [draft, setDraft] = useState({
        city: 'Dubai',
        country: 'UAE',
        devFocus: ['Emaar'],
        firstPass: {} as Record<string, 'relevant' | 'not'>,
        scanSelected: [] as string[],
        shortlist: [] as string[],
        brandKit: { logoUrl: null as string | null, colors: { primary: '#36454F', accent: '#98FF98' }, contact: { name: '', phone: '', email: '', whatsappUrl: '' } },
        connections: {} as Record<string, 'connected'|'skipped'>,
        payment: { status: 'skipped' } as { status: 'added'|'skipped' },
        progress: { step: 1, ts: Date.now() },
    });
    
    const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

    // Fetch initial suggestions
    useEffect(() => {
        if (step === 1 && suggestedProjects.length === 0) {
            setIsLoading(true);
            fetch('/api/projects/suggest?devs=Emaar,Damac&limit=2')
                .then(res => res.json())
                .then(data => setSuggestedProjects(data.data || []))
                .catch(err => console.error("Failed to fetch suggestions", err))
                .finally(() => setIsLoading(false));
        }
    }, [step, suggestedProjects.length]);

    // Fetch broader scan when user is on step 4 or has selected developers
    useEffect(() => {
        if (step === 4 && scannedProjects.length === 0) {
            setIsLoading(true);
            const devQuery = draft.devFocus.length > 0 ? `q=${draft.devFocus.join(',')}` : 'q=emaar,damac,sobha,nakheel,meraas,aldar';
            fetch(`/api/projects/scan?${devQuery}&limit=12`)
                .then(res => res.json())
                .then(data => setScannedProjects(data.data || []))
                .catch(err => console.error("Failed to fetch scan", err))
                .finally(() => setIsLoading(false));
        }
    }, [step, draft.devFocus, scannedProjects.length]);

    const updateDraft = (data: Partial<typeof draft>) => {
        setDraft(prev => ({ ...prev, ...data, progress: { step, ts: Date.now() } }));
    };
    
    const handleFileChange = (files: FileList | null) => {
        const file = files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            setLogoPreview(result);
            updateDraft({ brandKit: { ...draft.brandKit, logoUrl: result }});
          };
          reader.readAsDataURL(file);
        }
    };

    const toggleDeveloper = (dev: string) => {
        const newDevs = draft.devFocus.includes(dev)
            ? draft.devFocus.filter(d => d !== dev)
            : [...draft.devFocus, dev];
        updateDraft({ devFocus: newDevs });
        track('onboarding_developer_toggled', { developer: dev, selected: !draft.devFocus.includes(dev) });
    };
    
    const handleFirstPass = (projectName: string, status: 'relevant' | 'not') => {
        updateDraft({ firstPass: { ...draft.firstPass, [projectName]: status } });
        track('onboarding_project_rated', { project: projectName, rating: status });
    };

    const isStep1Complete = draft.devFocus.length > 0 && Object.keys(draft.firstPass).length === suggestedProjects.length && suggestedProjects.length > 0;

    const nextStep = () => {
        track('onboarding_step_completed', { step });
        router.push(`/onboarding?step=${step + 1}`);
    };
    const prevStep = () => {
        track('onboarding_step_navigated_back', { fromStep: step, toStep: step - 1 });
        router.push(`/onboarding?step=${step - 1}`);
    };
    
    const finishOnboarding = () => {
        track('onboarding_completed');
        toast({ title: "Setup Complete!", description: "Welcome to your new dashboard." });
        router.push('/dashboard');
    }
    
    const handleSaveCard = () => {
        track('onboarding_payment_added');
        toast({ title: "Card saved.", description: "You won't be charged now." });
        updateDraft({ payment: { status: 'added' } });
        nextStep();
    }
    
    const handleSkipPayment = () => {
        track('onboarding_payment_skipped');
        updateDraft({ payment: { status: 'skipped'} }); 
        nextStep();
    }
    
    const handleSaveBrand = () => {
        track('onboarding_brand_saved', { hasLogo: !!draft.brandKit.logoUrl, primaryColor: draft.brandKit.colors.primary });
        nextStep();
    }
    
    const handleFinalizeShortlist = () => {
        const selectedProjectObjects = scannedProjects.filter(p => draft.scanSelected.includes(p.id));
        localStorage.setItem('myProjects', JSON.stringify(selectedProjectObjects));
        track('onboarding_shortlist_finalized', { projects: draft.scanSelected, count: draft.scanSelected.length });
        nextStep();
    };


    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Let's build your project library</CardTitle>
                            <CardDescription>We'll start by confirming your market and identifying key developers.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div>
                                <h3 className="font-semibold mb-2">1. Confirm your city</h3>
                                <div className="flex items-center gap-4 rounded-xl border p-4 bg-muted/20">
                                    <p>We found you in: <span className="font-bold text-primary">{draft.city}, {draft.country}</span></p>
                                    <Button variant="ghost" size="sm" className="ml-auto" onClick={() => track('onboarding_city_changed_clicked')}>Change city</Button>
                                    <Button size="sm" onClick={() => track('onboarding_city_confirmed', { city: draft.city, country: draft.country })}>Yes, that's me</Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">2. Which developers do you work with?</h3>
                                <p className="text-sm text-muted-foreground mb-3">Choose 1–3 to start. This helps us find relevant projects.</p>
                                <div className="flex flex-wrap gap-2">
                                    {MOCK_DEVELOPERS.map(dev => (
                                        <button key={dev}
                                            onClick={() => toggleDeveloper(dev)}
                                            aria-pressed={draft.devFocus.includes(dev)}
                                            className={cn("rounded-full border px-3 py-1 text-sm transition-colors", draft.devFocus.includes(dev) ? 'border-primary bg-primary/20 text-primary' : 'border-border hover:bg-muted/50')}>
                                            {dev}
                                        </button>
                                    ))}
                                    <button className="rounded-full border border-dashed px-3 py-1 text-sm text-muted-foreground hover:border-primary hover:text-primary" onClick={() => track('onboarding_add_new_developer_clicked')}>
                                        + Add new
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">3. Are these projects relevant?</h3>
                                {isLoading && suggestedProjects.length === 0 ? (
                                     <div className="flex items-center justify-center h-48 text-muted-foreground">
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        <span>Finding relevant projects for you...</span>
                                     </div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {suggestedProjects.map((proj: Project) => (
                                            <ProjectCard key={proj.id} project={{...proj, badge: 'Suggested'}} actions={
                                                <div className="flex gap-2">
                                                    <Button size="sm" onClick={() => handleFirstPass(proj.name, 'relevant')}>Relevant</Button>
                                                    <Button size="sm" variant="ghost" onClick={() => handleFirstPass(proj.name, 'not')}>Not relevant</Button>
                                                </div>
                                            } />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={nextStep} className="ml-auto" disabled={!isStep1Complete}>Continue <ChevronRight /></Button>
                        </CardFooter>
                    </Card>
                );
            case 2:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Your data. Your control.</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <ul className="space-y-3">
                               <li className="flex items-start gap-3"><Check className="h-5 w-5 text-green-500 mt-1 shrink-0" /><div><span className="font-semibold">We tailor everything to your market.</span><br /><span className="text-muted-foreground">Your city and developer choices help us show you what's relevant.</span></div></li>
                               <li className="flex items-start gap-3"><Check className="h-5 w-5 text-green-500 mt-1 shrink-0" /><div><span className="font-semibold">Your assets stay private.</span><br /><span className="text-muted-foreground">Your data, brand, and contacts are yours alone unless you explicitly publish them.</span></div></li>
                               <li className="flex items-start gap-3"><Check className="h-5 w-5 text-green-500 mt-1 shrink-0" /><div><span className="font-semibold">No charges today.</span><br /><span className="text-muted-foreground">Add a card to enable exports and publishing later. You can cancel anytime.</span></div></li>
                           </ul>
                            <Collapsible>
                                <CollapsibleTrigger className="text-sm text-muted-foreground underline">How we use your data</CollapsibleTrigger>
                                <CollapsibleContent>
                                    <p className="text-sm text-muted-foreground mt-2">We use your data strictly to power your tools. We do not sell your data or use it to train models for other users. Your privacy is paramount.</p>
                                </CollapsibleContent>
                            </Collapsible>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep}><ArrowLeft /> Back</Button>
                            <div className="flex gap-2">
                                 <Button variant="outline" onClick={nextStep}>Skip for now</Button>
                                 <Button onClick={nextStep}>Add Payment Method</Button>
                            </div>
                        </CardFooter>
                    </Card>
                );
            case 3:
                return (
                     <Card>
                        <CardHeader>
                            <CardTitle>Add a payment method</CardTitle>
                            <CardDescription>Used for exports & publishing. No charge to start.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="•••• •••• •••• 4242" />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="expiry">Expires</Label>
                                    <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
                                </div>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="save-card" defaultChecked />
                                <label htmlFor="save-card" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Save as default payment method
                                </label>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                             <Button variant="ghost" onClick={prevStep}><ArrowLeft /> Back</Button>
                            <div className="flex gap-2">
                                 <Button variant="outline" onClick={handleSkipPayment}>Skip for now</Button>
                                 <Button onClick={handleSaveCard}>Save Card</Button>
                            </div>
                        </CardFooter>
                    </Card>
                );
            case 4:
                return (
                     <Card>
                        <CardHeader>
                             <CardTitle>Here's a broader scan based on your choices.</CardTitle>
                            <CardDescription>Select 5-8 projects to build your initial library. This helps the AI understand your focus.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             {isLoading && scannedProjects.length === 0 ? (
                                 <div className="flex items-center justify-center h-64 text-muted-foreground">
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    <span>Scanning our Market Library for 100+ projects based on your preferences...</span>
                                 </div>
                             ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {scannedProjects.map((proj: Project) => (
                                        <ProjectCard 
                                            key={proj.id} 
                                            project={proj} 
                                            selectable 
                                            selected={draft.scanSelected.includes(proj.id)}
                                            onToggle={() => {
                                                const newSelection = draft.scanSelected.includes(proj.id)
                                                    ? draft.scanSelected.filter(p => p !== proj.id)
                                                    : [...draft.scanSelected, proj.id];
                                                updateDraft({ scanSelected: newSelection });
                                            }}
                                        />
                                    ))}
                                </div>
                             )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep}><ArrowLeft /> Back</Button>
                             <div className="flex gap-2">
                                 <Button variant="outline" onClick={nextStep}>Skip</Button>
                                 <Button onClick={handleFinalizeShortlist}>Use Selected ({draft.scanSelected.length})</Button>
                            </div>
                        </CardFooter>
                    </Card>
                );
            case 5:
                return (
                     <Card>
                        <CardHeader>
                            <CardTitle>Make it yours.</CardTitle>
                            <CardDescription>Add your brand to personalize all AI-generated content.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Company Logo</Label>
                                <div className="flex items-center gap-4">
                                    <div className="relative flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:border-primary transition-colors">
                                       <Input id="logo" type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(e.target.files)} />
                                       <label htmlFor="logo" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                         {logoPreview ? (
                                            <Image src={logoPreview} alt="Logo preview" fill={true} className="object-contain rounded-md p-2" />
                                         ) : (
                                           <div className="text-center text-muted-foreground">
                                             <Upload className="mx-auto h-8 w-8 mb-1" />
                                             <p className="text-xs">Drag & drop or click</p>
                                           </div>
                                         )}
                                       </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="extract-colors" />
                                        <label htmlFor="extract-colors" className="text-sm font-medium">
                                            Extract colors from logo
                                        </label>
                                    </div>
                                </div>
                            </div>
                             <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Primary Color</Label>
                                    <Input type="text" placeholder="#000000" value={draft.brandKit.colors.primary} onChange={(e) => updateDraft({ brandKit: {...draft.brandKit, colors: {...draft.brandKit.colors, primary: e.target.value}}})} />
                                </div>
                                 <div className="space-y-2">
                                    <Label>Accent Color</Label>
                                    <Input type="text" placeholder="#FFFFFF" value={draft.brandKit.colors.accent} onChange={(e) => updateDraft({ brandKit: {...draft.brandKit, colors: {...draft.brandKit.colors, accent: e.target.value}}})} />
                                </div>
                             </div>
                             <div className="space-y-2">
                                <Label>Contact Info</Label>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input type="text" placeholder="Your Name" />
                                    <Input type="email" placeholder="Email Address" />
                                    <Input type="tel" placeholder="Phone Number" />
                                    <Input type="url" placeholder="WhatsApp Link (optional)" />
                                </div>
                             </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                             <Button variant="ghost" onClick={prevStep}><ArrowLeft /> Back</Button>
                            <div className="flex gap-2">
                                 <Button variant="outline" onClick={nextStep}>Skip for now</Button>
                                 <Button onClick={handleSaveBrand}>Save Brand</Button>
                            </div>
                        </CardFooter>
                    </Card>
                );
             case 6:
                return (
                     <Card>
                        <CardHeader>
                            <CardTitle>Connect your accounts</CardTitle>
                            <CardDescription>Unlock automations for posting, messaging, and more. You can always do this later.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <ProviderTile name="Instagram" onClick={() => track('onboarding_connect_clicked', { provider: 'instagram' })} />
                                <ProviderTile name="Facebook Page" onClick={() => track('onboarding_connect_clicked', { provider: 'facebook' })} />
                                <ProviderTile name="YouTube" onClick={() => track('onboarding_connect_clicked', { provider: 'youtube' })} />
                                <ProviderTile name="Gmail" onClick={() => track('onboarding_connect_clicked', { provider: 'gmail' })} />
                                <ProviderTile name="WhatsApp Business" onClick={() => track('onboarding_connect_clicked', { provider: 'whatsapp' })} />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep}><ArrowLeft /> Back</Button>
                            <Button onClick={nextStep}>Continue</Button>
                        </CardFooter>
                    </Card>
                );
             case 7:
                 return (
                    <Card className="text-center">
                        <CardHeader>
                             <div className="mx-auto w-fit p-4 bg-primary/10 text-primary rounded-full mb-4">
                                <Sparkles className="h-10 w-10" />
                             </div>
                            <CardTitle>You're all set. Choose your starting plan.</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-muted-foreground">Your brand and project library are ready. You can start for free or pick a plan.</p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <Card className="text-left bg-muted/50 text-center">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Student</CardTitle>
                                        <CardDescription>Learn & build, free domain included.</CardDescription>
                                        <Button className="mt-2" variant="outline" onClick={() => track('onboarding_plan_selected', { plan: 'student' })}>Start Student</Button>
                                    </CardHeader>
                                </Card>
                                 <Card className="text-left border-primary bg-primary/20 text-center">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-primary">Seller</CardTitle>
                                        <CardDescription className="text-primary/80">Publish ready, upgrade later.</CardDescription>
                                        <Button className="mt-2" onClick={() => track('onboarding_plan_selected', { plan: 'seller' })}>Start Seller</Button>
                                    </CardHeader>
                                </Card>
                                 <Card className="text-left bg-muted/50 text-center">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Marketer</CardTitle>
                                        <CardDescription>Run ads, automations & targeting.</CardDescription>
                                         <Button className="mt-2" variant="outline" onClick={() => track('onboarding_plan_selected', { plan: 'marketer' })}>Start Marketer</Button>
                                    </CardHeader>
                                </Card>
                            </div>
                             <p className="text-xs text-muted-foreground">You can always change your plan later. No charges until you confirm.</p>
                        </CardContent>
                        <CardFooter>
                           <Button onClick={finishOnboarding} className="w-full md:w-auto mx-auto" variant="secondary">Finish Setup & Go to Dashboard</Button>
                        </CardFooter>
                    </Card>
                 );
            default:
                return <div>Invalid step</div>;
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 w-full max-w-4xl mx-auto">
            {renderStep()}
        </div>
    );
}


export default function OnboardingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <main className="flex-1 flex items-center justify-center">
                 <Suspense fallback={<Loader2 className="animate-spin h-8 w-8" />}>
                    <OnboardingComponent />
                 </Suspense>
            </main>
        </div>
    )
}
