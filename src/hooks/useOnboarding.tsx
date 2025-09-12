
'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { track } from '@/lib/events';
import type { Project } from '@/types';
import { useRouter } from 'next/navigation';

export const MOCK_DEVELOPERS = ['Emaar', 'Damac', 'Sobha', 'Nakheel', 'Meraas', 'Aldar', 'Trafalgar', 'Lennar', 'Vinci'];

type OnboardingStep = 'welcome' | 'location' | 'developers' | 'projects' | 'autosetup' | 'brand' | 'finish';

interface OnboardingState {
    city: string;
    country: string;
    devFocus: string[];
    shortlist: Project[];
    brandKit: {
        logoUrl: string | null;
        colors: { primary: string; accent: string };
        contact: { name: string; phone: string; email: string; whatsappUrl?: string };
    };
}

interface OnboardingContextType {
    step: OnboardingStep;
    state: OnboardingState;
    isLoading: boolean;
    scannedProjects: Project[];
    setStep: (step: OnboardingStep) => void;
    updateState: (update: Partial<OnboardingState> | ((prevState: OnboardingState) => Partial<OnboardingState>)) => void;
    scanProjects: () => Promise<void>;
    finishOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [step, setStep] = useState<OnboardingStep>('welcome');
    const [isLoading, setIsLoading] = useState(false);
    const [scannedProjects, setScannedProjects] = useState<Project[]>([]);
    const [state, setState] = useState<OnboardingState>({
        city: 'Dubai',
        country: 'UAE',
        devFocus: ['Emaar'],
        shortlist: [],
        brandKit: {
            logoUrl: null,
            colors: { primary: '#36454F', accent: '#98FF98' },
            contact: { name: '', phone: '', email: '' },
        },
    });

    const updateState = useCallback((update: Partial<OnboardingState> | ((prevState: OnboardingState) => Partial<OnboardingState>)) => {
        setState(prevState => ({
            ...prevState,
            ...(typeof update === 'function' ? update(prevState) : update),
        }));
    }, []);

    const scanProjects = useCallback(async () => {
        setIsLoading(true);
        track('onboarding_project_scan_started', { developers: state.devFocus });
        try {
            const devQuery = state.devFocus.length > 0 ? `q=${state.devFocus.join(',')}` : 'q=emaar,damac,sobha,nakheel,meraas,aldar';
            const response = await fetch(`/api/projects/scan?${'\'\'\'' + devQuery + '\'\'\''}&limit=12`);
            const data = await response.json();
            if (data.ok && data.data?.projects) {
                setScannedProjects(data.data.projects);
                setStep('projects');
            } else {
                toast({ title: "Scan Failed", description: data.error || "Could not fetch projects.", variant: "destructive" });
            }
        } catch (error: any) {
            toast({ title: "Error", description: error.message || "Could not fetch projects.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    }, [state.devFocus, toast]);
    
    const finishOnboarding = useCallback(() => {
        // Save the final shortlist to localStorage
        if (state.shortlist.length > 0) {
            localStorage.setItem('myProjects', JSON.stringify(state.shortlist));
        }
        track('onboarding_completed', { projectsAdded: state.shortlist.length, brandKitSetup: !!state.brandKit.logoUrl });
        toast({ title: "Setup Complete!", description: "Welcome to your new dashboard." });
        router.push('/dashboard');
    }, [state.shortlist, state.brandKit.logoUrl, toast, router]);

    return (
        <OnboardingContext.Provider value={{ step, state, isLoading, scannedProjects, setStep, updateState, scanProjects, finishOnboarding }}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = (): OnboardingContextType => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
};
