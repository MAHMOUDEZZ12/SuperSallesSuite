
'use client';

import React, { useState } from 'react';
import { Input } from './input';
import { Button } from './button';
import { Tabs, TabsList, TabsTrigger } from './tabs';
import { Building, Globe, Wrench, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function MarketSearchInput() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('project');
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    // In a real app, this would route to a more complex search results page.
    // For now, we'll route to the projects finder as a good default.
    router.push(`/dashboard/tool/projects-finder?q=${encodeURIComponent(query)}`);
  };

  const placeholders: { [key: string]: string } = {
    project: 'Search by project name, e.g., "Emaar Beachfront"',
    market: 'Search by market, e.g., "Dubai Marina"',
    feature: 'Search by feature, e.g., "Infinity Pool"',
  };

  return (
    <form
      onSubmit={handleSearch}
      className="max-w-2xl mx-auto rounded-full border bg-background/50 p-2 shadow-lg backdrop-blur-sm"
    >
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto bg-transparent">
            <TabsTrigger value="project" className="rounded-full flex items-center gap-1">
              <Building className="h-4 w-4" /> Project
            </TabsTrigger>
            <TabsTrigger value="market" className="rounded-full flex items-center gap-1">
              <Globe className="h-4 w-4" /> Market
            </TabsTrigger>
            <TabsTrigger value="feature" className="rounded-full flex items-center gap-1">
              <Wrench className="h-4 w-4" /> Feature
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative flex-grow w-full">
          <Input
            type="search"
            placeholder={placeholders[activeTab]}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pl-4 pr-12 h-11"
          />
           <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>
        </div>
      </div>
    </form>
  );
}
