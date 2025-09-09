
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Bot, GitCommit, AlertTriangle, GanttChartSquare, RotateCw, Loader2, Sparkles, CheckCircle, MessageSquare, Undo, Copy, Database, BrainCircuit, Activity, BarChart2, Users, MoreHorizontal } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { tools } from '@/lib/tools-client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


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

const initialLog: ChangeLogEntry[] = [
    {
        id: 'cl-1757362654349',
        timestamp: new Date('2024-07-27T10:10:00Z'),
        toolId: 'meta-ads-copilot',
        toolTitle: 'Campaign Builder',
        description: 'here is the same --- the best way is to make this tool design the full campaign internallly while the pilot is what fly it to meta --- ',
        status: 'Assured',
        comment: "This task has been implemented. The Meta Ads Co-Pilot now only generates the campaign plan. The publishing is handled by the Auto Pilot."
    },
    {
        id: 'cl-1757362497975',
        timestamp: new Date('2024-07-27T10:05:00Z'),
        toolId: 'meta-auto-pilot',
        toolTitle: 'Meta Auto Pilot',
        description: 'the poilt should design the flow as per the user need -- a flow for lead generaton campaign is not the same for a reel ad with landing page -- or reel ad with messages',
        status: 'Assured',
        comment: "This task has been implemented. The Meta Auto Pilot page now allows selection of different workflows."
    }
];

const mockUsers = [
    { id: 'usr_1', name: 'John Doe', email: 'john.doe@example.com', plan: 'Seller', status: 'Active', joined: '2024-07-20' },
    { id: 'usr_2', name: 'Jane Smith', email: 'jane.smith@example.com', plan: 'Marketer', status: 'Active', joined: '2024-07-18' },
    { id: 'usr_3', name: 'Bob Johnson', email: 'bob.j@example.com', plan: 'Student', status: 'Suspended', joined: '2024-07-15' },
    { id: 'usr_4', name: 'Alice Williams', email: 'alice.w@example.com', plan: 'CEO', status: 'Active', joined: '2024-07-12' },
];

const statusConfig: { [key in TaskStatus]: { color: string, icon: React.ReactNode } } = {
    'New': { color: 'bg-blue-500', icon: <PlusCircle className="h-3 w-3" /> },
    'Planned': { color: 'bg-yellow-500', icon: <Loader2 className="h-3 w-3 animate-spin" /> },
    'Coded': { color: 'bg-purple-500', icon: <GitCommit className="h-3 w-3" /> },
    'Implemented': { color: 'bg-green-500', icon: <CheckCircle className="h-3 w-3" /> },
    'Assured': { color: 'bg-emerald-500', icon: <Sparkles className="h-3 w-3" /> },
    'Issue Reported': { color: 'bg-red-500', icon: <AlertTriangle className="h-3 w-3" /> },
}

const sitePages = [
    { id: 'page-home', title: 'Home Page' },
    { id: 'page-pricing', title: 'Pricing Page' },
    { id: 'page-about', title: 'About Page' },
    { id: 'page-blog', title: 'Blog Page' },
    { id: 'page-dashboard', title: 'Main Dashboard' },
    { id: 'page-onboarding', title: 'Onboarding Flow' },
];

const newConcepts = [
    { id: 'concept-new-app', title: 'New App Idea' },
    { id: 'concept-new-idea', title: 'General Suggestion' },
];

