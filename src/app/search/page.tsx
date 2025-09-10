
'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { ProjectCard } from '@/components/ui/project-card';
import type { Project } from '@/types';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = React.useState<Project[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (query) {
      setIsLoading(true);
      fetch(`/api/projects/scan?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            setResults(data.data);
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
        <p className="font-semibold">Searching the market for &quot;{query}&quot;...</p>
      </div>
    );
  }

  return (
    <div>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>No results found for &quot;{query}&quot;.</p>
          </div>
        )}
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
                <p className="text-muted-foreground">Search results for the live market library.</p>
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
