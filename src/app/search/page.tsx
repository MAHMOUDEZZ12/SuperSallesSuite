
'use client';

import React,  { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Mic, ArrowUp, Lightbulb, Sparkles, Home, DollarSign, Sun, Briefcase, Plus } from 'lucide-react';
import type { Project } from '@/types';
import { ProjectCard } from '@/components/ui/project-card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { track } from '@/lib/events';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';


interface SearchResult {
    summary: string | null;
    projects: Project[];
    extractiveAnswers: any[];
}

const ProjectCardSkeleton = () => (
    <div className="relative overflow-hidden rounded-lg p-px shadow-lg">
       <div className="relative rounded-lg bg-black/50 p-4 space-y-2 h-full">
         <Skeleton className="h-40 w-full bg-gray-700" />
         <Skeleton className="h-4 w-3/4 bg-gray-700" />
         <Skeleton className="h-4 w-1/2 bg-gray-700" />
       </div>
    </div>
);

const SecondChanceResult = ({ result, query, onFollowUp }: { result: SearchResult, query: string, onFollowUp: (newQuery: string) => void }) => {
    
    const generateSuggestion = (q: string): { suggestion: string; reason: string; } | null => {
        const lowerQuery = q.toLowerCase();

        if (lowerQuery.includes('payment plan')) {
            return {
                suggestion: `Shall we dive into the hidden fees like DLD registration?`,
                reason: `This will help uncover the true total cost beyond the listed price.`
            };
        }
        
        if (lowerQuery.includes('price of')) {
            const topic = lowerQuery.split('price of')[1]?.trim();
            if (topic) {
                return {
                    suggestion: `To help you understand if this is a good deal, shall we compare the price of ${topic} against the market?`,
                    reason: `This provides crucial context to understand if the price is fair, high, or low.`
                };
            }
        }

        if (lowerQuery.includes('vs') || lowerQuery.includes('compare')) {
            const competitors = lowerQuery.split(/vs|versus|compare/).map(s => s.trim());
            if (competitors.length >= 2 && competitors.some(c => c.includes('azizi')) && competitors.some(c => c.includes('damac'))) {
                 return {
                    suggestion: `To give you a clearer picture, what if we add a premium developer like Emaar to the comparison?`,
                    reason: `Adding a different tier of developer provides a better benchmark for the entire market.`,
                };
            }
        }

        return null;
    }
    
    const suggestion = generateSuggestion(query);
    const directAnswer = result.summary || result.extractiveAnswers[0]?.content;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-gray-900/50 border border-primary/30 text-left"
        >
            <div className="flex items-start gap-4">
                <Lightbulb className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                     <h3 className="text-xl font-semibold text-white font-heading">Direct Answer</h3>
                     <p className="text-gray-300 mt-2">{directAnswer}</p>
                     
                     {suggestion && (
                        <div className="mt-6">
                            <p className="text-gray-300 font-semibold">{suggestion.suggestion}</p>
                            <p className="text-sm text-gray-400 mt-1">{suggestion.reason}</p>
                            <Button variant="outline" size="sm" className="mt-3 bg-black/30 text-primary border-primary/50 hover:bg-black/50 hover:text-primary" onClick={() => onFollowUp(suggestion.suggestion)}>
                                Yes, let's do that
                            </Button>
                        </div>
                     )}
                </div>
            </div>
        </motion.div>
    );
};

