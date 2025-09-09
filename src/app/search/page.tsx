
import { Suspense } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Search, Loader2 } from 'lucide-react';
import { ProjectCard } from '@/components/ui/project-card';
import type { Project } from '@/types';

async function fetchSearchResults(query: string): Promise<Project[]> {
    // In a real app, this would be a direct database call for performance.
    // For now, we'll call our own API route.
    // The NEXT_PUBLIC_HOST_URL should be set in environment variables.
    const host = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000';
    try {
        const response = await fetch(`${host}/api/projects/scan?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            console.error("Failed to fetch search results:", response.statusText);
            return [];
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
}

async function SearchResults({ query }: { query: string }) {
    const results = await fetchSearchResults(query);

    return (
        <div className="space-y-8">
            {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {results.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground">
                    <p>No projects found for &quot;{query}&quot;.</p>
                    <p className="text-sm">Try searching for a different developer, area, or project name.</p>
                </div>
            )}
        </div>
    );
}

export default function SearchPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const query = typeof searchParams?.q === 'string' ? searchParams.q : '';

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Market Library Search</h1>
                     {query ? (
                        <p className="text-lg text-muted-foreground">Showing results for: <span className="text-primary font-semibold">&quot;{query}&quot;</span></p>
                     ) : (
                        <p className="text-lg text-muted-foreground">Search for projects, developers, areas, and market trends.</p>
                     )}
                </div>

                <Suspense fallback={
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                        <span>Searching the market...</span>
                    </div>
                    }>
                    {query ? (
                        <SearchResults query={query} />
                    ) : (
                         <div className="text-center py-16 text-muted-foreground">
                            <p>Please enter a search term on the homepage to begin.</p>
                        </div>
                    )}
                </Suspense>
            </main>
            <LandingFooter />
        </div>
    );
}
