'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Star, CheckCircle, Circle, Play, GanttChartSquare, Upload, Bot, MessageCircle, Link as LinkIcon, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

type Status = 'pending' | 'running' | 'completed' | 'error';

interface Step {
  id: string;
  title: string;
  description: string;
  status: Status;
}

const generateStepsFromPayload = (payload: any): Step[] => {
    if (!payload || !payload.campaignName) return [];
    return [
      { id: 'audience', title: 'Verify Audience & Targeting', description: `Using audience: "${payload.inferredAudience}"`, status: 'pending' },
      { id: 'creative', title: 'Prepare Ad Creatives', description: `Preparing ${payload.adCreatives?.length || 0} creative(s) for ${payload.adSets?.length || 0} ad set(s).`, status: 'pending' },
      { id: 'publish', title: 'Publish Campaign to Meta', description: `Sending campaign with ${payload.campaignObjective} objective.`, status: 'pending' },
      { id: 'monitor', title: 'Launch & Monitor', description: 'Pilot is now monitoring performance.', status: 'pending' },
    ]
}


export default function MetaAutoPilotPage() {
  const { toast } = useToast();
  const [isAutomating, setIsAutomating] = useState(false);
  const [workflow, setWorkflow] = useState<Step[]>([]);
  const [pastedPayload, setPastedPayload] = useState('');


  useEffect(() => {
    try {
        const payload = localStorage.getItem('autopilot_payload');
        if (payload) {
            setPastedPayload(payload);
            localStorage.removeItem('autopilot_payload'); // Clear it after use
            toast({title: "Campaign Plan Loaded!", description: "The plan from the builder has been loaded. Ready to run."});
        }
    } catch(e) {
        console.error("Could not load autopilot payload from localStorage", e);
    }
  }, [toast]);


  const handleStartAutomation = () => {
    let parsedPayload;
    try {
        parsedPayload = JSON.parse(pastedPayload);
    } catch(e) {
        toast({ title: 'Invalid Input', description: 'The pasted text is not a valid campaign plan. Please generate it from the Campaign Builder.', variant: 'destructive'});
        return;
    }
    
    const steps = generateStepsFromPayload(parsedPayload);
    if (steps.length === 0) {
        toast({ title: 'Invalid Plan', description: 'The campaign plan seems to be missing key information.', variant: 'destructive'});
        return;
    }

    setWorkflow(steps);
    setIsAutomating(true);

    const runStep = (index: number) => {
      if (index >= steps.length) {
        setIsAutomating(false);
        toast({ title: 'Automation Complete!', description: `The '${parsedPayload.campaignName}' campaign is now live.` });
        return;
      }
      
      setWorkflow(prev => prev.map((step, i) => i === index ? { ...step, status: 'running' } : step));

      setTimeout(() => {
        setWorkflow(prev => prev.map((step, i) => i === index ? { ...step, status: 'completed' } : step));
        runStep(index + 1);
      }, 1500 + Math.random() * 1000);
    };

    runStep(0);
  };
  
  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'running': return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Circle className="h-5 w-5 text-muted-foreground/50" />;
    }
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Meta Auto Pilot"
        description="The execution terminal for your Meta Ads. Paste a plan from the Campaign Builder and the pilot will launch it."
        icon={<Star className="h-8 w-8" />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
            <CardHeader>
                <CardTitle>Launch Campaign</CardTitle>
                <CardDescription>Paste your generated campaign plan and the pilot will handle the rest.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-4 border rounded-lg space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm">1. Campaign Plan</h4>
                        <Textarea 
                           placeholder="Paste your 'Roll-In' campaign plan from the Campaign Builder here..."
                           value={pastedPayload}
                           onChange={(e) => setPastedPayload(e.target.value)}
                           rows={6}
                           disabled={isAutomating}
                           className="font-mono text-xs"
                        />
                    </div>
                    <Button onClick={handleStartAutomation} disabled={isAutomating || !pastedPayload} className="w-full md:w-auto">
                        {isAutomating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Play className="mr-2 h-4 w-4"/>}
                        {isAutomating ? 'Running Workflow...' : 'Run Workflow'}
                    </Button>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Execution Progress</CardTitle>
                <CardDescription>Follow the pilot as it launches your campaign on Meta.</CardDescription>
            </CardHeader>
            <CardContent>
                 {workflow.length > 0 ? (
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
                ) : (
                    <div className="flex items-center justify-center h-48 border-dashed border-2 rounded-lg text-center p-6 text-muted-foreground">
                        <p>Waiting for a campaign plan...</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
