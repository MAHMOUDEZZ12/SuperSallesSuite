
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Circle, CheckCircle, Play, Building, Upload, Bot, Download, Server } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

type Status = 'pending' | 'running' | 'completed' | 'error';

interface Step {
  id: string;
  title: string;
  description: string;
  status: Status;
}

const generateStepsFromPayload = (payload: any): Step[] => {
    if (!payload || !payload.listingReferenceNo) return [];
    return [
      { id: 'validate', title: 'Validate Bayut Plan', description: `Validating plan for listing: ${payload.listingReferenceNo}`, status: 'pending' },
      { id: 'connect', title: 'Connect to Bayut API', description: 'Establishing secure connection...', status: 'pending' },
      { id: 'push', title: 'Push Listing Data', description: `Sending ${payload.imageUrls?.length || 0} images and details.`, status: 'pending' },
      { id: 'confirm', title: 'Confirm Synchronization', description: 'Waiting for confirmation from Bayut servers.', status: 'pending' },
    ]
}

export default function BayutSyncPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [workflow, setWorkflow] = useState<Step[]>([]);
  const [pastedPlan, setPastedPlan] = useState('');
  const [pullId, setPullId] = useState('');
  const [pulledData, setPulledData] = useState<any>(null);


  const handleExecute = async () => {
    let parsedPlan;
    try {
      parsedPlan = JSON.parse(pastedPlan);
    } catch (e) {
      toast({ title: 'Invalid Plan', description: 'The pasted text is not a valid JSON listing plan.', variant: 'destructive' });
      return;
    }

    const steps = generateStepsFromPayload(parsedPlan);
    if (steps.length === 0) {
      toast({ title: 'Invalid Plan', description: 'The plan appears to be missing key information.', variant: 'destructive' });
      return;
    }

    setWorkflow(steps);
    setIsExecuting(true);

    const runStep = async (index: number) => {
      if (index >= steps.length) {
        // Final API call
        try {
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toolId: 'bayut-sync', payload: parsedPlan }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            
            if (result.success) {
                toast({ title: 'Synchronization Complete!', description: result.message });
            } else {
                throw new Error(result.message);
            }
        } catch (err: any) {
             toast({ title: 'Sync Failed', description: err.message, variant: 'destructive' });
        } finally {
            setIsExecuting(false);
        }
        return;
      }
      
      setWorkflow(prev => prev.map((step, i) => i === index ? { ...step, status: 'running' } : step));
      setTimeout(() => {
        setWorkflow(prev => prev.map((step, i) => i === index ? { ...step, status: 'completed' } : step));
        runStep(index + 1);
      }, 800);
    };

    runStep(0);
  };
  
  const handlePull = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pullId) return;
    setIsLoading(true);
    setPulledData(null);
    setTimeout(() => {
        setPulledData({
            listingReferenceNo: pullId,
            propertyTitle: "Luxury 2BR with Full Marina View",
            propertyDescription: "A stunning, fully furnished 2-bedroom apartment in the heart of Dubai Marina, offering breathtaking views and world-class amenities.",
            price: 3500000,
            imageUrls: ["https://picsum.photos/400/300?random=1", "https://picsum.photos/400/300?random=2"],
        });
        setIsLoading(false);
        toast({title: "Listing Pulled!", description: `Successfully fetched data for listing ${pullId} from Bayut.`});
    }, 1500);
  }

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'running': return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Circle className="h-5 w-5 text-muted-foreground/50" />;
    }
  };

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Bayut Listing Pilot"
        description="The dedicated execution terminal for syncing your listings with Bayut."
        icon={<Building className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        <Card>
            <CardHeader>
                <CardTitle>Push to Bayut</CardTitle>
                <CardDescription>
                    Generate a listing plan from the <Link href="/dashboard/tool/listing-manager" className="underline font-semibold">Listing Manager</Link>, paste it here, and the pilot will push it to Bayut.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Textarea
                    placeholder='Paste your Bayut "Rollflow" JSON plan here...'
                    value={pastedPlan}
                    onChange={(e) => setPastedPlan(e.target.value)}
                    rows={8}
                    className="font-mono text-xs"
                    disabled={isExecuting}
                 />

                {workflow.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                        <h4 className="font-semibold mb-3">Execution Progress:</h4>
                        <div className="space-y-4">
                            {workflow.map((step) => (
                                <div key={step.id} className="flex items-start gap-4">
                                    <div>{getStatusIcon(step.status)}</div>
                                    <div className="flex-1">
                                        <p className={cn("font-medium", step.status !== 'pending' && "text-foreground")}>{step.title}</p>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                 <Button onClick={handleExecute} disabled={isExecuting || !pastedPlan} className="w-full">
                    {isExecuting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    {isExecuting ? 'Executing Sync...' : 'Execute Sync'}
                </Button>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Pull from Bayut</CardTitle>
                <CardDescription>
                    Fetch an existing listing from Bayut to analyze its quality or send it to the Listing Manager for refinement.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handlePull}>
                <CardContent>
                    <Label htmlFor="pullId">Bayut Listing Reference No.</Label>
                    <div className="flex gap-2">
                        <Input id="pullId" value={pullId} onChange={e => setPullId(e.target.value)} placeholder="e.g., bayut-123456" />
                        <Button type="submit" disabled={isLoading || !pullId}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Download className="mr-2 h-4 w-4" />}
                            Pull Listing
                        </Button>
                    </div>
                </CardContent>
            </form>
            {pulledData && (
                 <CardContent className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                       <h4 className="font-semibold">{pulledData.propertyTitle}</h4>
                       <Badge>Listing Quality: 88/100</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{pulledData.propertyDescription}</p>
                    <div className="mt-4">
                        <Link href="/dashboard/tool/listing-manager">
                            <Button variant="outline">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Send to Manager to Refine
                            </Button>
                        </Link>
                    </div>
                 </CardContent>
            )}
        </Card>
      </div>
    </main>
  );
}
