
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { LifeBuoy, LogOut, Settings, User, Search, Home, Building, Palette, Users, Bot, Menu, Puzzle, BarChart, UserPlus, Workflow, BookOpen as AcademyIcon, BrainCircuit } from "lucide-react";
import React from "react";
import { GlobalSearch } from "./ui/global-search";
import { useTheme } from "@/components/theme-switcher";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { Logo } from "./logo";
import { useTabManager } from "@/context/TabManagerContext";
import { cn } from "@/lib/utils";

const mainNav = [
  { href: '/dashboard/assistant', label: 'AI Assistant', icon: Bot },
  { href: '/dashboard/marketing', label: 'Apps', icon: Puzzle },
  { href: '/dashboard/flows', label: 'Pilots', icon: Workflow },
  { href: '/dashboard/performance', label: 'Performance', icon: BarChart },
  { href: '/blog', label: 'Academy', icon: AcademyIcon },
];

const settingsNav = [
  { href: '/dashboard/brand', label: 'Brand & Assets', icon: Palette },
  { href: '/dashboard/learning-curve', label: 'My AI\'s Learning Curve', icon: BrainCircuit },
  { href: '/dashboard/leads', label: 'Leads (CRM)', icon: UserPlus },
  { href: '/dashboard/clients', label: 'Clients', icon: Users },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function DashboardHeader() {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const { setTheme, themes } = useTheme();
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const { addTab } = useTabManager();

    const handleLogout = async () => {
        await auth.signOut();
        router.push('/login');
    };
    
    const handleNavigation = (href: string, label: string, e: React.MouseEvent) => {
        e.preventDefault();
        addTab({ href, label });
        router.push(href);
    }

    return (
        <>
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
                <div className="flex items-center gap-6">
                    <Logo />
                    <nav className="hidden md:flex items-center gap-2">
                        {mainNav.map((item) => (
                           <Link href={item.href} key={item.href} passHref legacyBehavior>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={(e: any) => handleNavigation(item.href, item.label, e)}
                                    className={cn(pathname === item.href && "bg-muted text-foreground")}
                                >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                </div>
                
                <div className="flex flex-1 items-center justify-end md:justify-center">
                   <div className="w-full max-w-sm">
                     <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={() => setIsSearchOpen(true)}>
                       <Search className="mr-2 h-4 w-4" />
                       <span className="hidden sm:inline-block">Search or ask anything... (⌘K)</span>
                       <span className="sm:hidden">Search... (⌘K)</span>
                     </Button>
                   </div>
                </div>

                <div className="flex items-center gap-2">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="md:hidden">
                          <Menu className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          {mainNav.map((item) => (
                            <Link href={item.href} key={item.href} passHref legacyBehavior>
                                <DropdownMenuItem onClick={(e: any) => handleNavigation(item.href, item.label, e)}>
                                  <item.icon className="mr-2 h-4 w-4" />
                                  {item.label}
                                </DropdownMenuItem>
                            </Link>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                            >
                                <Avatar>
                                    <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User Avatar'} />
                                    <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>{user?.displayName || "My Account"}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                             <DropdownMenuGroup>
                                {settingsNav.map((item) => (
                                <Link href={item.href} key={item.href} passHref legacyBehavior>
                                    <DropdownMenuItem onClick={(e: any) => handleNavigation(item.href, item.label, e)}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                    </DropdownMenuItem>
                                </Link>
                                ))}
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />
                             <a href="mailto:support@whatsmap.ai">
                                <DropdownMenuItem>
                                    <LifeBuoy className="mr-2 h-4 w-4" />
                                    Support
                                </DropdownMenuItem>
                             </a>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Theme</DropdownMenuLabel>
                            {themes.map((t) => (
                                <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)}>
                                <t.icon className="mr-2 h-4 w-4" />
                                <span>{t.label}</span>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                 <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <GlobalSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
        </>
    );
}
