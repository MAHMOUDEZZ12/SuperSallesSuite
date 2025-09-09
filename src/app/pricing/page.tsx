
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShinyButton } from '@/components/ui/shiny-button';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';


export default function PricingPage() {
  const [isAnnual, setIsAnnual] = React.useState(true);
  
  const pricingTiers = [
    {
        name: 'Student',
        price: '$0',
        pricePeriod: '/ forever',
        description: 'Commission, payments, brochures, and daily market insights — free forever. Upgrade when you need more power.',
        features: [
            'Commission Calculator',
            `Market Trends (Daily Insight)`,
            'Brochure Translator (1/day)',
            'Payment Planner (Basic)',
            'AI Copilot (Limited)',
            'Free *.sx3.site subdomain',
        ],
        cta: 'Start for Free',
        variant: 'outline'
    },
    {
        name: 'Seller',
        price: isAnnual ? '$19' : '$29',
        pricePeriod: '/ month',
        description: 'Everything you need to sell as a solo agent.',
        features: [
            'Everything in Student, plus:',
            `All Creative Suite tools`,
            '5 GB Storage',
            'WhatsApp & Email sender',
            'AI Copilot Lite (10/day)',
        ],
        cta: 'Start Selling',
        variant: 'default',
        isFeatured: true,
    },
    {
        name: 'Marketer',
        price: isAnnual ? '$89' : '$129',
        pricePeriod: '/ month',
        description: 'For power users who want to operate like an agency.',
        features: [
            'Everything in Seller, plus:',
            'Ad write access (Meta, etc.)',
            'Audience Tools',
            'Creative Suite Pro',
            'Automations & Scheduling',
            '50 GB Storage',
            'AI Copilot Pro (Unlimited)',
        ],
        cta: 'Start Marketing',
        variant: 'outline'
    },
    {
        name: 'CEO',
        price: isAnnual ? '$349' : '$499',
        pricePeriod: '/ month',
        description: 'For brokerages that need team governance.',
        features: [
            'Everything in Marketer, plus:',
            '5 Team Seats',
            'Multi-brand Kits',
            'Shared Project Libraries',
            'Portfolio Reporting & Analytics',
            'SSO, Audit Logs, & Export Controls',
            'Priority Support',
        ],
        cta: 'Contact Sales',
        variant: 'outline'
    }
];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            Find the Plan That's Right for You
          </h1>
           <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            Choose a plan that fits your needs and start closing more deals today. Simple, transparent pricing with no hidden fees.
          </p>
        </div>
        
        <div className="flex justify-center items-center gap-4 mb-12">
            <span className={cn("font-medium", !isAnnual && "text-primary")}>Monthly</span>
            <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                aria-label="Toggle annual pricing"
            />
            <span className={cn("font-medium", isAnnual && "text-primary")}>
                Annual (Save up to 30%)
            </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {pricingTiers.map((tier) => (
                 <Card 
                    key={tier.name}
                    className={cn(
                        "flex flex-col h-full",
                        tier.isFeatured && "border-primary ring-2 ring-primary/50 shadow-lg shadow-primary/20"
                    )}
                 >
                    <CardHeader className="h-48">
                        {tier.isFeatured && (
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Star className="h-5 w-5 text-primary" />
                                <p className="font-semibold text-primary">Most Popular</p>
                            </div>
                        )}
                        <CardTitle className="text-3xl font-heading text-center">{tier.name}</CardTitle>
                        <CardDescription className="text-center min-h-[40px]">{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                       <div className="text-center mb-8 h-20">
                         <span className="text-5xl font-bold">
                            {tier.price}
                         </span>
                          {tier.pricePeriod && <span className="text-muted-foreground">{tier.pricePeriod}</span>}
                           {tier.name !== 'Student' && tier.name !== 'CEO' && isAnnual && (
                            <p className="text-sm text-muted-foreground">billed annually</p>
                          )}
                       </div>
                       <ul className="space-y-3 text-foreground/80 text-sm">
                         {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-primary shrink-0" />
                                <span>{feature}</span>
                            </li>
                         ))}
                       </ul>
                    </CardContent>
                    <CardFooter>
                       <Link href="/signup" className="w-full">
                           {tier.isFeatured ? (
                                <ShinyButton className="w-full">{tier.cta}</ShinyButton>
                           ) : (
                                <Button className="w-full" variant={tier.variant as any}>{tier.cta}</Button>
                           )}
                       </Link>
                    </CardFooter>
                 </Card>
            ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-8">*Domain credit for student plan is subject to verification and fair-use limits.</p>
      </main>
      <LandingFooter />
    </div>
  );
}
