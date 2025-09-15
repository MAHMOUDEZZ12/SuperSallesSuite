
'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Bot, GitCommit, AlertTriangle, GanttChartSquare, RotateCw, Loader2, Sparkles, CheckCircle, MessageSquare, Undo, Copy, Database, BrainCircuit, Activity, BarChart2, Users, MoreHorizontal, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { runFlow } from '@/lib/flows';
import { useAuth } from '@/hooks/useAuth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { tools } from '@/lib/features';
import { Textarea } from '@/components/ui/textarea';
import { Input } from './input';


type TaskStatus = 'New' | 'Planned' | 'Coded' | 'Implemented' | 'Assured' | 'Issue Reported';

interface ChangeLogEntry {
    id: string;
    timestamp: Date;
    toolId: string;
    toolTitle: string;
    description: string;
    status: TaskStatus;
    comment?: string;
}

const statusConfig: { [key in TaskStatus]: { color: string, icon: React.ReactNode } } = {
    'New': { color: 'bg-blue-500', icon: <PlusCircle className="h-3 w-3" /> },
    'Planned': { color: 'bg-purple-500', icon: <BrainCircuit className="h-3 w-3" /> },
    'Coded': { color: 'bg-purple-500', icon: <GitCommit className="h-3 w-3" /> },
    'Implemented': { color: 'bg-green-500', icon: <CheckCircle className="h-3 w-3" /> },
    'Assured': { color: 'bg-emerald-500', icon: <Sparkles className="h-3 w-3" /> },
    'Issue Reported': { color: 'bg-red-500', icon: <AlertTriangle className="h-3 w-3" /> },
}

const initialLog: ChangeLogEntry[] = [
    {
        id: 'SYS-ARC-001',
        timestamp: new Date('2024-07-27T10:20:00Z'),
        toolId: 'page-dashboard',
        toolTitle: 'Dev Admin',
        description: 'Architectural Shift: AI Command Center',
        status: 'Assured',
        comment: "Implementation assured. The sentient OS is live. This is the 'Absolute Geminiation.'",
    }
];

const mockUsers = [
    { id: 'usr_1', name: 'John Doe', email: 'john.doe@example.com', plan: 'Seller', status: 'Active', joined: '2024-07-20' },
    { id: 'usr_2', name: 'Jane Smith', email: 'jane.smith@example.com', plan: 'Marketer', status: 'Active', joined: '2024-07-18' },
    { id: 'usr_3', name: 'Bob Johnson', email: 'bob.j@example.com', plan: 'Student', status: 'Suspended', joined: '2024-07-15' },
    { id: 'usr_4', name: 'Alice Williams', email: 'alice.w@example.com', plan: 'CEO', status: 'Active', joined: '2024-07-12' },
];

interface DevAdminClientProps {
    initialCity: string;
    initialCountry: string;
}

