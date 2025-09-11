
'use client';

import React,  { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Mic, ArrowUp } from 'lucide-react';
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
    <div className="relative overflow-hidden rounded-lg p-px shadow-lg bg-gradient-to-r from-blue-500/20 to-cyan-400/20">
       <div className="relative rounded-lg bg-gray-900 p-4 space-y-2 h-full">
         <Skeleton className="h-40 w-full bg-gray-700" />
         <Skeleton className="h-4 w-3/4 bg-gray-700" />
         <Skeleton className="h-4 w-1/2 bg-gray-700" />
       </div>
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
    return null;
  }
  
  if (isLoading) {
    return (
        <div className="space-y-8 mt-8">
             <div className="space-y-6">
                <Skeleton className="h-8 w-2/3 bg-gray-700" />
                <Skeleton className="h-5 w-full bg-gray-700" />
                <Skeleton className="h-5 w-5/6 bg-gray-700" />
             </div>
             <Separator className="bg-gray-700" />
            <div>
                 <Skeleton className="h-6 w-1/4 mb-4 bg-gray-700" />
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
          <div className="text-center py-16 text-red-400">
            <p>An error occurred: {error}</p>
          </div>
        );
  }
  
  if (!result || (result.projects.length === 0 && !result.summary)) {
     return (
          <div className="text-center py-16 text-gray-400">
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
                <div className="prose prose-lg prose-invert max-w-none text-gray-200">
                    <p>{result.summary}</p>
                </div>
            )}
            
            {result.extractiveAnswers && result.extractiveAnswers.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold font-heading text-gray-100">Key Insights</h2>
                    <div className="space-y-3">
                        {result.extractiveAnswers.map((answer, index) => (
                           <blockquote key={index} className="border-l-2 border-primary pl-4 italic text-gray-300">
                             &quot;{answer.content}&quot;
                           </blockquote>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {result.projects.length > 0 && <Separator className="bg-gray-700" />}

        <div>
            {result.projects.length > 0 && <h2 className="text-xl font-semibold font-heading mb-4 text-gray-100">Relevant Projects</h2>}
             {result.projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {result.projects.map((project) => (
                        <ProjectCard 
                          key={project.id} 
                          project={project}
                          isAdded={myProjects.includes(project.id)}
                          onAdd={() => handleAddToLibrary(project)}
                        />
                    ))}
                </div>
            ) : (
                !result.summary && <p className="text-gray-400 text-center">No specific projects found related to your query.</p>
            )}
        </div>
    </motion.div>
  );
}

function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get('q') || '');
  const [isFocused, setIsFocused] = React.useState(false);
  const hasQuery = !!searchParams.get('q');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
    }
  };

  return (
        <div className="flex-1 flex flex-col w-full transition-all duration-500 pt-0.5">
             <motion.div 
                layout
                transition={{ duration: 0.5, type: 'spring', stiffness: 50 }}
                className="w-full max-w-3xl mx-auto text-center"
             >
                <motion.div layout="position" className="mb-6">
                    <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tighter text-white">
                        Dubai Realestate Search
                    </h1>
                    <p className="text-lg text-gray-400 mt-2">An insightful detailed flow about anything in the market</p>
                </motion.div>
                <form onSubmit={handleSearch} className="relative group">
                    <motion.div 
                        animate={{ py: isFocused ? '0.75rem' : '0.25rem' }}
                        transition={{ duration: 0.3, type: 'spring' }}
                        className="relative p-px rounded-xl bg-gradient-to-r group-hover:from-blue-500/50 group-hover:to-cyan-400/50 from-blue-500/20 to-cyan-400/20 transition-all duration-300">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search for projects, developers, or market trends..."
                            value={query}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full h-16 pl-14 pr-28 text-base bg-gray-900 border-none text-white rounded-[calc(0.75rem-1px)] shadow-lg placeholder:text-gray-500 focus-visible:ring-0 focus-visible:outline-none"
                        />
                         <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                             <Button type="button" variant="ghost" size="icon" className="text-neutral-400 hover:text-white rounded-md">
                                <Mic className="h-5 w-5" />
                            </Button>
                            <Button type="submit" variant="ghost" size="icon" className="text-neutral-400 hover:text-white rounded-md h-10 w-10">
                                <ArrowUp className="h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>
                </form>
            </motion.div>
            <AnimatePresence>
              {hasQuery && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 flex-1 w-full"
                >
                    <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                        <SearchResults />
                    </Suspense>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
  );
}

export default function SearchPage() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-950 relative overflow-hidden">
            <div 
              className="absolute inset-0 z-0 opacity-20" 
              style={{
                background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.15), transparent 70%)',
              }}
            />
            <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 flex justify-center z-10 pt-0.5">
                <Suspense fallback={<div className="flex justify-center items-center h-screen w-full"><Loader2 className="h-12 w-12 animate-spin" /></div>}>
                    <SearchPageClient />
                </Suspense>
            </div>
        </div>
    )
}
