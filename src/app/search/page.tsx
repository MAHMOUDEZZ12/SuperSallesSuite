
'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Sparkles, Mic, Link as LinkIcon, MoreHorizontal } from 'lucide-react';
import type { Project } from '@/types';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

interface SearchResult {
    summary: string | null;
    projects: Project[];
    extractiveAnswers: any[];
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [result, setResult] = React.useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (query) {
      setIsLoading(true);
      setError(null);
      fetch(`/api/projects/scan?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            setResult(data.data);
          } else {
            setError(data.error || 'An unknown error occurred.');
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="font-semibold">AI is analyzing your query...</p>
        <p className="text-sm">Searching for &quot;{query}&quot; in our market library.</p>
      </div>
    );
  }

  if (error) {
     return (
          <div className="text-center py-16 text-destructive">
            <p>An error occurred: {error}</p>
          </div>
        );
  }
  
  if (!result || (result.projects.length === 0 && !result.summary)) {
     return (
          <div className="text-center py-16 text-muted-foreground">
            <p>No results found for &quot;{query}&quot;.</p>
          </div>
        );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-semibold font-heading">{query}</h1>
            {result.summary && (
                <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">
                    <p>{result.summary}</p>
                </div>
            )}
            
            {result.extractiveAnswers && result.extractiveAnswers.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold font-heading">Key Insights</h2>
                    <div className="space-y-3">
                        {result.extractiveAnswers.map((answer, index) => (
                           <blockquote key={index} className="border-l-2 border-primary pl-4 italic text-foreground/80">
                             &quot;{answer.content}&quot;
                           </blockquote>
                        ))}
                    </div>
                </div>
            )}
        </div>

        <div className="lg:col-span-1 space-y-4">
             <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-sm font-semibold">Sources</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-3">
                     {result.projects.slice(0, 3).map((project) => (
                        <div key={project.id} className="text-sm">
                            <p className="font-semibold truncate text-primary">{project.name}</p>
                            <div className="flex items-center gap-1 text-muted-foreground text-xs">
                                <LinkIcon className="h-3 w-3" />
                                <span>{project.tags?.[0] || 'selltoday.ai'}</span>
                            </div>
                            <p className="text-muted-foreground mt-1 text-xs">{project.developer}</p>
                        </div>
                    ))}
                    {result.projects.length > 3 && (
                        <Button variant="link" size="sm" className="p-0">Show all</Button>
                    )}
                 </CardContent>
             </Card>
        </div>
    </div>
  );
}

function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get('q') || '');
  const [followUp, setFollowUp] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
        <main className="space-y-8 flex-1 flex flex-col">
             <div className="max-w-4xl mx-auto w-full">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search for projects, developers, or area..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 text-base bg-muted/50 border-border"
                    />
                </form>
            </div>
            <div className="mt-8 flex-1">
                <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                    <SearchResults />
                </Suspense>
            </div>
             <div className="sticky bottom-6 mt-auto">
                 <div className="relative max-w-4xl mx-auto">
                    <Input
                        placeholder="Ask anything..."
                        value={followUp}
                        onChange={(e) => setFollowUp(e.target.value)}
                        className="w-full rounded-full h-12 pl-6 pr-24 text-base bg-muted/80 backdrop-blur-sm border-border shadow-lg"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
                            <Mic className="h-5 w-5" />
                        </Button>
                         <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
                            <Sparkles className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </main>
  );
}

export default function SearchPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 flex">
                <Suspense fallback={<div className="flex justify-center items-center h-screen w-full"><Loader2 className="h-12 w-12 animate-spin" /></div>}>
                    <SearchPageClient />
                </Suspense>
            </div>
        </div>
    )
}
