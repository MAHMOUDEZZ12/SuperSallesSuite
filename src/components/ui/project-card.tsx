
'use client';

import { Button } from './button';
import { cn } from '@/lib/utils';
import { Checkbox } from './checkbox';
import Image from 'next/image';
import { PlusCircle } from 'lucide-react';
import { Badge } from './badge';

export function ProjectCard({
  project, selectable=false, selected=false, onToggle, actions, isAdded, onAdd,
}: {
  project: {
    id: string;
    badge?: string; name: string; developer: string; area: string;
    priceFrom?: string | number; unitTypes?: string[]; handover?: string; thumbnailUrl?: string;
    developerLogoUrl?: string; status?: string;
  };
  selectable?: boolean; selected?: boolean;
  onToggle?: () => void; actions?: React.ReactNode;
  isAdded?: boolean; onAdd?: () => void;
}) {

  const effectiveActions = actions ?? (onAdd && (
    <Button size="sm" onClick={onAdd} disabled={isAdded}>
        <PlusCircle className="mr-2 h-4 w-4" />
        {isAdded ? 'Added' : 'Add to Library'}
    </Button>
  ));

  const CardBody = (
     <div className={cn(
        "rounded-lg border bg-gray-900/50 border-gray-700/50 text-gray-300 overflow-hidden h-full flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group",
        selected && "border-primary ring-2 ring-primary/50"
      )}>
      <div>
        <div className="relative h-40 w-full bg-gray-800">
           <Image src={project.thumbnailUrl || `https://picsum.photos/seed/${'\'\'\'' + project.id + '\'\'\''}/400/200`} alt={project.name} fill={true} className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint="building exterior" />
            {project.status && <Badge variant="secondary" className="absolute top-2 left-2">{project.status}</Badge>}
            {selectable && <div className="absolute top-2 right-2 z-10"><Checkbox checked={selected} readOnly aria-label={`Select project ${'\'\'\'' + project.name + '\'\'\''}`} /></div>}
             {project.developerLogoUrl && <Image src={project.developerLogoUrl} alt={`${'\'\'\'' + project.developer + '\'\'\''}' Logo`} width={32} height={32} className="absolute bottom-2 right-2 rounded-md bg-white p-1" data-ai-hint="company logo" />}
        </div>
        <div className="p-4">
            <h4 className="font-semibold text-base text-gray-50 truncate group-hover:text-primary transition-colors">{project.name}</h4>
            <p className="text-sm text-gray-400">{project.developer} • {project.area}</p>
            {project.priceFrom && <p className="mt-2 text-sm font-bold text-gray-200">From {project.priceFrom}</p>}
            <div className="text-xs text-gray-400 mt-2 space-y-1">
              {project.unitTypes && <p>Units: {project.unitTypes.join(', ')}</p>}
              {project.handover && <p>Handover: {project.handover}</p>}
            </div>
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

    