const ClarificationResult = ({ query, onFollowUp, summary }: { query: string, onFollowUp: (newQuery: string) => void, summary: string | null }) => {
    const options = [
        { label: 'Top Developers', icon: <Home/>, query: `top developers in ${query}` },
        { label: 'Market Trends', icon: <DollarSign/>, query: `market trends in ${query}` },
        { label: 'Newest Projects', icon: <Sun/>, query: `newest projects in ${query}` },
        { label: 'Career Opportunities', icon: <Briefcase/>, query: `career opportunities in ${query}` },
    ];
    
    return (
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-gray-900/50 border border-primary/30 text-left space-y-6"
        >
            <div>
              <p className="text-gray-300">
                {summary ? summary : `The query "${query}" is quite broad.`}
              </p>
              <p className="font-semibold text-white mt-2">To give you the best results, which of these are you most interested in?</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {options.map(opt => (
                    <button key={opt.label} onClick={() => onFollowUp(opt.query)} className="group p-4 rounded-lg bg-black/30 hover:bg-black/50 border border-gray-700 hover:border-primary transition-all duration-200">
                        <div className="text-primary mx-auto w-fit">{React.cloneElement(opt.icon, { className: 'h-6 w-6' })}</div>
                        <p className="font-semibold text-sm text-gray-200 mt-2 text-center">{opt.label}</p>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}

const ComparisonView = ({ items: initialItems, query }: { items: string[]; query: string; }) => {
    const [comparisonItems, setComparisonItems] = useState<any[]>([]);
    const [newItem, setNewItem] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isMismatchedComparison = query.toLowerCase().includes('azizi') && query.toLowerCase().includes('damac');

    const fetchItemData = async (itemName: string) => {
        const response = await fetch(`/api/projects/scan?q=${encodeURIComponent(itemName)}`);
        const data = await response.json();
        if (data.ok) {
            return {
                name: itemName,
                summary: data.data.summary || (data.data.extractiveAnswers[0] && data.data.extractiveAnswers[0].content) || "No summary available.",
                projects: data.data.projects.slice(0, 3) // Take top 3 projects as examples
            };
        }
        return { name: itemName, summary: "Could not fetch data.", projects: [] };
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            const initialData = await Promise.all(initialItems.map(fetchItemData));
            setComparisonItems(initialData);
            setIsLoading(false);
        };
        fetchInitialData();
    }, [initialItems]);

    const handleAddItem = async (e: React.FormEvent | string) => {
        if (typeof e !== 'string') {
            e.preventDefault();
        }
        const itemToAdd = typeof e === 'string' ? e : newItem.trim();
        if (!itemToAdd) return;
        
        setIsLoading(true);
        const data = await fetchItemData(itemToAdd);
        setComparisonItems(prev => [...prev, data]);
        setNewItem('');
        setIsLoading(false);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {isMismatchedComparison && (
                <div className="p-4 rounded-lg bg-blue-900/50 border border-blue-500/50 text-blue-200 text-sm">
                    <p><b>Expert Insight:</b> You're comparing Azizi and Damac. While I can show you that, it's worth noting they generally cater to different market segments. For a more direct comparison to a luxury developer like Damac, you might consider adding Emaar to the mix.</p>
                     <Button variant="outline" size="sm" className="mt-2 bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30 text-white" onClick={() => handleAddItem('Emaar')}>
                        <Plus className="mr-2 h-4 w-4" /> Add Emaar to Comparison
                    </Button>
                </div>
            )}
            <div className={`grid grid-cols-1 md:grid-cols-${comparisonItems.length > 2 ? '3' : '2'} lg:grid-cols-${comparisonItems.length + 1} gap-6 items-start`}>
                {comparisonItems.map((item, index) => (
                    <Card key={index} className="bg-gray-900/50 border-gray-700/50 text-gray-300 h-full">
                        <CardHeader>
                            <CardTitle className="text-primary capitalize">{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm border-l-2 border-primary/50 pl-2 mb-4">{item.summary}</p>
                            <h4 className="font-semibold text-xs uppercase text-gray-400 mb-2">Top Projects</h4>
                            <div className="space-y-2">
                                {item.projects.map((p: Project) => <p key={p.id} className="text-sm bg-black/30 p-1.5 rounded-md">{p.name}</p>)}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <div className="p-4 rounded-lg border-2 border-dashed border-gray-600 flex flex-col gap-2 h-full">
                    <h4 className="font-semibold text-gray-200">Add to Comparison</h4>
                    <form onSubmit={handleAddItem} className="flex flex-col gap-2">
                        <Input 
                            value={newItem} 
                            onChange={e => setNewItem(e.target.value)} 
                            placeholder="e.g. 'Nakheel'"
                            className="bg-black/50 border-gray-600 text-white"
                        />
                        <Button type="submit" variant="secondary" size="sm" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Plus className="h-4 w-4"/>} Add
                        </Button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};


function SearchResults() {
  const router = useRouter();
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

  const fetchResults = React.useCallback((q: string) => {
      setIsLoading(true);
      setError(null);
      fetch(`/api/projects/scan?q=${encodeURIComponent(q)}`)
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            setResult(data.data);
          } else {
            setError(data.error || 'An unknown error occurred.');
          }
        })
        .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (query) {
      fetchResults(query);
    } else {
      setIsLoading(false);
    }
  }, [query, fetchResults]);
  
  const handleFollowUpSearch = (newQuery: string) => {
      router.push(`/search?q=${encodeURIComponent(newQuery)}`, { scroll: false });
  }

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
  
  const lowerQuery = query.toLowerCase();
  const isBroadQuery = ['dubai', 'london', 'new york', 'paris'].includes(lowerQuery);
  const isComparisonQuery = lowerQuery.includes('vs') || lowerQuery.includes('versus') || lowerQuery.includes('compare');

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

  if (isComparisonQuery) {
      const items = query.split(/vs|versus|compare/i).map(s => s.trim()).filter(Boolean);
      return <ComparisonView items={items.slice(0, 2)} query={query} />;
  }
  
  if (!result || (result.projects.length === 0 && !result.summary && result.extractiveAnswers.length === 0)) {
     if (isBroadQuery) {
        return <ClarificationResult query={query} onFollowUp={handleFollowUpSearch} summary={result?.summary || null} />;
     }
     return (
          <div className="text-center py-16 text-gray-400">
            <p>No results found for &quot;{query}&quot;.</p>
          </div>
        );
  }
  
  if (isBroadQuery && result.projects.length === 0) {
      return <ClarificationResult query={query} onFollowUp={handleFollowUpSearch} summary={result.summary} />;
  }

  if (result.projects.length === 0 && (result.summary || result.extractiveAnswers.length > 0)) {
    return <SecondChanceResult result={result} query={query} onFollowUp={handleFollowUpSearch} />;
  }


  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 mt-8"
    >
        <div className="prose prose-lg prose-invert max-w-none text-gray-200">
            {result.summary && (
                <p>{result.summary}</p>
            )}
            
            {result.extractiveAnswers && result.extractiveAnswers.length > 0 && (
                 <div className="space-y-4">
                    <h2 className="text-xl font-semibold font-heading text-gray-100 not-prose">Key Insights</h2>
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
                !result.summary && !isBroadQuery && <p className="text-gray-400 text-center">No specific projects found related to your query.</p>
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
    <motion.div 
      layout
      transition={{ duration: 0.5, type: 'spring' }} 
      className="w-full max-w-3xl mx-auto flex flex-col items-center"
    >
        <motion.div 
            layout="position" 
            className="mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: hasQuery ? 0 : 1, y: hasQuery ? -20 : 0, height: hasQuery ? 0 : 'auto' }}
            transition={{ delay: 0.2 }}
            >
            <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-white">
                Search anything Real Estate Dubai
            </h1>
            <p className="text-lg text-gray-400 mt-2">An insightful detailed flow about anything in the market</p>
        </motion.div>
        <form onSubmit={handleSearch} className="relative group w-full">
            <motion.div 
                layout
                className="relative p-px rounded-xl bg-gradient-to-r group-hover:from-blue-500/50 group-hover:to-cyan-400/50 from-blue-500/20 to-cyan-400/20 transition-all duration-300">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                    placeholder="Search for projects, developers, or market trends..."
                    value={query}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-16 pl-14 pr-28 text-base bg-black/50 border-none text-white rounded-[calc(0.75rem-1px)] shadow-lg placeholder:text-gray-500 focus-visible:ring-0 focus-visible:outline-none"
                />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <Button type="button" variant="ghost" size="icon" className="text-neutral-400 hover:text-white rounded-full hover:bg-transparent">
                        <Mic className="h-5 w-5" />
                    </Button>
                    <Button type="submit" variant="ghost" size="icon" className="text-neutral-400 hover:text-white rounded-full h-10 w-10 hover:bg-transparent">
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                </div>
            </motion.div>
        </form>
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
    </motion.div>
  );
}

export default function SearchPage() {
    return (
        <div className="flex min-h-screen flex-col bg-black relative overflow-hidden">
            <div 
              className="absolute inset-0 z-0 opacity-20" 
              style={{
                background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.15), transparent 70%)',
              }}
            />
            <motion.div 
                layout 
                className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center z-10"
                initial={{paddingTop: '20vh'}}
                animate={{paddingTop: useSearchParams().get('q') ? '5vh' : '20vh' }}
                transition={{duration: 0.5, type: 'spring'}}
            >
                <Suspense fallback={<div className="flex justify-center items-center h-screen w-full"><Loader2 className="h-12 w-12 animate-spin" /></div>}>
                    <SearchPageClient />
                </Suspense>
            </motion.div>
        </div>
    )
}

    