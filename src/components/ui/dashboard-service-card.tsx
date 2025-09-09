
'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Plus, Check, Loader2, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { track } from '@/lib/events';
import { Feature } from '@/lib/tools-client';


interface DashboardServiceCardProps {
  tool: Feature;
  isAdded: boolean;
  setIsAdded: (isAdded: boolean) => void;
  connectionRequired?: string; // e.g., "Facebook"
  paymentRequired?: boolean;
}

export function DashboardServiceCard({
  tool,
  isAdded,
  setIsAdded,
  connectionRequired,
  paymentRequired,
}: DashboardServiceCardProps) {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  
  const { title, description, icon: Icon, href, guideHref, color, dashboardTitle } = tool;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdded(true);
    track('app_added', { toolId: tool.id, connectionType: 'direct' });
    toast({ title: `${title} Added!`, description: 'The tool is now available in your workspace.' });
  }

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setTimeout(() => {
        setIsConnecting(false);
        setIsAdded(true);
        track('app_added', { toolId: tool.id, connectionType: 'api' });
        toast({
            title: `${title} Activated!`,
            description: `You have connected your ${connectionRequired} account.`
        });
    }, 1500);
  }

  const handlePayment = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setTimeout(() => {
        setIsConnecting(false);
        setIsAdded(true);
        track('app_added', { toolId: tool.id, connectionType: 'payment' });
        toast({
            title: `${title} Unlocked!`,
            description: `You can now use this premium tool.`
        });
    }, 1500);
  }

  
  const AddButtonContent = () => (
    <>
        <Plus className="mr-2 h-4 w-4" />
        Add
    </>
  );

  const MainAction = () => {
    if (isAdded) {
        const destination = href;
        return (
             <Link href={destination} onClick={() => track('app_opened', { toolId: tool.id })}>
                <Button size="sm">
                    Open
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        )
    }

    let dialogContent;
    let actionHandler = handleAdd;
    let actionText = "Add to Workspace";
    let titleText = `Add "${title}" to Your Workspace?`;

    if (connectionRequired) {
        titleText = `Connect to ${connectionRequired}?`;
        dialogContent = `To use the ${title} tool, you need to securely connect your ${connectionRequired} account. This allows the application to act on your behalf.`;
        actionText = `Connect to ${connectionRequired}`;
        actionHandler = handleConnect;
    } else if (paymentRequired) {
        titleText = `Unlock "${title}"?`;
        dialogContent = (
            <div>
                <p>The "{title}" tool is a premium feature. To activate it, please confirm your subscription or add a payment method.</p>
                {guideHref && (
                    <p className="mt-2 text-sm text-muted-foreground">
                        Read the <Link href={guideHref} className="underline hover:text-primary">Handbook guide</Link> to learn more.
                    </p>
                )}
            </div>
        );
        actionText = "Confirm & Unlock";
        actionHandler = handlePayment;
    } else {
        dialogContent = (
             <div>
                <p>You are about to add the "{title}" tool to your personal workspace. This will make it available on your main dashboard.</p>
                {guideHref && (
                    <p className="mt-2 text-sm text-muted-foreground">
                        Read the <Link href={guideHref} className="underline hover:text-primary">Handbook guide</Link> to learn more.
                    </p>
                )}
            </div>
        );
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline"><AddButtonContent /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>{titleText}</AlertDialogTitle>
                <AlertDialogDescription asChild>
                    <div>{dialogContent}</div>
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={actionHandler} disabled={isConnecting}>
                    {isConnecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                    {actionText}
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
  }

  return (
    <Card className={cn("group flex h-full flex-col transition-all duration-300", isAdded && "border-primary/30 bg-card")}>
      <CardHeader>
        <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                 <div
                    className="rounded-lg p-3 text-white"
                    style={{ backgroundColor: color || 'hsl(var(--primary))' }}
                >
                    <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-heading">{dashboardTitle || title}</CardTitle>
            </div>
            {isAdded && <Check className="h-5 w-5 text-green-500" />}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex justify-end gap-2">
        {guideHref && (
          <Link href={guideHref} target="_blank">
            <Button variant="ghost" size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              Guide
            </Button>
          </Link>
        )}
        <MainAction />
      </CardFooter>
    </Card>
  );
}
