
'use client';

import { Button } from './button';
import { cn } from '@/lib/utils';
import { Checkbox } from './checkbox';
import Image from 'next/image';

export function ProjectCard({
  project, selectable=false, selected=false, onToggle, actions
}: {
  project: {
    id: string;
    badge?: string; name: string; developer: string; area: string;
    priceFrom?: string | number; unitTypes?: string[]; handover?: string; thumbnailUrl?: string;
    developerLogoUrl?: string;
  };
  selectable?: boolean; selected?: boolean;
  onToggle?: () => void; actions?: React.ReactNode;
}) {
  const CardBody = (
     <div className={cn(
        "rounded-lg border bg-card text-card-foreground overflow-hidden h-full flex flex-col justify-between hover:border-primary/50 transition-all duration-300",
        selected && "border-primary ring-2 ring-primary/50"
      )}>
      <div>
        <div className="relative h-40 w-full bg-muted">
           <Image src={`https://picsum.photos/seed/${project.id}/400/200`} alt={project.name} layout="fill" objectFit="cover" data-ai-hint="building exterior" />
            {project.badge && <span className="absolute top-2 left-2 text-xs rounded-full border px-2 py-0.5 bg-background/70 backdrop-blur-sm text-foreground">{project.badge}</span>}
            {selectable && <div className="absolute top-2 right-2"><Checkbox checked={selected} readOnly aria-label={`Select project ${project.name}`} /></div>}
             {project.developerLogoUrl && <Image src={project.developerLogoUrl} alt={`${project.developer} Logo`} width={32} height={32} className="absolute bottom-2 right-2 rounded-md bg-white/80 p-1" data-ai-hint="company logo" />}
        </div>
        <div className="p-4">
            <h4 className="font-semibold truncate">{project.name}</h4>
            <p className="text-sm text-muted-foreground">{project.developer} • {project.area}</p>
            {project.priceFrom && <p className="mt-1 text-sm font-bold text-primary">{project.priceFrom}</p>}
        </div>
      </div>
      {actions && <div className="px-4 pb-4 mt-auto flex gap-2">{actions}</div>}
    </div>
  );

  if (selectable) {
    return <button onClick={onToggle} className="w-full text-left">{CardBody}</button>;
  }

  return CardBody;
}
