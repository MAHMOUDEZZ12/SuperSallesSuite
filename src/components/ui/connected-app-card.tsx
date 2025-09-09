
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from './card';
import { Button } from './button';

interface ConnectedAppCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    ctaText: string;
    href: string;
}

export const ConnectedAppCard = ({ title, description, icon, ctaText, href }: ConnectedAppCardProps) => (
    <Card className="bg-muted/50 hover:bg-muted transition-colors h-full flex flex-col">
        <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
            <div className="p-2 bg-primary/10 text-primary rounded-lg w-fit shrink-0">
                {icon}
            </div>
            <div>
                <CardTitle className="text-base font-semibold">{title}</CardTitle>
                <CardDescription className="text-xs">{description}</CardDescription>
            </div>
        </CardHeader>
        <CardFooter className="pt-0">
            <Link href={href} className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                    {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </CardFooter>
    </Card>
);
