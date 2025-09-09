
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/ui/page-header';
import { Search, Loader2, PlusCircle, Building } from 'lucide-react';
import type { Project } from '@/types';
import { ProjectCard } from '@/components/ui/project-card';
import { useToast } from '@/hooks/use-toast';
import { track } from '@/lib/events';
import { Separator } from '@/components/ui/separator';

export default function MarketLibraryPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [myProjects, setMyProjects] = useState<string[]>([]);

  useEffect(() => {
    // Load projects from localStorage on mount
    const savedProjects = JSON.parse(localStorage.getItem('myProjects') || '[]').map((p: Project) => p.id);
    setMyProjects(savedProjects);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsLoading(true);
    setHasSearched(true);
    setSearchResults([]);
    track('project_finder_searched', { query });

    try {
      const response = await fetch(`/api/projects/scan?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.ok) {
        setSearchResults(data.data);
      } else {
        toast({ title: "Search Failed", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Could not fetch projects.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToLibrary = (project: Project) => {
    track('project_added_to_library', { projectId: project.id, projectName: project.name });
    const currentProjects = JSON.parse(localStorage.getItem('myProjects') || '[]');
    const newProjects = [...currentProjects, project];
    localStorage.setItem('myProjects', JSON.stringify(newProjects));
    setMyProjects(prev => [...prev, project.id]);
    toast({
        title: `${project.name} Added!`,
        description: "The project has been added to your personal library and is now available across the suite.",
    });
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Market Library Access"
        description="Search our intelligent Market Library for verified projects, or add your own off-market deals."
        icon={<Building className="h-8 w-8" />}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
            <CardHeader>
            <CardTitle>Search the Public Market Library</CardTitle>
            <CardDescription>
                Search by project name, developer, area, status, or any other keyword. Our AI continuously watches the market and updates this library.
            </CardDescription>
            </CardHeader>
            <form onSubmit={handleSearch}>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow space-y-2">
                    <Label htmlFor="search-query" className="sr-only">Search Projects</Label>
                    <Input
                    id="search-query"
                    placeholder="Search by name, developer, area (e.g. Dubai Marina), status..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <Button type="submit" className="self-end" disabled={isLoading}>
                    {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                    <Search className="mr-2 h-4 w-4" />
                    )}
                    Search Projects
                </Button>
                </div>
            </CardContent>
            </form>
        </Card>

        {isLoading && (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                <span>Searching the market...</span>
            </div>
        )}

        {hasSearched && !isLoading && (
            <Card>
                <CardHeader>
                    <CardTitle>Search Results for "{query}"</CardTitle>
                    <CardDescription>
                        {searchResults.length > 0 ? `Found ${searchResults.length} projects. Add them to your library to get started.` : 'No projects found matching your query.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {searchResults.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {searchResults.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    actions={
                                        <Button size="sm" onClick={() => handleAddToLibrary(project)} disabled={myProjects.includes(project.id)}>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            {myProjects.includes(project.id) ? 'Added' : 'Add to Library'}
                                        </Button>
                                    }
                                />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        )}
      </div>
    </main>
  );
}
