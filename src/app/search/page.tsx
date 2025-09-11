
'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Sparkles, Mic, PlusCircle } from 'lucide-react';
import type { Project } from '@/types';
import { LandingHeader } from '@/components/landing-header';
import { ProjectCard } from '@/components/ui/project-card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { track } from '@/lib/events';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';


interface SearchResult {
    summary: string | null;
    projects: Project[];
    extractiveAnswers: any[];
}

const ProjectCardSkeleton = () => (
    <div className="space-y-2">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
    </div>
);

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [result, setResult] = React.useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [myProjects, setMyProjects] = useState<string[]>([]);
  const { toast } = useToast();

  const [followUpResponse, setFollowUpResponse] = React.useState<string | null>(null);
  const [isFollowUpLoading, setIsFollowUpLoading] = React.useState(false);


   useEffect(() => {
    const handleFollowUp = async (event: CustomEvent) => {
        const { followUpQuery, searchResult } = event.detail;
        if (!followUpQuery || !searchResult) return;

        setIsFollowUpLoading(true);
        setFollowUpResponse(null);

        try {
            const context = `Initial Query: "${query}"\nSummary: ${searchResult.summary}\nProjects Found: ${searchResult.projects.map((p: Project) => p.name).join(', ')}`;
            
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    toolId: 'market-chat-assistant',
                    payload: { message: followUpQuery, context }
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);
            
            setFollowUpResponse(data.reply);

        } catch (e: any) {
            toast({ title: "Follow-up Failed", description: e.message, variant: "destructive" });
        } finally {
            setIsFollowUpLoading(false);
        }
    };
    
    window.addEventListener('submitFollowUp', handleFollowUp as EventListener);
    return () => window.removeEventListener('submitFollowUp', handleFollowUp as EventListener);
  }, [query, toast]);


  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('myProjects') || '[]').map((p: Project) => p.id);
    setMyProjects(savedProjects);
  }, []);

  React.useEffect(() => {
    if (query) {
      setIsLoading(true);
      setError(null);
      setFollowUpResponse(null);
      fetch(`/api/projects/scan?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            setResult(data.data);
            // Dispatch event with initial search result for follow-up context
            window.dispatchEvent(new CustomEvent('searchResultLoaded', { detail: data.data }));
          } else {
            setError(data.error || 'An unknown error occurred.');
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [query]);

  const handleAddToLibrary = (project: Project) => {
    track('project_added_to_library', { projectId: project.id, projectName: project.name });
    const currentProjects = JSON.parse(localStorage.getItem('myProjects') || '[]');
    const newProjects = [...currentProjects, project];
    localStorage.setItem('myProjects', JSON.stringify(newProjects));
    setMyProjects(prev => [...prev, project.id]);
    toast({
        title: `${project.name} Added!`,
        description: "The project has been added to your personal library.",
    });
  }

  if (!query) {
    return null; // Don't render anything if there's no query
  }
  
  if (isLoading) {
    return (
        <div className="space-y-8 mt-8">
             <div className="space-y-6">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
             </div>
             <Separator />
            <div>
                 <Skeleton className="h-6 w-1/4 mb-4" />
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProjectCardSkeleton />
                    <ProjectCardSkeleton />
                    <ProjectCardSkeleton />
                </div>
            </div>
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
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 mt-8"
    >
       <AnimatePresence>
         {(isFollowUpLoading || followUpResponse) && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
            >
                <div className="p-4 bg-primary/10 rounded-lg mb-6 border border-primary/20">
                    <h3 className="font-semibold text-lg text-primary mb-2 flex items-center gap-2"><Sparkles className="h-5 w-5"/> AI Follow-up</h3>
                    {isFollowUpLoading && <div className="flex items-center text-muted-foreground"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Thinking...</div>}
                    {followUpResponse && <p className="text-foreground/90 whitespace-pre-wrap">{followUpResponse}</p>}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

        <div className="space-y-6">
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

        {result.projects.length > 0 && <Separator />}

        <div>
            {result.projects.length > 0 && <h2 className="text-xl font-semibold font-heading mb-4">Relevant Projects</h2>}
             {result.projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {result.projects.map((project) => (
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
            ) : (
                !result.summary && <p className="text-muted-foreground text-center">No specific projects found related to your query.</p>
            )}
        </div>

    </motion.div>
  );
}

function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get('q') || '');
  const [followUpQuery, setFollowUpQuery] = React.useState('');
  const [searchResult, setSearchResult] = React.useState<SearchResult | null>(null);

  useEffect(() => {
     const handleResultLoaded = (event: CustomEvent) => {
        setSearchResult(event.detail);
     };
     window.addEventListener('searchResultLoaded', handleResultLoaded as EventListener);
     return () => window.removeEventListener('searchResultLoaded', handleResultLoaded as EventListener);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        setFollowUpQuery('');
        router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
    }
  };
  
  const handleFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpQuery.trim() && searchResult) {
        window.dispatchEvent(new CustomEvent('submitFollowUp', { detail: { followUpQuery, searchResult } }));
        setFollowUpQuery('');
    }
  };


  return (
        <main className="space-y-8 flex-1 flex flex-col w-full">
             <div className="max-w-4xl mx-auto w-full pt-12">
                <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tighter mb-4 text-foreground text-center">Search anything Real Estate Dubai</h1>
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search for projects, developers, or market trends..."
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
                <form onSubmit={handleFollowUp}>
                    <div className="relative max-w-4xl mx-auto">
                        <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Ask a follow-up question..."
                            value={followUpQuery}
                            onChange={(e) => setFollowUpQuery(e.target.value)}
                            disabled={!searchParams.get('q')}
                            className="w-full rounded-full h-12 pl-12 pr-24 text-base bg-muted/80 backdrop-blur-sm border-border shadow-lg"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
                                <Mic className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </form>
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
