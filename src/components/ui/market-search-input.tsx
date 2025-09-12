
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
        <div className="max-w-4xl mx-auto relative group">
            <form onSubmit={handleSearch} className="relative">
                 <div className="animated-gradient-border-wrapper">
                    <div className="relative z-10 bg-black/90 rounded-lg">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl text-neutral-400/50 pointer-events-none">
                            Search or ask anything about real estate
                        </span>
                        <Input
                            placeholder=""
                            className={cn(
                                "w-full rounded-lg h-14 pl-6 pr-4 text-base bg-transparent border-none text-white focus-visible:ring-0"
                            )}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
