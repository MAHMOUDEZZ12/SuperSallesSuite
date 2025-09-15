'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Users, Zap } from 'lucide-react';
import { InteractiveListingBrief } from "@/components/ui/interactive-listing-brief";

// --- WIDGETS MOVED HERE FOR CLEANLINESS ---

const SummaryWidget = ({ content }: { content: string }) => (
    <Card className="bg-muted/30 border-border/50">
        <CardContent className="p-6">
            <div className="prose prose-lg prose-invert max-w-none text-muted-foreground">{content}</div>
        </CardContent>
    </Card>
);

const FinancialSummaryWidget = ({ data }: { data: any }) => (
    <Card className="bg-muted/30 border-primary/20">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary"><BarChart /> Investor Snapshot</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
            <div><p className="text-2xl font-bold">{data.roi}</p><p className="text-xs text-muted-foreground">Est. 5-Year ROI</p></div>
            <div><p className="text-2xl font-bold">{data.yield}</p><p className="text-xs text-muted-foreground">Est. Rental Yield</p></div>
            <div><p className="text-2xl font-bold">{data.cap_rate}</p><p className="text-xs text-muted-foreground">Cap Rate</p></div>
        </CardContent>
    </Card>
);

const BrokerToolsWidget = ({ data }: { data: any }) => (
    <Card className="bg-muted/30 border-primary/20">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary"><Users /> Broker Intel</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="font-semibold">Est. Commission: <span className="text-primary">{data.commission_potential}</span></p>
            <p className="text-sm font-semibold mt-4 mb-2">Key Talking Points:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">{data.talking_points.map((point: string, i: number) => <li key={i}>{point}</li>)}</ul>
        </CardContent>
    </Card>
);

const LifestyleScoreWidget = ({ data }: { data: any }) => (
    <Card className="bg-muted/30 border-primary/20">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary"><Zap /> Lifestyle Score</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
            <div><p className="text-2xl font-bold">{data.walkability}</p><p className="text-xs text-muted-foreground">Walkability</p></div>
            <div><p className="text-2xl font-bold">{data.schools}</p><p className="text-xs text-muted-foreground">Schools</p></div>
            <div><p className="text-2xl font-bold">{data.amenities}</p><p className="text-xs text-muted-foreground">Amenities</p></div>
        </CardContent>
    </Card>
);

const componentMap: { [key: string]: React.ComponentType<any> } = {
  summary: SummaryWidget,
  listing_card_interactive: InteractiveListingBrief,
  financial_summary: FinancialSummaryWidget,
  broker_tools: BrokerToolsWidget,
  lifestyle_score: LifestyleScoreWidget,
};

export function SearchResultsBriefing({ briefing }: { briefing: any }) {
  if (!briefing || !briefing.content_blocks) return null;

  return (
    <div className="space-y-6 pb-20">
        <p className="text-sm text-center text-muted-foreground">Intelligence Briefing for: <span className="font-semibold text-primary capitalize">{briefing.inferred_persona}</span></p>
        {briefing.content_blocks.map((block: any, index: number) => {
            const Component = componentMap[block.type];
            if (!Component) return null;
            const props = block.type === 'listing_card_interactive' ? { project: block.data } : block;
            return <Component key={`${block.type}-${index}`} {...props} />;
        })}
    </div>
  );
}
