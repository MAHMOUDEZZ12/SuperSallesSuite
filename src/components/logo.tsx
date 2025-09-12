
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({
  className,
  host,
}: {
  className?: string;
  host?: string;
}) => {
  const isSelltoday = host?.includes('selltoday.ai');
  const logoSrc = 'https://firebasestorage.googleapis.com/v0/b/supersellerae-4rzzy.firebasestorage.app/o/white%20logo%20of%20whatsmapp.png?alt=media&token=5218d2c8-7f98-4665-90d9-79653d11ecc7';
  const brandName = isSelltoday ? 'selltoday.ai' : 'WhatsMAP';

  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <div className="relative h-8 w-8">
        <Image
          src={logoSrc}
          alt="WhatsMAP Logo"
          fill={true}
          className="object-contain"
        />
      </div>
      <span className="font-bold text-lg">{brandName}</span>
    </Link>
  );
};
