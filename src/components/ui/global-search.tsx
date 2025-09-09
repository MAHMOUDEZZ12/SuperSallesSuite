
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { type FilterCategory } from '@/lib/tools-client';
import { tools } from '@/lib/features';
import Link from 'next/link';

interface GlobalSearchProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const allTools = tools.filter(t => t.id !== 'superfreetime');

const searchCategories: {title: string, category: FilterCategory | 'All'}[] = [
    { title: 'Marketing', category: 'Marketing' },
    { title: 'Market Library', category: 'Market Library' },
    { title: 'Creative Suite', category: 'Creative' },
    { title: 'Sales Enablement', category: 'Sales Tools' },
    { title: 'Social & Comms', category: 'Social & Comms' },
    { title: 'Web & Editing', category: 'Web' },
];

export function GlobalSearch({ isOpen, setIsOpen }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState(allTools);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredTools(allTools);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const results = allTools.filter(tool =>
      tool.title.toLowerCase().includes(lowercasedQuery) ||
      tool.description.toLowerCase().includes(lowercasedQuery) ||
      tool.categories.some(cat => cat.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredTools(results);
  }, [query]);
  
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl p-0 gap-0">
        <div className="flex items-center px-4 border-b">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for tools, projects, or actions..."
            className="w-full h-12 border-none shadow-none focus-visible:ring-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {searchCategories.map(cat => {
                    const toolsInCategory = filteredTools.filter(tool => 
                        tool.categories.includes(cat.category as any)
                    );
                    if (toolsInCategory.length === 0) return null;
                    
                    return (
                        <div key={cat.title} className="space-y-3">
                            <h3 className="font-semibold text-muted-foreground">{cat.title}</h3>
                            <div className="space-y-2">
                                {toolsInCategory.map(tool => (
                                    <Link key={tool.id} href={`/dashboard/tool/${tool.id}`} onClick={() => setIsOpen(false)}>
                                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer">
                                            <div className="p-1.5 rounded-md text-white" style={{backgroundColor: tool.color}}>
                                                {React.cloneElement(tool.icon, {className: 'h-5 w-5'})}
                                            </div>
                                            <span className="font-medium text-sm">{tool.title}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                 })}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>No results found for &quot;{query}&quot;.</p>
            </div>
          )}
        </div>
        <div className="p-2 border-t bg-muted/50 text-center text-xs text-muted-foreground">
          Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd> to open/close.
        </div>
      </DialogContent>
    </Dialog>
  );
}
