
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { tools } from '@/lib/tools-client';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { cn } from '@/lib/utils';

const blogContent: { [key: string]: { title: string; intro: string; sections: { heading: string; body: string }[] } } = {
    'ad-creation': {
        title: 'Stop Guessing, Start Generating: How AI Creates High-Performance Ads in 60 Seconds',
        intro: "In the competitive world of real estate, a great ad can be the difference between a listing that sits and a property that sells. But creating compelling ads takes time, design skills, and a dash of copywriting magic. What if you could skip the guesswork and generate a full campaign from a single brochure? Now you can.",
        sections: [
            { heading: "The Old Way: Hours of Manual Work", body: "Traditionally, creating an ad campaign is a multi-step process. You'd hire a designer for visuals, a copywriter for messaging, and spend hours coordinating revisions. The result? An expensive, time-consuming process that yields only one or two ad variations, leaving you guessing what will actually resonate with buyers." },
            { heading: "The New Way: Instant, AI-Powered Campaigns", body: "Our Instant Ad Creation tool transforms this entire workflow. Simply upload any property brochure, and our AI gets to work. It analyzes the key features, identifies the most compelling selling points, and generates multiple versions of ad copy and visuals tailored to different audiences. From Facebook carousels to Instagram stories, you get a full suite of assets in under a minute." },
            { heading: "Why It Works: Data-Driven Creativity", body: "This isn't just about speed; it's about intelligence. The AI understands what drives engagement and conversions in real estate marketing. It crafts headlines that grab attention, highlights amenities that buyers crave, and designs visuals that are clean, professional, and on-brand. Stop the manual grind and start creating ads that work." }
        ]
    },
    'targeting': {
        title: 'Find Your Perfect Buyer Before They Find You: The Power of Precision Targeting',
        intro: "Stop wasting your ad budget on broad audiences. In today's digital landscape, the key to a successful ad campaign isn't just reaching more people—it's reaching the *right* people. Our Precision Targeting tool gives you an almost unfair advantage by identifying high-intent buyers before they even know they're looking.",
        sections: [
            { heading: "Beyond Basic Demographics", body: "Most ad platforms let you target by age and location. That's not enough. Our AI goes deeper, analyzing thousands of anonymous data points—like searches for mortgage calculators, activity in local community groups, and engagement with specific types of real estate content—to build a rich profile of your ideal buyer." },
            { heading: "From Property to Persona", body: "Provide the details of your listing, and the AI builds a detailed persona of the most likely buyer. Is it a young family looking for good schools? A professional couple seeking a downtown lifestyle? Our tool tells you exactly who they are, what they're interested in, and how to reach them on platforms like Facebook and Google." },
            { heading: "Maximize Your ROI", body: "When you know exactly who you're talking to, every ad dollar works harder. Precision Targeting eliminates wasted spend, increases click-through rates, and fills your pipeline with qualified, high-intent leads who are genuinely interested in what you have to offer." }
        ]
    },
     'rebranding': {
        title: "Make It Yours: Rebrand Any Brochure in a Single Click",
        intro: "You've got the listing, but the developer's brochure doesn't have your name on it. Before, you'd need design skills and hours in a complex tool to add your branding. With our Automated Rebranding tool, you can make any marketing material your own in less time than it takes to make a coffee.",
        sections: [
            { heading: "The Branding Bottleneck", body: "Getting your brand onto marketing materials is crucial for building name recognition and trust. But it's often a frustrating bottleneck. You have to ask the developer's team for changes or try to edit a locked PDF yourself. It's slow, inefficient, and holds you back from marketing the property." },
            { heading: "Instant Brand Alignment", body: "Our tool changes the game. Upload any standard PDF brochure, provide your logo and contact information, and watch as the AI instantly generates a new, perfectly rebranded version. It intelligently places your logo, updates the contact details, and even adjusts colors and fonts to match your brand identity. Don't have a logo? It will create a clean, professional one for you on the fly." },
            { heading: "Professionalism, Standardized", body: "Now you can present every listing with a consistent, professional look that reinforces your brand. No more generic brochures or inconsistent marketing. Present a unified, polished front to every client, every time, and build the brand you've always envisioned." }
        ]
    },
    // Add other blog contents...
};


export default function BlogPage() {
    const { slug } = useParams<{ slug: string }>();
    const feature = tools.find(t => t.id === slug);
    const content = blogContent[slug] || { title: "Feature Not Found", intro: "This feature does not have a blog post yet.", sections: [] };

    if (!feature) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <LandingHeader />
                <main className="flex-1 text-center py-20">
                    <h1 className="text-4xl font-bold">Sorry, we couldn't find that post.</h1>
                    <Link href="/">
                        <Button variant="link" className="mt-4">Return to Home</Button>
                    </Link>
                </main>
                <LandingFooter />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
                <article>
                    <header className="mb-12 text-center">
                        <div className={cn("inline-block p-4 mb-6 text-white rounded-2xl bg-gradient-to-br", feature.color)}>
                            {React.cloneElement(feature.icon, { className: 'h-12 w-12' })}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
                            {content.title}
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
                            {content.intro}
                        </p>
                    </header>

                    <Card className="bg-card/50 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/10 overflow-hidden">
                        <CardContent className="p-0">
                            <Image
                                src={`https://picsum.photos/seed/${slug}/1200/600`}
                                alt={feature.title}
                                width={1200}
                                height={600}
                                className="w-full object-cover"
                                data-ai-hint="feature illustration"
                            />
                            <div className="p-8 md:p-10 space-y-8 text-lg text-foreground/80">
                                {content.sections.map((section, index) => (
                                    <section key={index}>
                                        <h2 className="text-2xl font-bold text-foreground mb-3">{section.heading}</h2>
                                        <p>{section.body}</p>
                                    </section>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <section className="mt-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to try it yourself?</h2>
                        <p className="text-lg text-foreground/60 mb-8">Stop waiting and start creating. Generate your first {feature.cta} in seconds.</p>
                        <Link href={`/dashboard/tool/${feature.id}`}>
                            <ShinyButton>
                                Go to the {feature.title} Tool
                                <ArrowRight />
                            </ShinyButton>
                        </Link>
                    </section>
                </article>
            </main>
            <LandingFooter />
        </div>
    );
}
