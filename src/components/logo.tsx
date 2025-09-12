
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export const Logo = ({ className }: { className?: string }) => {
  const [logoText, setLogoText] = useState('selltoday.ai');
  const [logoSrc, setLogoSrc] = useState('https://firebasestorage.googleapis.com/v0/b/supersellerae-4rzzy.firebasestorage.app/o/WhatsMAP%20logo.png?alt=media&token=b8538a4a-677c-40d5-a35c-4eac20828352');

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
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <div className="relative h-9 w-9">
        <Image src={logoSrc} alt="WhatsMAP Logo" fill={true} className="object-contain" />
      </div>
      <span className="text-xl font-bold font-heading tracking-tight">
        {logoText}
      </span>
    </Link>
  );
};
