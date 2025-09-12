
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Pyramid } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Logo = ({ className }: { className?: string }) => {
  const [logoText, setLogoText] = useState('WhatsMAP');
  const [logoHref, setLogoHref] = useState('/');

  useEffect(() => {
    // This effect runs only on the client, where window is available
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('selltoday.ai')) {
         setLogoText('selltoday.ai');
      } else {
        setLogoText('WhatsMAP');
      }
      setLogoHref('/');
    }
  }, []);

  return (
    <Link href={logoHref} className={cn("flex items-center gap-3 group", className)}>
      <div className="p-2 text-primary rounded-lg">
        <Pyramid className="h-6 w-6" />
      </div>
      <span className="text-xl font-bold font-heading text-primary">
        {logoText}
      </span>
    </Link>
  );
};
