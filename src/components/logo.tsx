
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Pyramid } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("flex items-center gap-3 group", className)}>
     <div className="p-2 bg-primary text-primary-foreground rounded-lg">
        <Pyramid className="h-6 w-6" />
    </div>
    <span className="text-xl font-bold font-heading text-primary">
      selltoday.ai
    </span>
  </Link>
);
