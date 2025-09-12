
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Search } from 'lucide-react';

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
        <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                placeholder="Search the market or ask the AI anything..."
                className="w-full rounded-full h-14 pl-12 pr-32 text-lg bg-background border-2 border-border focus-visible:ring-primary/50"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10 px-6">
                Search
            </Button>
        </form>
    );
}
