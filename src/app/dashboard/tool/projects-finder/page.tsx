
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

export default function ProjectsFinderPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDeveloper, setNewProjectDeveloper] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsLoading(true);
    setHasSearched(true);
    setSearchResults([]);

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

  const handleNewProjectSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newProjectName || !newProjectDeveloper) {
          toast({ title: "Missing Information", description: "Please provide both a project name and a developer.", variant: "destructive" });
          return;
      }
      setIsSubmitting(true);
      setTimeout(() => {
        toast({
            title: "Screening Request Submitted!",
            description: `We're now screening the market for "${newProjectName}". We'll notify you when it's verified and added to your library.`,
        });
        setNewProjectName('');
        setNewProjectDeveloper('');
        setIsSubmitting(false);
    }, 1500);

  }

  const handleAddToLibrary = (project: Project) => {
    toast({
        title: `${project.name} Added!`,
        description: "The project has been added to your personal library.",
    });
    // In a real app, this would update user's library in the backend
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Market Library Access"
        description="Search our intelligent Market Library for verified projects. Add them to your personal library to use across the suite."
        icon={<Building className="h-8 w-8" />}
      />

      <Card>
        <CardHeader>
          <CardTitle>Search the Market Library</CardTitle>
          <CardDescription>
            Search by project name, developer, area, status, or any other keyword.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSearch}>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow space-y-2">
                <Label htmlFor="search-query" className="sr-only">Search Projects</Label>
                <Input
                  id="search-query"
                  placeholder="Search by name, developer, area, status..."
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
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {searchResults.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                actions={
                                    <Button size="sm" onClick={() => handleAddToLibrary(project)}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add to Library
                                    </Button>
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center bg-muted/50 rounded-lg">
                        <h3 className="text-lg font-semibold">Can't find your project?</h3>
                        <p className="text-muted-foreground mt-1 mb-4">Submit it for AI screening. We'll find it, verify it, and add it to the Market Library.</p>
                        <form onSubmit={handleNewProjectSubmit} className="max-w-md mx-auto space-y-4 text-left">
                            <div className="space-y-2">
                                <Label htmlFor="new-project-name">Project Name</Label>
                                <Input id="new-project-name" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} placeholder="e.g., Azure Lofts" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="new-project-developer">Developer</Label>
                                <Input id="new-project-developer" value={newProjectDeveloper} onChange={e => setNewProjectDeveloper(e.target.value)} placeholder="e.g., Emaar" required />
                            </div>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Submit for Screening
                            </Button>
                        </form>
                    </div>
                )}
            </CardContent>
        </Card>
      )}
    </main>
  );
}
