
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({ className, host }: { className?: string, host?: string }) => {
  const isSelltoday = host?.includes('selltoday.ai');
  
  const logoText = isSelltoday ? 'selltoday.ai' : 'WhatsMAP';
  const logoSrc = isSelltoday 
    ? '/selltoday-logo.png' // Placeholder for selltoday logo
    : 'https://firebasestorage.googleapis.com/v0/b/supersellerae-4rzzy.firebasestorage.app/o/WhatsMAP%20logo.png?alt=media&token=b8538a4a-677c-40d5-a35c-4eac20828352';

  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <div className="relative h-9 w-9">
        {isSelltoday ? (
             <div className="h-9 w-9 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-xl">S</div>
        ): (
            <Image src={logoSrc} alt="WhatsMAP Logo" fill={true} className="object-contain" />
        )}
      </div>
      <span className="text-xl font-bold font-heading tracking-tight">
        {logoText}
      </span>
    </Link>
  );
};
