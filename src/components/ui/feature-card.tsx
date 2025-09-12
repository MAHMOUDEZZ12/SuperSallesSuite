
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from './card';
import { IconMap } from './icon-map';
import { type Feature } from '@/lib/features';
import { Sparkles, ArrowRight } from 'lucide-react';

export function FeatureCard({ tool }: { tool: Omit<Feature, 'renderResult'> }) {
    const Icon = IconMap[tool.icon] || Sparkles;

    return (
        <div className="group block h-full">
            <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 bg-card/50 backdrop-blur-lg">
                <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-lg text-white" style={{backgroundColor: tool.color}}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
