
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
                        className="w-full rounded-full h-14 pl-6 pr-28 text-base bg-[#303134] border-none text-white placeholder:text-neutral-400"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                         <Button type="button" variant="ghost" size="icon" className="text-neutral-400 hover:text-white rounded-full">
                            <Mic className="h-5 w-5" />
                        </Button>
                        <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-500 rounded-full h-10 w-10">
                            <ArrowUp className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
