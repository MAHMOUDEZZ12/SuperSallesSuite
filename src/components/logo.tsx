
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({ className }: { className?: string }) => {
  const logoText = 'WhatsMAP';
  const logoSrc = 'https://firebasestorage.googleapis.com/v0/b/supersellerae-4rzzy.firebasestorage.app/o/WhatsMAP%20logo.png?alt=media&token=b8538a4a-677c-40d5-a35c-4eac20828352';

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
