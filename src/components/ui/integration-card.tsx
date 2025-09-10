
'use client';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { Badge } from './badge';

interface IntegrationCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    connected: boolean;
    onConnect: () => void;
    onDisconnect: () => void;
}

export function IntegrationCard({ title, description, icon, connected, onConnect, onDisconnect }: IntegrationCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border bg-card text-card-foreground">
        <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit shrink-0">
                {icon}
            </div>
            <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{title}</h3>
                    {connected && <Badge variant="default">Connected</Badge>}
                </div>
                <p className="text-sm text-muted-foreground max-w-lg">{description}</p>
            </div>
        </div>
        <Button onClick={connected ? onDisconnect : onConnect} variant="outline" className="w-full sm:w-auto flex-shrink-0">
            {connected ? 'Disconnect' : 'Connect'}
        </Button>
    </div>
  );
}

    