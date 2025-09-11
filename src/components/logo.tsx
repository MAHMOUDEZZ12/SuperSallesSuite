
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Pyramid } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Logo = ({ className }: { className?: string }) => {
  const [logoText, setLogoText] = useState('selltoday.ai');
  const [logoHref, setLogoHref] = useState('/');

  useEffect(() => {
    // This effect runs only on the client, where window is available
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('whatsmap') || hostname.includes('searchdxb')) {
        setLogoText("What'sMAP");
        setLogoHref('/'); // Keep user on the search page
      } else if (hostname.includes('dxbbook.ai') || hostname.includes('dubaibook.ai') || hostname.includes('dxbbook.com') || hostname.includes('dxbbook.ae')) {
        setLogoText('dxbbook.ai');
        setLogoHref('/');
      } else {
        setLogoText('selltoday.ai');
        setLogoHref('/');
      }
    }
  }, []);

  return (
    <Link href={logoHref} className={cn("flex items-center gap-3 group", className)}>
      <div className="p-2 bg-primary text-primary-foreground rounded-lg">
        <Pyramid className="h-6 w-6" />
      </div>
      <span className="text-xl font-bold font-heading text-primary">
        {logoText}
      </span>
    </Link>
  );
};
