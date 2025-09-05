
'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Bot,
  Clapperboard,
  Database,
  FileText,
  Film,
  LayoutTemplate,
  LineChart,
  Mail,
  Megaphone,
  Palette,
  PenTool,
  Phone,
  Share2,
  Target,
  UserCog,
  UserPlus,
  Users2,
  Video,
  Briefcase,
  ChevronRight,
  Contact,
  Brush,
  Star,
  Settings,
  LifeBuoy,
  Server,
  BrainCircuit,
  Home,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { tools } from '@/lib/tools-client.tsx';
import { AssistantChat } from '@/components/assistant-chat';

const marketingTools = tools.filter(t => t.categories.includes('Marketing'));
const creativeTools = tools.filter(t => t.categories.includes('Creative'));
const salesTools = tools.filter(t => t.categories.includes('Sales Tools'));
const socialTools = tools.filter(t => t.categories.includes('Social & Comms'));
const reportTools = tools.filter(t => t.categories.includes('Reports'));


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex items-center justify-between">
          <Logo />
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col gap-2 p-2">
             <SidebarMenu>
                 <SidebarMenuItem>
                    <Link href="/dashboard">
                        <SidebarMenuButton isActive={pathname === '/dashboard'}>
                            <Home />
                            <span className="group-data-[collapsible=icon]:hidden">Home</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/dashboard/projects">
                        <SidebarMenuButton isActive={pathname.startsWith('/dashboard/projects')}>
                            <Briefcase />
                            <span className="group-data-[collapsible=icon]:hidden">Projects</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/dashboard/brand">
                        <SidebarMenuButton isActive={pathname.startsWith('/dashboard/brand')}>
                            <Palette />
                            <span className="group-data-[collapsible=icon]:hidden">Brand & Assets</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/dashboard/data">
                        <SidebarMenuButton isActive={pathname.startsWith('/dashboard/data')}>
                            <Database />
                            <span className="group-data-[collapsible=icon]:hidden">Storage</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
            <Separator className="my-2" />
            <SidebarMenu>
               <SidebarMenuItem>
                 <SidebarMenuButton>
                    <Megaphone />
                    <span className="group-data-[collapsible=icon]:hidden">Marketing</span>
                 </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
               <SidebarMenuItem>
                 <SidebarMenuButton>
                    <Brush />
                    <span className="group-data-[collapsible=icon]:hidden">Creative Tools</span>
                 </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
             <SidebarMenu>
               <SidebarMenuItem>
                 <SidebarMenuButton>
                    <Star />
                    <span className="group-data-[collapsible=icon]:hidden">Sales & CRM</span>
                 </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
             <SidebarMenu>
               <SidebarMenuItem>
                 <SidebarMenuButton>
                    <MessageCircle />
                    <span className="group-data-[collapsible=icon]:hidden">Social & Comms</span>
                 </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
             <SidebarMenu>
               <SidebarMenuItem>
                 <SidebarMenuButton>
                    <LineChart />
                    <span className="group-data-[collapsible=icon]:hidden">Reports</span>
                 </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
            <Separator className="my-2" />
             <SidebarMenu>
                 <SidebarMenuItem>
                    <Link href="/dashboard/assistant">
                        <SidebarMenuButton isActive={pathname.startsWith('/dashboard/assistant')}>
                            <BrainCircuit />
                            <span className="group-data-[collapsible=icon]:hidden">Your AI Assistant</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarContent>
        <SidebarFooter>
            <div className='flex flex-col gap-2 p-2'>
                 <Separator className='mb-2' />
                 <SidebarMenu>
                     <SidebarMenuItem>
                         <Link href="/dashboard/settings">
                            <SidebarMenuButton isActive={pathname.startsWith('/dashboard/settings')}>
                                <Settings />
                                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <Separator />
                     <SidebarMenuItem>
                        <Link href="/status">
                            <SidebarMenuButton>
                                <Server />
                                <span className="group-data-[collapsible=icon]:hidden">System Status</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <a href="mailto:support@supersalessuite.com">
                            <SidebarMenuButton>
                                <LifeBuoy />
                                <span className="group-data-[collapsible=icon]:hidden">Report an Issue</span>
                            </SidebarMenuButton>
                        </a>
                    </SidebarMenuItem>
                 </SidebarMenu>
            </div>
            <Separator />
          <div className="flex items-center gap-3 p-2">
            <Avatar className="size-8">
              <AvatarImage
                src="https://picsum.photos/100"
                alt="User"
                data-ai-hint="profile picture"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">
                john.doe@example.com
              </p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {children}
        <AssistantChat />
      </SidebarInset>
    </SidebarProvider>
  );
}
