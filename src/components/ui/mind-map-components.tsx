
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { type Feature } from '@/lib/features';
import { IconMap } from '@/components/ui/icon-map';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const MindMapNode = ({
  title,
  children,
  className,
  isRoot = false,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
  isRoot?: boolean;
}) => {
  return (
    <div className={cn("relative flex flex-col items-center w-full", className)}>
      <div
        className={cn(
          "relative rounded-xl border-2 p-4 text-center shadow-lg flex flex-col items-center justify-center z-10 w-full",
          isRoot
            ? "border-primary bg-primary/10 min-h-24"
            : "border-border bg-card/80 backdrop-blur-sm min-h-20"
        )}
      >
        <h3 className={cn(isRoot ? 'text-primary text-2xl font-bold' : 'text-foreground font-semibold text-lg')}>{title}</h3>
      </div>
      {children && (
        <div className="relative pt-8 w-full flex flex-col items-center">
           <div className="relative z-10 flex flex-col items-center gap-4 w-full">
            {children}
           </div>
        </div>
      )}
    </div>
  );
};

export const ToolLeaf = ({ tool, onClick, className }: { tool: Omit<Feature, 'renderResult'>; onClick: (tool: Omit<Feature, 'renderResult'>) => void; className?: string }) => {
    const Icon = IconMap[tool.icon as keyof typeof IconMap] || Sparkles;
    return (
    <div className={cn("group w-full max-w-xs flex justify-center", className)}>
        <button onClick={() => onClick(tool)} className="w-full text-left h-full">
            <div className={cn("relative flex items-center justify-center h-full", tool.id === 'ai-assistant' ? 'min-h-[16rem]' : 'h-12')}>
                <div className="flex w-full h-full flex-col justify-center rounded-lg border bg-card/90 p-3 pr-4 shadow-md transition-all duration-200 hover:border-primary/50 hover:shadow-primary/10 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md text-white" style={{backgroundColor: tool.color}}><Icon className='h-5 w-5' /></div>
                        <span className="font-medium text-sm text-foreground/90">{tool.title}</span>
                        {tool.badge && (
                           <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span
                                  className={cn(
                                    'ml-auto px-1.5 py-0.5 text-xs font-semibold text-white rounded-full',
                                    tool.badge === 'NEW' ? 'bg-blue-500' : tool.badge === 'Pilot*' ? 'bg-amber-400' : 'bg-yellow-500'
                                  )}
                                >
                                  {tool.badge}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                 <p>{tool.badge === 'NEW' ? 'This is a brand new feature!' : tool.badge === 'Pilot*' ? 'This is an automated workflow pilot.' : 'This feature is in active development.'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 ml-auto" />
                    </div>
                </div>
            </div>
        </button>
    </div>
)};
