
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight, Briefcase, Building, TrendingUp, Library } from "lucide-react";
import { Button } from "@/components/ui/button";

const personas = [
    { 
        name: 'Agent', 
        href: '/solutions/agent',
        description: 'Automate marketing, qualify leads, and close deals faster.',
        icon: <Briefcase className="h-8 w-8 text-primary"/>
    },
    { 
        name: 'Investor', 
        href: '/solutions/investor',
        description: 'Find off-market deals and analyze ROI with institutional-grade data.',
        icon: <TrendingUp className="h-8 w-8 text-primary"/>
    },
    { 
        name: 'Developer', 
        href: '/solutions/developer',
        description: 'From site acquisition to sell-out, powered by market intelligence.',
        icon: <Building className="h-8 w-8 text-primary"/>
    },
];

/**
 * NEW: The "Solutions" page is now a content-rich hub explaining the Market Library,
 * with a creative internal menu to guide users to persona-specific pages.
 */
export default function SolutionsHubPage() {
  return (
    <div className="container mx-auto px-6 py-12">
        <PageHeader
            icon={<Library className="h-10 w-10"/>}
            title="The AI-Powered Market Library"
            description="Our ecosystem is built on a foundation of live, comprehensive market data. We don't just give you tools; we give you an unfair intelligence advantage."
            className="text-center mb-16"
        />

        <div className="prose prose-invert max-w-4xl mx-auto text-lg text-center">
            <p>
                Traditional portals provide lists. WhatsMAP provides intelligence. Our system constantly watches the entire real estate market—indexing listings, developer announcements, news, and economic indicators. This creates a living "Market Library" that powers every tool in our suite, ensuring your strategies are always based on the most current and complete picture of reality.
            </p>
        </div>

        <div className="my-24">
             <h2 className="text-3xl font-bold font-heading text-center mb-10">Find Your Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {personas.map((persona) => (
                     <Link key={persona.name} href={persona.href} className="group block">
                        <Card className="h-full bg-muted/40 hover:border-primary/50 transition-colors duration-300 text-center">
                             <CardContent className="p-8">
                                <div className="p-4 bg-background rounded-full w-fit mx-auto mb-4 border">
                                    {persona.icon}
                                </div>
                                <CardTitle>{persona.name}</CardTitle>
                                <CardDescription className="mt-2">{persona.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button variant="link" className="w-full">
                                    Explore Tools for {persona.name}s <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                                </Button>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  );
}
