
'use client';

import React from 'react';
import { FinancialTable } from './financial-table';
import { CommissionCalculator } from './commission-calculator';
import { SchoolsAndAmenities } from './schools-and-amenities';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Project } from '@/types';
import { Sparkles } from 'lucide-react';
import { InteractiveListingBrief } from '../interactive-listing-brief';

/**
 * A dynamic component that renders the correct "content holder"
 * based on the type of briefing step provided by the AI.
 */
export function BriefingStep({ step, stepNumber }: { step: any; stepNumber: number }) {
  const renderContent = () => {
    switch (step.type) {
      case 'summary':
        return <p className="text-muted-foreground">{step.content}</p>;
      case 'listing_card_interactive':
        return <InteractiveListingBrief project={step.data as Project} />;
      case 'financial_summary':
        return <FinancialTable data={step.data} />;
      case 'broker_tools':
        return <CommissionCalculator data={step.data} />;
      case 'lifestyle_score':
        return <SchoolsAndAmenities data={step.data} />;
      default:
        return <p>Unsupported content type.</p>;
    }
  };

  return (
    <Card className="bg-muted/30 border-border/30">
      <CardHeader>
        {/* The explicit Step number has been removed for a more fluid experience */}
        <CardDescription className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Intelligence Update
        </CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