export function DevAdminClient({ initialCity, initialCountry }: DevAdminClientProps) {
    const { toast } = useToast();
    const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>(initialLog);
    const [currentTask, setCurrentTask] = useState('');
    const [selectedToolId, setSelectedToolId] = useState('');
    const [scrapingStates, setScrapingStates] = useState<{ [key: string]: boolean }>({});
    const [deepScrapeQuery, setDeepScrapeQuery] = useState('');
    const [isDeepScraping, setIsDeepScraping] = useState(false);
    const [deepScrapeResult, setDeepScrapeResult] = useState<any>(null);

    useEffect(() => {
        try {
            const savedLog = localStorage.getItem('changeLog');
            if (savedLog) {
                const parsedLog = JSON.parse(savedLog).map((log: any) => ({
                    ...log,
                    timestamp: new Date(log.timestamp),
                }));
                setChangeLog(parsedLog);
            }
        } catch (error) {
            console.error("Failed to load changelog from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            if (changeLog.length > 0) {
               localStorage.setItem('changeLog', JSON.stringify(changeLog));
            }
        } catch (error) {
            console.error("Failed to save changelog to localStorage", error);
        }
    }, [changeLog]);

    const handleScrape = async (source: string) => {
        setScrapingStates(prev => ({ ...prev, [source]: true }));
        toast({ title: `Initiating scrape for ${source}...` });
        try {
            const response = await fetch(`/api/admin/scrape?source=${source}`);
            const result = await response.json();
             if (!response.ok) {
                throw new Error(result.error || `Scraping ${source} failed`);
            }
            toast({ title: 'Scrape Complete', description: `${result.data.projectsAdded} projects ingested from ${source}.`, variant: 'default' });
        } catch (error: any) {
            toast({ title: 'Scrape Failed', description: error.message, variant: 'destructive' });
        } finally {
            setScrapingStates(prev => ({ ...prev, [source]: false }));
        }
    };
    
    const handleDeepScrape = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!deepScrapeQuery) return;
        setIsDeepScraping(true);
        setDeepScrapeResult(null);
        toast({ title: `Initiating deep scrape for "${deepScrapeQuery}"...` });

        try {
             const response = await fetch(`/api/admin/deep-scrape?q=${encodeURIComponent(deepScrapeQuery)}`);
             const result = await response.json();
             if (!response.ok) {
                throw new Error(result.error || `Deep scrape failed`);
            }
            setDeepScrapeResult(result.data);
             toast({ title: 'Deep Scrape Complete', description: `Found ${result.data.highQualityCount} high-quality sources.` });
        } catch(error: any) {
            toast({ title: 'Deep Scrape Failed', description: error.message, variant: 'destructive' });
        } finally {
            setIsDeepScraping(false);
        }
    };

    return (
        <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tasks"><GanttChartSquare className="mr-2 h-4 w-4" /> Task Management</TabsTrigger>
              <TabsTrigger value="data"><Database className="mr-2 h-4 w-4" /> Data & Knowledge</TabsTrigger>
              <TabsTrigger value="users"><Users className="mr-2 h-4 w-4" /> User Management</TabsTrigger>
              <TabsTrigger value="usage"><BarChart2 className="mr-2 h-4 w-4" /> System & Usage</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="mt-6 space-y-6">
                {/* ... Task Management Card ... */}
            </TabsContent>
            
            <TabsContent value="data" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-muted/40">
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2"><GitCommit /> Surface Scrapers</CardTitle>
                            <CardDescription>Run scrapers on known, structured data sources to populate the Market Library.</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-2">
                            <Button className="w-full justify-between" variant="secondary" onClick={() => handleScrape('propertyfinder')} disabled={scrapingStates['propertyfinder']}>PropertyFinder {scrapingStates['propertyfinder'] && <Loader2 className="animate-spin" />}</Button>
                            <Button className="w-full justify-between" variant="secondary" onClick={() => handleScrape('bayut')} disabled={scrapingStates['bayut']}>Bayut {scrapingStates['bayut'] && <Loader2 className="animate-spin" />}</Button>
                            <Button className="w-full justify-between" variant="secondary" onClick={() => handleScrape('dxboffplan')} disabled={scrapingStates['dxboffplan']}>DXB Off-Plan {scrapingStates['dxboffplan'] && <Loader2 className="animate-spin" />}</Button>
                            <Button className="w-full justify-between" variant="secondary" onClick={() => handleScrape('emiratesestate')} disabled={scrapingStates['emiratesestate']}>Emirates.Estate {scrapingStates['emiratesestate'] && <Loader2 className="animate-spin" />}</Button>
                         </CardContent>
                    </Card>
                    <Card className="bg-muted/40">
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Bot /> Deep Scrape & Analysis Agent</CardTitle>
                            <CardDescription>Discover and vet new data sources using an AI quality analyst.</CardDescription>
                         </CardHeader>
                         <CardContent>
                           <form onSubmit={handleDeepScrape} className="flex gap-2">
                                <Input value={deepScrapeQuery} onChange={(e) => setDeepScrapeQuery(e.target.value)} placeholder="Enter search query..." />
                                <Button type="submit" disabled={isDeepScraping}>{isDeepScraping ? <Loader2 className="animate-spin"/> : <Search/>}</Button>
                           </form>
                           {deepScrapeResult && (
                            <div className="mt-4 text-xs space-y-1">
                                <p>Found {deepScrapeResult.resultsFound} total results.</p>
                                <p>Identified <span className="font-bold text-primary">{deepScrapeResult.highQualityCount} high-quality sources</span> to add to knowledge base.</p>
                            </div>
                           )}
                         </CardContent>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="users" className="mt-6 space-y-6">
                {/* ... User Management Card ... */}
            </TabsContent>

             <TabsContent value="usage" className="mt-6 space-y-6">
                {/* ... Usage Analytics Cards ... */}
            </TabsContent>
        </Tabs>
    );
}
