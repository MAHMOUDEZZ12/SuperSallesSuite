
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mic, ArrowUp } from 'lucide-react';

interface MarketSearchInputProps {
    useSearchPage?: boolean;
}

export default function MarketSearchInput({ useSearchPage = false }: MarketSearchInputProps) {
    const router = useRouter();
    const [query, setQuery] = React.useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const targetPath = useSearchPage ? '/search' : '/market-library';
        if (query.trim()) {
            router.push(`${targetPath}?q=${encodeURIComponent(query)}`);
        }
    };
    
    return (
        <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                    <Input
                        placeholder="Search for projects, developers, market trends..."
                        className="w-full rounded-none h-14 pl-6 pr-4 text-base bg-transparent border-none text-white placeholder:text-neutral-400 focus-visible:ring-0"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}
