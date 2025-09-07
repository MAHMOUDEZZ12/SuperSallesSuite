
"use client";

import Link from 'next/link';
import { ArrowRight, Twitter, Facebook, Linkedin, Puzzle } from 'lucide-react';
import { ShinyButton } from './ui/shiny-button';
import { Logo } from './logo';
import { Separator } from './ui/separator';

export function LandingFooter() {
  const footerLinks = {
    gemin: [
        { name: 'About', href: '/about' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'System Status', href: '/status' },
        { name: 'SuperFreeTime', href: '/superfreetime' },
    ],
    resources: [
        { name: 'Handbook', href: '/blog' },
        { name: 'Documentation', href: '/documentation' },
        { name: 'Gemin Mindmap', href: '/sx3-mindmap' },
        { name: 'Technology', href: '/technology' },
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/80 backdrop-blur-lg rounded-3xl p-8 md:p-16 border shadow-2xl shadow-primary/10">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
                Ready to Build Your Future?
              </h2>
              <p className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto">
                Join thousands of top-performing agents who are closing more
                deals with the power of AI. Your next chapter starts here.
              </p>
               <Link href="/signup">
                  <ShinyButton>
                    Start Your Free Trial
                  </ShinyButton>
                </Link>
            </div>
          </div>
        </div>

        <div className="mt-24">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <Logo />
                    <p className="mt-4 text-foreground/60 max-w-xs">
                        The ultimate sales suite, empowering agents to create stunning marketing campaigns and close more deals.
                    </p>
                </div>
                <div className='md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8'>
                     <div>
                        <h3 className="font-semibold text-foreground">Gemin</h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.gemin.map((link) => (
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
                 <p className="text-sm text-foreground/50 text-center md:text-left">
                    Gemin © 2025 <a href="https://mtcmartech.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">mtc'</a>. All rights reserved.
                </p>
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
