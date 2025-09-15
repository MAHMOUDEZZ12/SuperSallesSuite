
'use client';
import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { MarketSearchInput } from '@/components/ui/market-search-input';
import { BriefingStep } from '@/components/ui/briefing-step';
import { LoginToContinue } from '@/components/ui/login-to-continue';
import { track } from '@/lib/events';
import { runFlow } from '@/lib/flows';

function SearchExperience() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q');
    
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [briefing, setBriefing] = useState<any | null>(null);

    const handleSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery) return;
        
        setIsLoading(true);
        setBriefing(null);
        track('search_executed', { query: searchQuery });
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`, { scroll: false });

        try {
            const response = await runFlow('mainOrchestratorAgent', { command: searchQuery });
            if (response) {
                setBriefing(response);
            } else {
                setBriefing({ content_blocks: [{ type: 'summary', content: `Sorry, I couldn't find any information for "${searchQuery}". Please try another search.` }] });
            }
        } catch (err) {
            console.error(err);
            setBriefing({ content_blocks: [{ type: 'summary', content: `An error occurred while searching for "${searchQuery}".` }] });
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    useEffect(() => {
        if (query) {
            handleSearch(query);
        }
    }, [query, handleSearch]);

    if (!query) {
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
                {briefing?.content_blocks.map((step: any, index: number) => (
                    <motion.div
                        key={`${query}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <BriefingStep step={step} stepNumber={index + 1} />
                    </motion.div>
                ))}
            </AnimatePresence>

            {!isAuthenticated && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (briefing?.content_blocks?.length || 0) * 0.2 }}>
                    <LoginToContinue onLogin={() => setIsAuthenticated(true)} />
                 </motion.div>
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
