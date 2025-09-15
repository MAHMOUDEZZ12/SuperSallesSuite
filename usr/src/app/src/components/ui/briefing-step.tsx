
'use client';

import React from 'react';
import { FinancialTable } from './financial-table';
import { CommissionCalculator } from './commission-calculator';
import { SchoolsAndAmenities } from './schools-and-amenities';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { ProjectCard } from './project-card';
import { Project } from '@/types';

/**
 * A dynamic component that renders the correct "content holder"
 * based on the type of briefing step provided by the AI.
 */
export function BriefingStep({ step, stepNumber }: { step: any; stepNumber: number }) {
  const renderContent = () => {
    switch (step.type) {
      case 'summary':
        return <p className="text-muted-foreground">{step.content}</p>;
      case 'listing':
        return <ProjectCard project={step.data as Project} />;
      case 'financials':
        return <FinancialTable data={step.data} />;
      case 'commission':
        return <CommissionCalculator data={step.data} />;
      case 'schools':
        return <SchoolsAndAmenities data={step.data} />;
      default:
        return <p>Unsupported content type.</p>;
    }
  };

  return (
    <Card className="bg-muted/30 border-border/30">
      <CardHeader>
        <CardDescription>Step {stepNumber}</CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
