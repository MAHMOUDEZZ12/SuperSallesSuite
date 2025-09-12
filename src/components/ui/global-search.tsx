
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Bot } from 'lucide-react';
import { tools } from '@/lib/features';
import Link from 'next/link';
import { IconMap } from './icon-map';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'cmdk';
import { useRouter } from 'next/navigation';

interface GlobalSearchProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const allTools = tools.filter(t => t.id !== 'superfreetime');

export function GlobalSearch({ isOpen, setIsOpen }: GlobalSearchProps) {
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen(!isOpen)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [isOpen, setIsOpen])
    
    const runCommand = (command: () => void) => {
        setIsOpen(false);
        command();
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl p-0 gap-0">
            <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&[cmdk-group]]:px-2 [&[cmdk-input-wrapper]_svg]:h-5 [&[cmdk-input-wrapper]_svg]:w-5 [&[cmdk-input]]:h-12 [&[cmdk-item]]:px-2 [&[cmdk-item]]:py-3 [&[cmdk-item]_svg]:h-5 [&[cmdk-item]_svg]:w-5">
                <CommandInput placeholder="Search tools or ask the AI anything..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Apps & Tools">
                        {allTools.map(tool => {
                            const Icon = IconMap[tool.icon];
                            return (
                                <CommandItem 
                                    key={tool.id}
                                    onSelect={() => runCommand(() => router.push(`/dashboard/tool/${tool.id}`))}
                                >
                                    <div className="p-1.5 rounded-md text-white mr-3" style={{backgroundColor: tool.color}}>
                                        <Icon className='h-5 w-5' />
                                    </div>
                                    <span>{tool.title}</span>
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>
                     <CommandGroup heading="AI Assistant">
                        <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/assistant'))}>
                             <div className="p-1.5 rounded-md text-white mr-3 bg-primary">
                                <Bot className='h-5 w-5' />
                            </div>
                            <span>Go to AI Command Center</span>
                        </CommandItem>
                     </CommandGroup>
                </CommandList>
            </Command>
        </DialogContent>
        </Dialog>
    );
}
