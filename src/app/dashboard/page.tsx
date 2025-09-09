
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Palette, LineChart, Briefcase, Bot, Home, Building, Megaphone, Users, PlusCircle, MoreHorizontal, Loader2, BookOpen, GanttChartSquare } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { tools } from '@/lib/features';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Project } from '@/types';


const topTools = tools.filter(t => ['meta-ads-copilot', 'audience-creator', 'rebranding', 'instagram-content-creator'].includes(t.id));

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  'Active': 'default',
  'Planning': 'secondary',
  'Completed': 'outline',
  'On Hold': 'destructive',
};


const MyProjectsWidget = () => {
    const [userProjects, setUserProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would be a fetch call to your backend
        // For this prototype, we simulate a fetch from localStorage
        const fetchProjects = () => {
            setIsLoading(true);
            try {
                const savedProjects = JSON.parse(localStorage.getItem('myProjects') || '[]');
                setUserProjects(savedProjects);
            } catch (e) {
                console.error("Failed to load projects", e);
                setUserProjects([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();

        const handleStorageChange = () => {
            fetchProjects();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleDeleteProject = (projectId: string) => {
        const updatedProjects = userProjects.filter(p => p.id !== projectId);
        setUserProjects(updatedProjects);
        localStorage.setItem('myProjects', JSON.stringify(updatedProjects));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Projects</CardTitle>
                <CardDescription>Your active project library.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-24">
                           <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : userProjects.length > 0 ? (
                        userProjects.slice(0, 2).map(project => (
                            <div key={project.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                <div>
                                    <p className="font-semibold">{project.name}</p>
                                    <p className="text-sm text-muted-foreground">{project.area}</p>
                                </div>
                                <Badge variant={statusVariant[project.status || 'Active'] || 'secondary'}>{project.status}</Badge>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No projects in your library yet.</p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="justify-between">
                 <Link href="/dashboard/tool/projects-finder">
                    <Button variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Project
                    </Button>
                </Link>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default" disabled={isLoading || userProjects.length === 0}>View All</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>My Projects Library</DialogTitle>
                            <DialogDescription>
                                All projects you have saved to your personal library.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="max-h-[60vh] overflow-y-auto">
                          <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Project Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {userProjects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.name}</TableCell>
                                    <TableCell>{project.area}</TableCell>
                                    <TableCell>
                                    <Badge variant={statusVariant[project.status || 'Active'] || 'secondary'}>{project.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDeleteProject(project.id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
};

export default function DashboardPage() {
  const hasActiveCampaigns = true; 

  return (
    <div className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Welcome Back"
        description="Here's a snapshot of your sales universe today."
      >
        <Link href="/dashboard/dev-admin">
            <Button variant="outline">
                <GanttChartSquare className="mr-2 h-4 w-4" />
                Dev Admin
            </Button>
        </Link>
      </PageHeader>

        {hasActiveCampaigns ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">+2 since last week</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+235</div>
                        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Ad Spend</CardTitle>
                        <LineChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,234.00</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">New off-market projects found</p>
                    </CardContent>
                </Card>
            </div>
        ) : (
            <Card className="text-center p-8 border-dashed">
                <CardContent className="max-w-md mx-auto">
                    <div className="mx-auto w-fit p-3 bg-primary/10 rounded-full mb-4">
                        <Home className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Your Dashboard is Ready</h3>
                    <p className="text-muted-foreground mt-2 mb-6">As you use the tools, your key metrics and active tasks will appear here. Let's get your first campaign started.</p>
                     <Link href="/dashboard/marketing">
                        <Button>Go to Apps <ArrowRight /></Button>
                    </Link>
                </CardContent>
            </Card>
        )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Top Tools For You</CardTitle>
                    <CardDescription>Based on your activity, here are some tools you might find useful.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topTools.map(tool => (
                        <Link href={`/dashboard/tool/${tool.id}`} key={tool.id} className="group">
                             <div className="flex items-center gap-4 p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                                <div className="p-2 rounded-md text-white" style={{backgroundColor: tool.color}}>
                                    {React.cloneElement(tool.icon, {className: "h-6 w-6"})}
                                </div>
                                <div>
                                    <h4 className="font-semibold">{tool.title}</h4>
                                    <p className="text-sm text-muted-foreground">{tool.description.substring(0, 40)}...</p>
                                </div>
                                <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>
             <Link href="/blog" className="block">
                <Card className="group hover:bg-muted/50 transition-colors">
                    <CardContent className="p-6 flex items-center gap-6">
                        <div className="p-3 bg-primary/10 text-primary rounded-lg">
                           <BookOpen className="h-8 w-8" />
                        </div>
                        <div>
                           <h3 className="font-semibold text-lg text-foreground">Explore the Handbook</h3>
                           <p className="text-muted-foreground">Discover expert guides and hacks to get the most out of every tool.</p>
                        </div>
                        <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                    </CardContent>
                </Card>
            </Link>
        </div>
         <div className="lg:col-span-1">
            <MyProjectsWidget />
        </div>
      </div>
    </div>
  );
}
