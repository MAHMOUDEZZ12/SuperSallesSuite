
'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Sparkles } from 'lucide-react';
import { ProjectCard } from '@/components/ui/project-card';
import type { Project } from '@/types';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="space-y-8">
        {result.summary && (
            <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-6">
                     <h2 className="text-lg font-semibold text-primary flex items-center gap-2 mb-2">
                        <Sparkles className="h-5 w-5"/> AI Summary
                    </h2>
                    <p className="text-foreground/90">{result.summary}</p>
                </CardContent>
            </Card>
        )}
        
        {result.extractiveAnswers && result.extractiveAnswers.length > 0 && (
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                        Key Insights
                    </h2>
                     <div className="space-y-2 text-sm text-foreground/80">
                        {result.extractiveAnswers.map((answer, index) => (
                           <blockquote key={index} className="border-l-2 border-primary pl-3 italic">
                             &quot;{answer.content}&quot;
                           </blockquote>
                        ))}
                    </div>
                </CardContent>
            </Card>
        )}

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Relevant Projects</h2>
          {result.projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {result.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>No specific projects found matching your query.</p>
            </div>
          )}
        </div>
    </div>
  );
}

function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
        <main className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Market Library Search</h1>
            </div>
            <div className="max-w-xl mx-auto">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search by project name, developer, or area..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full rounded-full h-12 pl-12 pr-28 text-base"
                    />
                     <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-24">Search</Button>
                </form>
            </div>
            <div className="mt-8">
                <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                    <SearchResults />
                </Suspense>
            </div>
        </main>
  );
}

export default function SearchPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
                <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="h-12 w-12 animate-spin" /></div>}>
                    <SearchPageClient />
                </Suspense>
            </div>
            <LandingFooter />
        </div>
    )
}
