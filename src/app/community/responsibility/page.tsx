
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ResponsibilityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
         <PageHeader 
            icon={<Shield className="h-8 w-8" />}
            title="AI Responsibility"
            description="Our commitment to building safe, ethical, and transparent AI systems."
        />
        <Card className="mt-12">
            <CardContent className="p-8 prose prose-lg dark:prose-invert max-w-none">
                <h2>Our Principles</h2>
                <p>
                    At WhatsMAP, we are guided by a core set of principles that ensure our AI development is conducted responsibly. Our commitment is to create technology that is not only powerful but also fair, transparent, and beneficial to our users and society.
                </p>
                 <ul>
                    <li><strong>Privacy & Security:</strong> Your data is yours. The content you upload to train your private knowledge base is never used to train our global models. We employ industry-leading security practices to protect your information.</li>
                    <li><strong>Transparency:</strong> We believe you should understand how our AI makes decisions. Our tools are designed to show their work, providing justifications and confidence scores where applicable, so you are always in control.</li>
                    <li><strong>Fairness:</strong> We are actively working to mitigate bias in our AI models. Our goal is to ensure that our tools provide fair and equitable outcomes for all users, regardless of background.</li>
                    <li><strong>Human-Centric Design:</strong> Our AI is a co-pilot, not an auto-pilot. Every tool is designed to augment your skills and judgment, not replace them. You are always the final decision-maker.</li>
                </ul>
            </CardContent>
        </Card>
      </main>
      <LandingFooter />
    </div>
  );
}