export default function DevAdminPage() {
    const { toast } = useToast();
    const [currentTask, setCurrentTask] = useState('');
    const [selectedToolId, setSelectedToolId] = useState('');
    const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
    
    const [scrapingStates, setScrapingStates] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        // Load changelog from localStorage on mount
        try {
            const savedLog = localStorage.getItem('changeLog');
            if (savedLog) {
                // Parse and revive dates
                const parsedLog = JSON.parse(savedLog).map((log: any) => ({
                    ...log,
                    timestamp: new Date(log.timestamp),
                }));
                setChangeLog(parsedLog);
            } else {
                setChangeLog(initialLog);
            }
        } catch (error) {
            console.error("Failed to load changelog from localStorage", error);
            setChangeLog(initialLog);
        }
    }, []);

    useEffect(() => {
        // Save changelog to localStorage whenever it changes
        try {
            if (changeLog.length > 0) {
               localStorage.setItem('changeLog', JSON.stringify(changeLog));
            }
        } catch (error) {
            console.error("Failed to save changelog to localStorage", error);
        }
    }, [changeLog]);

    const copyToClipboard = (text: string, message: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: 'Prompt Copied!',
            description: message,
        });
    }

    const handleAssignTask = () => {
        if (!currentTask || !selectedToolId) {
            toast({ title: "Task or Target is empty", description: "Please select a target and enter a task before assigning.", variant: "destructive" });
            return;
        }
        
        const allItems = [...tools, ...sitePages, ...newConcepts];
        const selectedItem = allItems.find(t => t.id === selectedToolId);

        if (!selectedItem) {
             toast({ title: "Target not found", description: "The selected target could not be found.", variant: "destructive" });
            return;
        }

        const newLogEntry: ChangeLogEntry = {
            id: `cl-${Date.now()}`,
            timestamp: new Date(),
            toolId: selectedItem.id,
            toolTitle: selectedItem.title,
            description: currentTask,
            status: 'New',
        };

        setChangeLog(prev => [newLogEntry, ...prev]);
        
        const promptText = `Task Assigned (ID: ${newLogEntry.id}): For the target "${selectedItem.title}", please start work on the following task: "${currentTask}". Please update the status to 'Planned' once you begin and 'Implemented' when you are done.`;
        copyToClipboard(promptText, "The prompt to assign this new task has been copied to your clipboard. Paste it in our chat to have me start.");

        setCurrentTask('');
        setSelectedToolId('');
    };
    
    const handleAction = (log: ChangeLogEntry, action: 'assure' | 'rerun' | 'undo' | 'comment') => {
        let promptText = '';
        let toastMessage = '';

        switch(action) {
            case 'assure':
                promptText = `Assurance for Task (ID: ${log.id}): The implementation for "${log.description}" is correct. Please mark this task as 'Assured'.`;
                toastMessage = 'Prompt to assure this task has been copied.';
                break;
            case 'rerun':
                promptText = `Rerun Task (ID: ${log.id}): The implementation for "${log.description}" was not successful. Please mark this task as 'Issue Reported' and rerun the implementation.`;
                toastMessage = 'Prompt to rerun this task has been copied.';
                break;
            case 'undo':
                 promptText = `Undo Task (ID: ${log.id}): Please revert the changes made for the task: "${log.description}".`;
                 toastMessage = 'Prompt to undo this task has been copied.';
                break;
            case 'comment':
                const comment = window.prompt("Enter your comment for this log entry:");
                if (comment) {
                   promptText = `Comment on Task (ID: ${log.id}): Please add the following note to this task: "${comment}".`;
                   toastMessage = 'Prompt to add your comment has been copied.';
                } else {
                    return; // Don't do anything if comment is cancelled
                }
                break;
        }
        copyToClipboard(promptText, toastMessage);
    }
    
    const handleScrape = async (source: string) => {
        setScrapingStates(prev => ({ ...prev, [source]: true }));
        toast({ title: 'Data Ingestion Started', description: `Request sent to scraper API for ${source}.`});
        
        const newLogEntry: ChangeLogEntry = {
            id: `scrape-${Date.now()}`,
            timestamp: new Date(),
            toolId: 'data-ingestion',
            toolTitle: 'Data Ingestion',
            description: `Scraping data from source: ${source}`,
            status: 'Planned',
        };

        setChangeLog(prev => [newLogEntry, ...prev]);

        // Simulate the scraping process and UI updates
        setTimeout(() => setChangeLog(prev => prev.map(l => l.id === newLogEntry.id ? {...l, status: 'Coded'} : l)), 1000);
        setTimeout(() => setChangeLog(prev => prev.map(l => l.id === newLogEntry.id ? {...l, status: 'Implemented'} : l)), 2000);

        try {
            const response = await fetch(`/api/admin/scrape?source=${source}`);
            const data = await response.json();
            if (!data.ok) throw new Error(data.error);
            
            const successMessage = `Scraping from ${source} complete! Found and updated ${data.data.projectsAdded} projects.`;
            setChangeLog(prev => prev.map(l => l.id === newLogEntry.id ? {...l, status: 'Assured', comment: successMessage} : l));
            toast({ title: 'Scraping Complete!', description: `Added/updated ${data.data.projectsAdded} projects from ${source} in the Market Library.`});

        } catch (e: any) {
            const errorMessage = `Error during scraping from ${source}: ${e.message}`;
            setChangeLog(prev => prev.map(l => l.id === newLogEntry.id ? {...l, status: 'Issue Reported', comment: errorMessage} : l));
            toast({ title: 'Scraping Failed', description: e.message, variant: 'destructive'});
        } finally {
            setScrapingStates(prev => ({ ...prev, [source]: false }));
        }
    };
    
    const handleUserAction = (userId: string, action: string) => {
        toast({ title: 'Action Initiated', description: `Performing action "${action}" for user ${userId}.` });
    }

  return (
    <main className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Development Admin Dashboard"
        description="Our shared workspace. Assign tasks, monitor the Change Log, and manage data ingestion."
        icon={<GanttChartSquare className="h-8 w-8" />}
      >
      </PageHeader>
      
        <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tasks"><GanttChartSquare className="mr-2 h-4 w-4" /> Task Management</TabsTrigger>
              <TabsTrigger value="data"><Database className="mr-2 h-4 w-4" /> Data & Knowledge</TabsTrigger>
              <TabsTrigger value="users"><Users className="mr-2 h-4 w-4" /> User Management</TabsTrigger>
              <TabsTrigger value="usage"><BarChart2 className="mr-2 h-4 w-4" /> System & Usage</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="mt-6 space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Task Pipeline</CardTitle>
                        <CardDescription>Assign a new development task for the AI.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Select value={selectedToolId} onValueChange={setSelectedToolId}>
                                <SelectTrigger className="w-full sm:w-[280px]">
                                    <SelectValue placeholder="Select an app or page..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Apps & Tools</SelectLabel>
                                        {tools.filter(t => t.id !== 'superfreetime').map(tool => (
                                            <SelectItem key={tool.id} value={tool.id}>{tool.title}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Site Pages</SelectLabel>
                                        {sitePages.map(page => (
                                            <SelectItem key={page.id} value={page.id}>{page.title}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>New Concepts</SelectLabel>
                                         {newConcepts.map(concept => (
                                            <SelectItem key={concept.id} value={concept.id}>{concept.title}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Textarea 
                                placeholder="Enter your next task for me here..."
                                value={currentTask}
                                onChange={(e) => setCurrentTask(e.target.value)}
                                rows={2}
                                className="flex-grow"
                            />
                            <Button 
                                size="lg" 
                                onClick={handleAssignTask}
                                disabled={!currentTask || !selectedToolId}
                                className="w-full sm:w-auto"
                            >
                                <Copy className="mr-2 h-4 w-4"/>
                                Assign & Copy
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Change Log</CardTitle>
                        <CardDescription>A chronological record of all tasks and their real-time implementation status.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg w-full max-h-[60vh] overflow-y-auto">
                            <Table>
                            <TableHeader className="sticky top-0 bg-background z-10">
                                <TableRow>
                                    <TableHead className="w-[150px]">Timestamp</TableHead>
                                    <TableHead>Change Description</TableHead>
                                    <TableHead className="w-[150px]">Status</TableHead>
                                    <TableHead className="w-[280px] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {changeLog.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                            No changes have been logged yet. Assign a task to begin.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    changeLog.map((log) => (
                                    <TableRow 
                                        key={log.id} 
                                        className={cn(log.status === 'Planned' && 'bg-yellow-500/5 animate-pulse')}
                                    >
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{new Date(log.timestamp).toLocaleDateString()}</span>
                                                <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            <p><span className="font-semibold text-primary">{log.toolTitle}:</span> {log.description}</p>
                                            {log.comment && <p className="text-xs italic text-muted-foreground mt-1 pl-2 border-l-2">Comment: {log.comment}</p>}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn("text-white", statusConfig[log.status].color)}>
                                                {statusConfig[log.status].icon}
                                                <span className="ml-1.5">{log.status}</span>
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-x-1">
                                            <Button size="sm" variant="ghost" onClick={() => handleAction(log, 'comment')} title="Comment"><MessageSquare className="h-4 w-4"/></Button>
                                            <Button size="sm" variant="ghost" onClick={() => handleAction(log, 'undo')} title="Undo"><Undo className="h-4 w-4"/></Button>
                                            <Button size="sm" variant="ghost" onClick={() => handleAction(log, 'rerun')} title="Report Issue & Rerun"><RotateCw className="h-4 w-4 text-destructive"/></Button>
                                            <Button size="sm" variant="outline" onClick={() => handleAction(log, 'assure')} title="Assure">
                                                <Sparkles className="mr-2 h-4 w-4 text-green-500"/>
                                                Assure
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    ))
                                )}
                            </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="data" className="mt-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Ingestion</CardTitle>
                        <CardDescription>Update the Market Library by scraping various sources.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 flex-wrap">
                            <Button onClick={() => handleScrape('dxboffplan')} disabled={scrapingStates['dxboffplan']}>
                                {scrapingStates['dxboffplan'] ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Database className="mr-2 h-4 w-4" />}
                                {scrapingStates['dxboffplan'] ? 'Scraping...' : 'Scrape DXBOffPlan'}
                            </Button>
                            <Button onClick={() => handleScrape('propertyfinder')} disabled={scrapingStates['propertyfinder']}>
                                {scrapingStates['propertyfinder'] ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Database className="mr-2 h-4 w-4" />}
                                {scrapingStates['propertyfinder'] ? 'Scraping...' : 'Scrape Property Finder'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Knowledge Base Status</CardTitle>
                        <CardDescription>An overview of the data currently training the AI models.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4 bg-muted rounded-lg">
                           <p className="text-sm text-muted-foreground">Projects in Library</p>
                           <p className="text-2xl font-bold">1,248</p>
                        </div>
                         <div className="p-4 bg-muted rounded-lg">
                           <p className="text-sm text-muted-foreground">User Documents</p>
                           <p className="text-2xl font-bold">352</p>
                        </div>
                         <div className="p-4 bg-muted rounded-lg">
                           <p className="text-sm text-muted-foreground">Data Sources</p>
                           <p className="text-2xl font-bold">2</p>
                        </div>
                         <div className="p-4 bg-muted rounded-lg">
                           <p className="text-sm text-muted-foreground">Last Updated</p>
                           <p className="text-2xl font-bold">Live</p>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            
             <TabsContent value="users" className="mt-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>View and manage all registered users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="border rounded-lg w-full">
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Plan</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockUsers.map(user => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={user.plan === 'Marketer' || user.plan === 'CEO' ? 'default' : 'secondary'}>{user.plan}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                 <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>{user.status}</Badge>
                                            </TableCell>
                                            <TableCell>{user.joined}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="icon" variant="ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleUserAction(user.id, 'edit')}>Edit User</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleUserAction(user.id, 'suspend')}>Suspend</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleUserAction(user.id, 'plan')}>Change Plan</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive" onClick={() => handleUserAction(user.id, 'delete')}>Delete User</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                         </div>
                    </CardContent>
                </Card>
            </TabsContent>

             <TabsContent value="usage" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                         <CardHeader>
                            <CardTitle>App Usage Analytics</CardTitle>
                            <CardDescription>Placeholder for app usage reports.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground py-12">
                            <BarChart2 className="h-10 w-10 mx-auto mb-2" />
                            <p>App usage data will be displayed here.</p>
                        </CardContent>
                    </Card>
                     <Card>
                         <CardHeader>
                            <CardTitle>Backend Connections Status</CardTitle>
                            <CardDescription>Placeholder for backend service status.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground py-12">
                             <Activity className="h-10 w-10 mx-auto mb-2" />
                            <p>Live status of all connected APIs.</p>
                        </CardContent>
                    </Card>
                     <Card className="md:col-span-2">
                         <CardHeader>
                            <CardTitle>AI Prompt Usage</CardTitle>
                            <CardDescription>Placeholder for analytics on prompt and token usage.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground py-12">
                             <Bot className="h-10 w-10 mx-auto mb-2" />
                            <p>Detailed reports on AI usage will appear here.</p>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    </main>
  );
}
