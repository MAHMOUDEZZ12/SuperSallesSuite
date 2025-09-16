
'use client';
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Feature } from '@/lib/features';
import { IconMap } from './icon-map';
import { useToast } from '@/hooks/use-toast';
import { track } from '@/lib/events';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './alert-dialog';

export const DashboardServiceCard = ({ tool }: { tool: Feature }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isActivationOpen, setIsActivationOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // In real app, this would come from user data
  const ToolIcon = IconMap[tool.icon] || IconMap['Sparkles'];

  const handleActivate = () => {
    track('app_activated', { toolId: tool.id });
    setIsAdded(true);
    setIsActivationOpen(false);
    toast({
      title: `${tool.dashboardTitle || tool.title} Activated!`,
      description: "The app has been added to your workspace.",
    });
    router.push(tool.href);
  };
  
  const handleCardClick = () => {
    if (isAdded) {
      router.push(tool.href);
    } else {
      setIsActivationOpen(true);
    }
  }

  return (
    <>
      <div onClick={handleCardClick} className="group cursor-pointer relative h-full">
         <Card className="bg-card/50 h-full flex flex-col transition-all duration-300 border-2 border-transparent group-hover:border-primary/50 group-hover:-translate-y-1">
            <CardHeader className="flex-row items-start gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <ToolIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{tool.dashboardTitle || tool.title}</CardTitle>
                <CardDescription className="text-xs">{tool.mindMapCategory}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </CardContent>
            <CardFooter>
                 <Button variant="secondary" className="w-full">
                    {isAdded ? 'Launch' : 'Add to Workspace'}
                 </Button>
            </CardFooter>
        </Card>
      </div>

      <AlertDialog open={isActivationOpen} onOpenChange={setIsActivationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add "{tool.dashboardTitle || tool.title}" to your workspace?</AlertDialogTitle>
            <AlertDialogDescription>
              This will enable the tool and any associated AI flows. You can manage all your added apps from the dashboard at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleActivate}>Add to Workspace</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
