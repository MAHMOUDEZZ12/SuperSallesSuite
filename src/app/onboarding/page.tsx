
'use client';

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { OnboardingDialog } from '@/components/onboarding-dialog';
import { OnboardingProvider } from '@/hooks/useOnboarding';

function OnboardingComponent() {
    // The main page is now just a host for the provider and dialog.
    // All logic is handled by the useOnboarding hook and its components.
    return (
        <OnboardingProvider>
            <OnboardingDialog />
        </OnboardingProvider>
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
