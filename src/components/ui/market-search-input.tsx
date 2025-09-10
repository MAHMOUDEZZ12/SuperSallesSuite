
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
        <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search anything in the Dubai real estate market..."
                    className="w-full rounded-full h-14 pl-12 pr-28 text-base"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10 w-24">Search</Button>
            </form>
            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                <span className="text-muted-foreground">Try:</span>
                <button onClick={() => router.push('/search?q=Apartments%20in%20Downtown%20with%20rental%20yield')} className="hover:text-primary transition-colors">Apartments in Downtown with rental yield</button>
                <button onClick={() => router.push('/search?q=Top%20off-plan%20projects%20launching%20this%20month')} className="hover:text-primary transition-colors">Top off-plan projects</button>
                <button onClick={() => router.push('/search?q=Market%20trends%20for%20Business%20Bay%20offices')} className="hover:text-primary transition-colors">Market trends for Business Bay offices</button>
            </div>
        </div>
    );
}
