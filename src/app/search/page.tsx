
'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { ProjectCard } from '@/components/ui/project-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types';
import { PageHeader } from '@/components/ui/page-header';
import { DashboardFooter } from '@/components/dashboard-footer';
import { DashboardHeader } from '@/components/dashboard-header';

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
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No results found for &quot;{query}&quot;.</p>
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
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
     <div className="flex flex-col min-h-screen">
      <DashboardHeader />
        <main className="flex-1 p-4 md:p-10 space-y-8">
        <PageHeader
            title="Search Market Library"
            description="Search the live market library for verified projects. Find your next opportunity."
            icon={<Search />}
        />
        <div className="max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
            <Input
                placeholder="Search by project name, developer, or area..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow"
            />
            <Button type="submit">Search</Button>
            </form>
        </div>
        <div className="mt-8">
            <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                <SearchResults />
            </Suspense>
        </div>
        </main>
      <DashboardFooter />
    </div>
  );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="h-12 w-12 animate-spin" /></div>}>
            <SearchPageClient />
        </Suspense>
    )
}
