
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function MarketSearchInput() {
    const router = useRouter();
    const [query, setQuery] = React.useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };
    
    return (
        <div className="max-w-3xl mx-auto relative group">
            <form onSubmit={handleSearch} className="relative">
                <div className="relative bg-black/70 rounded-lg p-px overflow-hidden">
                    <div className="absolute inset-0.5 animated-gradient-background opacity-0 group-hover:opacity-20 group-focus-within:opacity-20 transition-opacity duration-300 rounded-lg" />
                     <span className="absolute left-6 top-1/2 -translate-y-1/2 text-base text-neutral-400/50 pointer-events-none">
                        Search or Ask anything about real EState.
                    </span>
                    <Input
                        placeholder=""
                        className={cn(
                            "relative w-full rounded-lg h-14 pl-6 pr-4 text-base bg-transparent border-none text-white focus-visible:ring-0"
                        )}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}
