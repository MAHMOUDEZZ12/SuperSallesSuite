
'use client';

import React from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Search, Building, LineChart, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const suggestedProjectPrompts = [
    "Emaar Beachfront apartments",
    "Off-plan villas in Damac Hills 2",
    "Sobha Hartland 3-bedroom units"
];

const suggestedMarketPrompts = [
    "Rental yield in Dubai Marina",
    "Price trends for Downtown apartments",
    "New launches in Business Bay"
];

const suggestedFeaturePrompts = [
    "Rebrand a brochure",
    "Generate an ad for Instagram",
    "Create a landing page"
];

const PromptSuggestion = ({ text, onClick }: { text: string; onClick: (text: string) => void }) => (
    <button onClick={() => onClick(text)} className="text-sm text-muted-foreground hover:text-primary transition-colors text-left p-2 rounded-md hover:bg-muted/50">
        {text}
    </button>
);

export default function MarketSearchInput() {
    const router = useRouter();
    const [query, setQuery] = React.useState('');
    const [activeTab, setActiveTab] = React.useState('project');

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };
    
    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    }

    return (
        <Card className="max-w-3xl mx-auto shadow-2xl shadow-primary/10 border-border/20">
            <CardContent className="p-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                        <TabsTrigger value="project"><Building className="mr-2 h-4 w-4"/>Search Projects</TabsTrigger>
                        <TabsTrigger value="market"><LineChart className="mr-2 h-4 w-4"/>Search Markets</TabsTrigger>
                        <TabsTrigger value="feature"><Sparkles className="mr-2 h-4 w-4"/>Search Features</TabsTrigger>
                    </TabsList>
                    <div className="p-4">
                        <form onSubmit={handleSearch}>
                             <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    placeholder={
                                        activeTab === 'project' ? "Search by project, developer, or area..." :
                                        activeTab === 'market' ? "Search by market trend or location..." :
                                        "Search for a specific tool or feature..."
                                    }
                                    className="w-full rounded-full h-14 pl-12 pr-28 text-base"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    autoFocus
                                />
                                <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10 w-24">Search</Button>
                            </div>
                        </form>
                    </div>
                     <div className="px-4 pb-4">
                        <TabsContent value="project" className="mt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {suggestedProjectPrompts.map(p => <PromptSuggestion key={p} text={p} onClick={handleSuggestionClick} />)}
                            </div>
                        </TabsContent>
                        <TabsContent value="market" className="mt-0">
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {suggestedMarketPrompts.map(p => <PromptSuggestion key={p} text={p} onClick={handleSuggestionClick} />)}
                            </div>
                        </TabsContent>
                         <TabsContent value="feature" className="mt-0">
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {suggestedFeaturePrompts.map(p => <PromptSuggestion key={p} text={p} onClick={handleSuggestionClick} />)}
                            </div>
                        </TabsContent>
                     </div>
                </Tabs>
            </CardContent>
        </Card>
    )
}
