
'use client';

import { Button } from './button';
import { cn } from '@/lib/utils';
import { Checkbox } from './checkbox';
import Image from 'next/image';
import { PlusCircle } from 'lucide-react';

export function ProjectCard({
  project, selectable=false, selected=false, onToggle, actions, isAdded, onAdd,
}: {
  project: {
    id: string;
    badge?: string; name: string; developer: string; area: string;
    priceFrom?: string | number; unitTypes?: string[]; handover?: string; thumbnailUrl?: string;
    developerLogoUrl?: string;
  };
  selectable?: boolean; selected?: boolean;
  onToggle?: () => void; actions?: React.ReactNode;
  isAdded?: boolean;
  onAdd?: () => void;
}) {

  const effectiveActions = actions ?? (onAdd && (
    <Button size="sm" onClick={onAdd} disabled={isAdded}>
        <PlusCircle className="mr-2 h-4 w-4" />
        {isAdded ? 'Added' : 'Add to Library'}
    </Button>
  ));

  const CardBody = (
     <div className={cn(
        "rounded-lg border bg-gray-900/50 border-gray-700/50 text-gray-200 overflow-hidden h-full flex flex-col justify-between hover:border-primary/50 transition-all duration-300",
        selected && "border-primary ring-2 ring-primary/50"
      )}>
      <div>
        <div className="relative h-40 w-full bg-gray-800">
           <Image src={`https://picsum.photos/seed/${project.id}/400/200`} alt={project.name} fill={true} objectFit="cover" data-ai-hint="building exterior" />
            {project.badge && <span className="absolute top-2 left-2 text-xs rounded-full border border-gray-600 px-2 py-0.5 bg-gray-900/70 backdrop-blur-sm text-gray-200">{project.badge}</span>}
            {selectable && <div className="absolute top-2 right-2"><Checkbox checked={selected} readOnly aria-label={`Select project ${project.name}`} /></div>}
             {project.developerLogoUrl && <Image src={project.developerLogoUrl} alt={`${project.developer} Logo`} width={32} height={32} className="absolute bottom-2 right-2 rounded-md bg-white/80 p-1" data-ai-hint="company logo" />}
        </div>
        <div className="p-4">
            <h4 className="font-semibold truncate text-gray-50">{project.name}</h4>
            <p className="text-sm text-gray-400">{project.developer} • {project.area}</p>
            {project.priceFrom && <p className="mt-1 text-sm font-bold text-primary">{project.priceFrom}</p>}
        </div>
      </div>
      {effectiveActions && <div className="px-4 pb-4 mt-auto flex gap-2">{effectiveActions}</div>}
    </div>
  );

  if (selectable) {
    return <button onClick={onToggle} className="w-full text-left">{CardBody}</button>;
  }

  return CardBody;
}

    