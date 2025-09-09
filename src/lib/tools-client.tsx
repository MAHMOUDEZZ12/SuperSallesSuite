
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Copy, Download, Sparkles } from 'lucide-react';
import { tools as features, type Feature } from '@/lib/features';

export { type Feature, type Field, type FilterCategory } from '@/lib/features';
export { tools } from '@/lib/features';


export const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const filesToDataUris = (files: FileList | null): Promise<string[]> => {
    if (!files) return Promise.resolve([]);
    return Promise.all(Array.from(files).map(fileToDataUri));
};


// Note: The `tools` array is now imported from `lib/features` and re-exported.
// This file only contains the client-side `renderResult` implementations
// and attaches them to the imported tools array.

const copyToClipboard = (text: string, toast: any) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "The text has been copied successfully.",
    });
};

const renderResultForInstaAdsDesigner = (result: any, toast: any) => (
   <div className="space-y-6">
      <Card>
        <CardHeader>
            <CardTitle>Generated Ad Copy</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="p-4 bg-muted rounded-md relative group">
                <p className="whitespace-pre-wrap">{result.adCopy}</p>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.adCopy, toast)}><Copy className="h-4 w-4" /></Button>
            </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
            <CardTitle>Generated Ad Design (Brochure)</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="border rounded-lg overflow-hidden">
                <iframe src={`${result.adDesign}#view=fitH`} className="w-full h-[600px]"/>
            </div>
             <a href={result.adDesign} download="brochure.pdf" className="mt-4 inline-block">
                <Button variant="outline"><Download className="mr-2"/> Download PDF</Button>
            </a>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
            <CardTitle>Generated Landing Page Preview</CardTitle>
        </CardHeader>
        <CardContent>
             <div className="border rounded-lg overflow-hidden w-fit">
                <Image src={result.landingPage} alt="Generated landing page" width={800} height={600} className="object-contain" />
                </div>
                <a href={result.landingPage} download="landing-page.png" className="mt-4 inline-block">
                    <Button variant="outline"><Download className="mr-2"/> Download Image</Button>
                </a>
        </CardContent>
      </Card>
    </div>
);

const renderResultForListingGenerator = (result: any, toast: any) => (
   <div className="space-y-6">
    <div>
      <h3 className="font-semibold text-lg mb-2">Generated Title</h3>
      <div className="p-4 bg-muted rounded-md relative group">
        <p className="whitespace-pre-wrap">{result.title}</p>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.title, toast)}><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-lg mb-2">Generated Description</h3>
      <div className="p-4 bg-muted rounded-md relative group">
        <p className="whitespace-pre-wrap">{result.description}</p>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.description, toast)}><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-lg mb-2">Suggested Keywords</h3>
      <div className="p-4 bg-muted rounded-md">
        <p className="text-sm text-muted-foreground">{result.keywords.join(', ')}</p>
      </div>
    </div>
  </div>
);

const renderResultForCommissionCalculator = (result: any, toast: any) => {
  const salePrice = Number(result.salePrice);
  const commission = salePrice * 0.05;
  return (
    <div className="space-y-4">
      <Card className="text-center">
        <CardHeader>
          <CardDescription>Total Commission (5%)</CardDescription>
          <CardTitle className="text-4xl text-primary">
            AED {commission.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Based on a sale price of AED {salePrice.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const renderResultForPaymentPlanner = (result: any, toast: any) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">{result.planName}</h3>
    <p className="text-sm text-muted-foreground">{result.planDescription}</p>
    <div className="border rounded-md">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="p-2 text-left text-sm font-medium">Milestone</th>
            <th className="p-2 text-left text-sm font-medium">Date</th>
            <th className="p-2 text-right text-sm font-medium">Amount (AED)</th>
            <th className="p-2 text-right text-sm font-medium">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {result.milestones.map((item: any, index: number) => (
            <tr key={index} className="border-t">
              <td className="p-2 font-medium">{item.milestone}</td>
              <td className="p-2 text-muted-foreground">{item.date}</td>
              <td className="p-2 text-right font-mono">{item.amount.toLocaleString()}</td>
              <td className="p-2 text-right font-mono text-primary">{item.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Button onClick={() => toast({ title: "Plan Saved!", description: "The payment plan has been saved to the project." })}>
      Save Plan to Project
    </Button>
  </div>
);

const renderResultForInvestorMatching = (result: any, toast: any) => (
   <div className="space-y-4">
        <h3 className="font-semibold text-lg mb-2">Top Investor Matches</h3>
        <ul className="space-y-3">
        {result.matches.map((match: any, index: number) => (
            <li key={index} className="p-4 bg-muted rounded-md border">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold text-primary">{match.name}</p>
                        <p className="text-sm text-muted-foreground">Match Score: {match.matchScore}/100</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(match.email, toast)}>Copy Email</Button>
                </div>
                <p className="text-sm mt-2">{match.reasoning}</p>
            </li>
        ))}
        </ul>
  </div>
);

const renderResultForInstagramAdmin = (result: any, toast: any) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">{result.status}</h3>
    <div className="p-4 bg-muted rounded-md relative group">
      <p className="whitespace-pre-wrap">{result.result}</p>
      <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.result, toast)}><Copy className="h-4 w-4" /></Button>
    </div>
  </div>
);

const renderResultForBrochureTranslator = (result: any, toast: any) => (
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Translated Brochure</h3>
          <div className="border rounded-lg overflow-hidden">
            <iframe src={`${result.translatedBrochureDataUri}#view=fitH`} className="w-full h-[600px]"/>
          </div>
          <a href={result.translatedBrochureDataUri} download="translated-brochure.pdf" className="mt-4 inline-block">
            <Button variant="outline"><Download className="mr-2"/> Download PDF</Button>
          </a>
        </div>
      </div>
    );

// Map render functions to tool IDs
const renderFunctionMap: { [key: string]: (result: any, toast: any) => React.ReactNode } = {
  'insta-ads-designer': renderResultForInstaAdsDesigner,
  'listing-generator': renderResultForListingGenerator,
  'commission-calculator': renderResultForCommissionCalculator,
  'payment-planner': renderResultForPaymentPlanner,
  'investor-matching': renderResultForInvestorMatching,
  'instagram-admin-ai': renderResultForInstagramAdmin,
  'brochure-translator': renderResultForBrochureTranslator,
};

// Combine the base tools data with their client-side render functions
export const clientTools: Feature[] = features.map(tool => ({
  ...tool,
  renderResult: renderFunctionMap[tool.id],
}));
