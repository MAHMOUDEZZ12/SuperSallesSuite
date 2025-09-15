
'use client';

import React,  { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { MarketSearchInput } from '@/components/ui/market-search-input';
import { BriefingStep } from '@/components/ui/briefing-step';
import { LoginToContinue } from '@/components/ui/login-to-continue';
import { track } from '@/lib/events';

// MOCK DATA: In a real app, this would come from the AI's structured response.
const mockBriefingSteps = [
    { type: 'summary', content: 'The query for "Emaar Beachfront" shows high investor interest and strong rental yield potential. Here is the top result:' },
    { type: 'listing', data: { id: 'p-1', name: 'Emaar Beachfront Tower 1', developer: 'Emaar', area: 'Dubai Marina', city: 'Dubai', country: 'AE', priceFrom: 'AED 2.5M', status: 'Ready', thumbnailUrl: 'https://picsum.photos/seed/project1/600/400' } },
    { type: 'financials', data: { price: 2500000, rental: 150000, serviceFee: 25000 } },
    // The Login Gate will be inserted after this step
    { type: 'schools', data: { rating: 'Outstanding', distance: '5km' } },
    { type: 'commission', data: { salePrice: 2500000, commissionRate: 2 } },
];


function SearchExperience() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulate auth state
    const [revealedSteps, setRevealedSteps] = useState<number>(0);

    const LOGIN_GATE_POSITION = 3; // Show gate after 3 steps (0, 1, 2)

    useEffect(() => {
        if (query) {
            track('search_executed', { query });
            setIsLoading(true);
            setRevealedSteps(0);
            // Simulate fetching data and revealing the first step
            setTimeout(() => {
                setIsLoading(false);
                setRevealedSteps(1);
            }, 1000);
        } else {
            setIsLoading(false);
        }
    }, [query]);
    
    useEffect(() => {
        // Reveal next step automatically for demo purposes
        if (revealedSteps > 0 && revealedSteps < LOGIN_GATE_POSITION && revealedSteps < mockBriefingSteps.length) {
            const timer = setTimeout(() => setRevealedSteps(revealedSteps + 1), 1500);
            return () => clearTimeout(timer);
        }
    }, [revealedSteps]);


    if (!query) {
        // Render initial search input state if no query
        return (
            <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold font-heading">WhatsMAP</h1>
                <p className="text-xl text-muted-foreground mt-2">The World Spins Knowledge Into Place.</p>
                <div className="mt-8">
                     <MarketSearchInput />
                </div>
            </div>
        )
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    }

    return (
        <div className="space-y-6">
            <AnimatePresence>
                {mockBriefingSteps.slice(0, revealedSteps).map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <BriefingStep step={step} stepNumber={index + 1} />
                    </motion.div>
                ))}
            </AnimatePresence>

            {revealedSteps === LOGIN_GATE_POSITION && !isAuthenticated && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <LoginToContinue onLogin={() => setIsAuthenticated(true)} />
                 </motion.div>
            )}

            {isAuthenticated && revealedSteps >= LOGIN_GATE_POSITION && (
                <AnimatePresence>
                    {mockBriefingSteps.slice(LOGIN_GATE_POSITION).map((step, index) => (
                         <motion.div
                            key={index + LOGIN_GATE_POSITION}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.5 }}
                        >
                            <BriefingStep step={step} stepNumber={index + LOGIN_GATE_POSITION + 1} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-12 md:pt-20">
            <main className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 z-10">
                <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                    <SearchExperience />
                </Suspense>
            </main>
        </div>
    );
}
