
'use client';

import React from 'react';
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
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

// This page is now deprecated in favor of the My Projects widget on the dashboard.
// It is kept for routing purposes but should not be directly linked to.
// A redirect could be added in next.config.js if needed.
const userProjects: any[] = [
  // Example:
  // { id: 'some-project-id', name: 'Azure Lofts', type: 'Residential', location: 'Dubai Marina', status: 'Active' }
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  'Active': 'default',
  'Planning': 'secondary',
  'Completed': 'outline',
  'On Hold': 'destructive',
};

export default function ProjectsPage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="My Projects"
        description="This page is deprecated. Please use the 'My Projects' widget on the dashboard."
        icon={<PlusCircle className="h-8 w-8" />}
      >
         <Link href="/dashboard/tool/projects-finder">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Project from Library
            </Button>
         </Link>
      </PageHeader>

      <div className="border rounded-lg w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userProjects.length > 0 ? (
                userProjects.map((project) => (
                <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{project.type}</TableCell>
                    <TableCell className="hidden md:table-cell">{project.location}</TableCell>
                    <TableCell>
                    <Badge variant={statusVariant[project.status] || 'secondary'}>{project.status}</Badge>
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
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No projects in your library yet.
                        <Link href="/dashboard/tool/projects-finder" className="ml-2">
                           <Button variant="link">Add projects from the Market Library</Button>
                        </Link>
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

    
