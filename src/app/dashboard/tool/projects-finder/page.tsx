
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

  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDeveloper, setNewProjectDeveloper] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  
  const handleAddCustomProject = (e: React.FormEvent) => {
    e.preventDefault();
     if (!newProjectName || !newProjectDeveloper) {
        toast({ title: "Missing Information", description: "Please provide both a project name and a developer.", variant: "destructive" });
        return;
    }
    const customProject: Project = {
        id: `custom-${Date.now()}`,
        name: newProjectName,
        developer: newProjectDeveloper,
        city: 'Custom',
        country: 'N/A',
        area: 'Custom Project',
        status: 'Active'
    };
    handleAddToLibrary(customProject);
    track('project_added_custom', { projectName: newProjectName });
    setNewProjectName('');
    setNewProjectDeveloper('');
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Market Library Access"
        description="Search our intelligent Market Library for verified projects, or add your own off-market deals."
        icon={<Building className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                <CardTitle>1. Search the Public Market Library</CardTitle>
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

        <div className="lg:col-span-1 space-y-6 sticky top-24">
             <Card>
                <CardHeader>
                    <CardTitle>2. Add a Custom Project</CardTitle>
                    <CardDescription>For off-market deals or private listings. This will only be visible to you.</CardDescription>
                </CardHeader>
                <form onSubmit={handleAddCustomProject}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="custom-project-name">Project Name</Label>
                            <Input id="custom-project-name" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} placeholder="e.g., The Palm Jumeirah Villa" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="custom-project-developer">Developer / Owner</Label>
                            <Input id="custom-project-developer" value={newProjectDeveloper} onChange={e => setNewProjectDeveloper(e.target.value)} placeholder="e.g., Private Owner" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add to My Library
                        </Button>
                    </CardFooter>
                </form>
             </Card>
        </div>
      </div>
    </main>
  );
}
