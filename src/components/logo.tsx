
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Pyramid } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Logo = ({ className }: { className?: string }) => {
  const [logoText, setLogoText] = useState('selltoday.ai');

  useEffect(() => {
    // In a real app, this might be determined by user settings or domain
    const hostname = window.location.hostname;
    if (hostname.includes('whatsmap')) {
      setLogoText('WhatsMAP');
    } else {
      setLogoText('selltoday.ai');
    }
  }, []);

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="p-2 bg-primary text-primary-foreground rounded-lg">
        <Pyramid className="h-5 w-5" />
      </div>
      <span className="text-xl font-bold font-heading tracking-tight">
        {logoText}
      </span>
    </Link>
  );
};
