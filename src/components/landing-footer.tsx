
"use client";

import Link from 'next/link';
import { ArrowRight, Twitter, Facebook, Linkedin, Puzzle } from 'lucide-react';
import { ShinyButton } from './ui/shiny-button';
import { Logo } from './logo';
import { Separator } from './ui/separator';

export function LandingFooter() {
  const footerLinks = {
    app: [
        { name: 'Search', href: '/search' },
        { name: 'About', href: '/about' },
        { name: 'System Status', href: '/status' },
        { name: 'SuperFreeTime', href: '/superfreetime' },
    ],
    resources: [
        { name: 'Handbook', href: '/blog' },
        { name: 'Ecosystem Blueprint', href: '/ecosystem' },
    ],
    legal: [
        { name: 'Data Privacy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
    ]
  };

  return (
    <footer className="relative w-full overflow-hidden mt-32 border-t border-border/40">
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-gradient-to-t from-primary/10 to-transparent rounded-t-full" />
      <div className="container relative z-10 py-16">
        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <Logo />
                    <p className="mt-4 text-foreground/60 max-w-xs">
                        An AI co-pilot for real estate that can tell, think, plan, calculate, review, and estimate.
                    </p>
                </div>
                <div className='md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8'>
                     <div>
                        <h3 className="font-semibold text-foreground">App</h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.app.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Resources</h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-foreground">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Separator className="my-8" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="text-sm text-foreground/50 text-center md:text-left space-y-1">
                    <p>WhatsMAP © 2025 <a href="https://mtcmartech.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">mtc'</a>. All rights reserved.</p>
                    <p className="text-xs">WhatsMAP is an AI system designed to answer people's questions about homes, and empower those who do.</p>
                    <p className="text-xs">AI Intelligence powered by Gemini (Google AI)</p>
                 </div>
                <div className="flex items-center gap-4">
                    <Link href="#" aria-label="Twitter">
                        <Twitter className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" />
                    </Link>
                     <Link href="#" aria-label="Facebook">
                        <Facebook className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" />
                    </Link>                     <Link href="#" aria-label="LinkedIn">
                        <Linkedin className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" />
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
