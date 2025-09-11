
'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Sparkles, Mic, PlusCircle } from 'lucide-react';
import type { Project } from '@/types';
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

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('myProjects') || '[]').map((p: Project) => p.id);
    setMyProjects(savedProjects);
  }, []);

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
  
  const hasQuery = !!searchParams.get('q');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
    }
  };

  return (
        <main className="space-y-8 flex-1 flex flex-col w-full items-center transition-all duration-500 justify-center">
             <div className="max-w-4xl w-full text-center">
                <motion.h1 
                    layout 
                    className="text-3xl md:text-5xl font-bold font-heading tracking-tighter mb-6 text-foreground"
                >
                    Search anything Real Estate Dubai
                </motion.h1>
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search for projects, developers, or market trends..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 text-base bg-background/50 border-border rounded-full shadow-lg backdrop-blur-sm"
                    />
                </form>
            </div>
            <div className="mt-8 flex-1 w-full">
                <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                    <SearchResults />
                </Suspense>
            </div>
        </main>
  );
}

export default function SearchPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
            <div 
              className="absolute inset-0 z-0 opacity-20" 
              style={{
                background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1), transparent 70%)',
                animation: 'pulse 10s infinite'
              }}
            />
             <style jsx global>{`
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
            `}</style>
            <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 flex z-10">
                <Suspense fallback={<div className="flex justify-center items-center h-screen w-full"><Loader2 className="h-12 w-12 animate-spin" /></div>}>
                    <SearchPageClient />
                </Suspense>
            </div>
        </div>
    )
}
