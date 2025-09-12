
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BookOpen, GitBranch, Sparkles, Code, Calendar, Briefcase, Shield, BarChart, Users } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';

const communitySections = [
    {
        title: 'Academy',
        description: 'Articles, research, and our AI Learning Curve to master the platform.',
        href: '/blog',
        icon: <BookOpen />,
    },
    {
        title: 'Ecosystem Blueprint',
        description: 'The strategic and technical vision for the WhatsMAP platform.',
        href: '/ecosystem',
        icon: <GitBranch />,
    },
    {
        title: 'Documentation',
        description: 'Explore the technology stack, AI flows, and API connections.',
        href: '/documentation',
        icon: <Code />,
    },
    {
        title: 'Roadmap',
        description: 'See what features and integrations are coming next.',
        href: '/community/roadmap',
        icon: <BarChart />,
    },
     {
        title: 'Events & Training',
        description: 'Join webinars, live training sessions, and community meetups.',
        href: '/community/events',
        icon: <Calendar />,
    },
    {
        title: 'Careers',
        description: 'Want to help build the future of real estate? Join our team.',
        href: '/community/careers',
        icon: <Briefcase />,
    },
    {
        title: 'Responsibility',
        description: 'Our commitment to ethical AI and responsible data practices.',
        href: '/community/responsibility',
        icon: <Shield />,
    },
     {
        title: 'System Status',
        description: 'View the real-time operational status of all our services.',
        href: '/status',
        icon: <Sparkles />,
    },
];


export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
         <PageHeader 
            icon={<Users className="h-8 w-8" />}
            title="Community & Resources"
            description="Your central hub for learning, discovery, and connection within the WhatsMAP universe."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communitySections.map((section) => (
                <Link key={section.title} href={section.href} className="group flex">
                    <Card className="w-full bg-card/50 backdrop-blur-lg border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-primary/10 flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl font-heading flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                        {section.icon}
                                    </div>
                                    {section.title}
                                </CardTitle>
                                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{section.description}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>

      </main>
      <LandingFooter />
    </div>
  );
}
