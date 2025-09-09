
'use client';

import React from 'react';
import { useTabManager } from '@/context/TabManagerContext';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function DashboardFooter() {
    const { openTabs, removeTab } = useTabManager();
    const pathname = usePathname();
    
    if (openTabs.length <= 1) return null;

    return (
        <footer className="sticky bottom-0 z-30 flex h-10 items-center gap-2 border-t bg-background/95 px-4 backdrop-blur-sm sm:px-6 overflow-x-auto no-scrollbar">
            {openTabs.map((tab) => (
                <div key={tab.href} className="group relative flex items-center flex-shrink-0">
                    <Link href={tab.href} passHref legacyBehavior>
                        <Button
                            variant={pathname === tab.href ? "secondary" : "ghost"}
                            size="sm"
                            className="h-8 pr-8 text-xs"
                        >
                            <span>{tab.label}</span>
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 h-8 w-8 rounded-l-none opacity-50 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeTab(tab.href);
                        }}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            ))}
        </footer>
    );
}

    
