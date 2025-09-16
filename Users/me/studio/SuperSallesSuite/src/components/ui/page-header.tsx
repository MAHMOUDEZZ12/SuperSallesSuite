
import React from 'react';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function PageHeader({ title, description, icon, children, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-start md:justify-between gap-4", className)}>
      <div className="flex items-start gap-4">
        {icon && (
            <div className="hidden md:flex p-3 bg-primary/10 text-primary rounded-lg w-fit shrink-0">
              {icon}
            </div>
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-heading">{title}</h1>
          <p className="text-muted-foreground max-w-2xl mt-1">
            {description}
          </p>
        </div>
      </div>
      {children && <div className="flex-shrink-0 mt-4 md:mt-0">{children}</div>}
    </div>
  );
}
