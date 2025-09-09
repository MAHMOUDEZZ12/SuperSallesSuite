
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Check, ExternalLink, ArrowRight } from 'lucide-react';
import { type FilterCategory } from '@/lib/tools-client';
import { tools } from '@/lib/features';
import { blogContent } from '@/lib/blog-content';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const blogCategories: FilterCategory[] = ['All', 'Marketing', 'Lead Gen', 'Creative', 'Sales Tools', 'Social & Comms', 'Web', 'Editing', 'Ads'];

const allHacks = Object.keys(blogContent).map(slug => {
    const tool = tools.find(t => t.id === slug);
    return {
        slug: slug,
        title: blogContent[slug].title,
        intro: blogContent[slug].intro,
        categories: tool?.categories || [],
        Icon: tool?.icon,
        color: tool?.color,
        toolTitle: tool?.title || 'General',
    };
});

export default function BlogIndexPage() {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

    const filteredHacks = activeFilter === 'All'
        ? allHacks
        : allHacks.filter(hack => hack.categories.includes(activeFilter));

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
                <div className="text-center mb-16">
                     <BookOpen className="mx-auto h-16 w-16 mb-4 text-primary" />
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
                        The Gemin Handbook
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
                        A collection of actionable guides, tips, and hacks to get the most out of your AI toolkit.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24">
                            <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
                            <div className="flex flex-col gap-2">
                                {blogCategories.map(category => (
                                    <Button
                                        key={category}
                                        variant={activeFilter === category ? 'default' : 'ghost'}
                                        className="justify-start gap-3"
                                        onClick={() => setActiveFilter(category)}
                                    >
                                        <div className="w-5 h-5 flex items-center justify-center">
                                            {activeFilter === category && <Check className="h-4 w-4" />}
                                        </div>
                                        <span>{category}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </aside>
                    <div className="lg:col-span-3">
                         <h2 className="text-3xl font-bold mb-8">
                           {activeFilter === 'All' ? 'All Hacks' : activeFilter}
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredHacks.map(hack => (
                                <Link key={hack.slug} href={`/blog/${hack.slug}`} className="group flex">
                                    <Card className="flex flex-col w-full bg-card/50 backdrop-blur-lg border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-primary/10">
                                         <CardContent className="flex-grow p-6">
                                            <h3 className="text-xl font-bold font-heading text-foreground mb-2">{hack.title}</h3>
                                            <p className="text-foreground/70 text-sm">
                                                {hack.intro.substring(0, 120)}...
                                            </p>
                                        </CardContent>
                                        <CardFooter className="flex justify-between items-center">
                                            {hack.Icon && (
                                                 <div className={cn("flex items-center gap-2 p-1 pr-2 rounded-md w-fit text-white")} style={{ backgroundColor: hack.color }}>
                                                    <hack.Icon className='h-4 w-4' />
                                                    <span className="text-xs font-semibold">{hack.toolTitle}</span>
                                                </div>
                                            )}
                                            <div className="text-primary font-semibold flex items-center gap-2 text-sm">
                                                Read Hack
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))}
                         </div>
                    </div>
                </div>
            </main>
            <LandingFooter />
        </div>
    );
}
