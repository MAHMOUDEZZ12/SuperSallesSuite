'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, X, Loader2, Play, CheckCircle, BrainCircuit, Sparkles, Video } from 'lucide-react';
import { Button } from './ui/button';
import { runFlow } from '@/lib/flows';
import { ExecutionStep, RollflowPlan, Project } from '@/types';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { track } from '@/lib/events';

// HARD FIX IMPLEMENTATION: The InteractiveListingBrief component is now defined locally
// within this file to eliminate the module resolution error during build.

/**
 * The "Future of the Listing." This is a micro-dashboard for a single property,
 * complete with generative actions that connect search to creation.
 */
function InteractiveListingBrief({ project }: { project: Project }) {
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const [videoUri, setVideoUri] = useState<string | null>(null);

    const handleGenerateVideo = async () => {
        if (!project.name || !project.area) {
            alert("Project details are insufficient to generate a video.");
            return;
        }
        setIsGeneratingVideo(true);
        try {
            const result = await runFlow('generate-aerial-view', { address: `${project.name}, ${project.area}` });
            if (result?.videoDataUri) {
                setVideoUri(result.videoDataUri);
            } else {
                 throw new Error("Video generation did not return a valid URI.");
            }
        } catch (error) {
            console.error("Failed to generate video", error);
        } finally {
            setIsGeneratingVideo(false);
        }
    };

    return (
        <Card className="overflow-hidden bg-muted/30 border border-border/50 mt-2">
            <div className="grid md:grid-cols-12 gap-0">
                <div className="md:col-span-4 relative h-48 md:h-full">
                    <Image
                        src={project.thumbnailUrl || '/placeholder-image.jpg'}
                        alt={`Image of ${project.name}`}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="md:col-span-8">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-bold font-heading text-white">{project.name}</h3>
                        <p className="text-sm text-primary font-semibold">{project.developer}</p>
                        <p className="text-sm text-muted-foreground mt-1">{project.area}, {project.city}</p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                           {project.status && <Badge variant="secondary">{project.status}</Badge> }
                           {project.unitTypes?.slice(0, 2).map(type => <Badge key={type} variant="outline">{type}</Badge>)}
                        </div>

                        <div className="border-t border-border/50 my-4"></div>

                        {videoUri ? (
                             <div className="space-y-2">
                                <p className="text-sm font-semibold">Instant Cinematic Tour:</p>
                                <div className="aspect-video bg-black rounded-lg">
                                    <video src={videoUri} controls autoPlay muted loop className="w-full h-full rounded-lg" />
                                </div>
                             </div>
                        ) : (
                             <Button onClick={handleGenerateVideo} disabled={isGeneratingVideo} className="w-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">
                                {isGeneratingVideo ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Tour...</>
                                ) : (
                                    <><Sparkles className="mr-2 h-4 w-4" /> Generate Instant Video Tour</>
                                )}
                             </Button>
                        )}
                    </CardContent>
                </div>
            </div>
        </Card>
    );
}


// A component to render the AI's execution plan
const PlanExecutionCard = ({ plan, onExecute }: { plan: RollflowPlan, onExecute: (plan: RollflowPlan)=>void }) => {
    const isExecutable = plan.steps.every(s => s.status === 'pending');
    return (
        <div className="bg-muted/50 p-4 rounded-lg border border-primary/20">
            <div className='flex items-center gap-3 mb-2'>
                <BrainCircuit className="h-5 w-5 text-primary"/>
                <h4 className="font-semibold text-foreground">Generated Plan: {plan.title}</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-3">The AI has analyzed your command and created the following multi-step workflow. Please review before execution.</p>
            <ul className="space-y-2">
                {plan.steps.map((step, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        {step.status === 'complete' ? <CheckCircle className="h-4 w-4 text-green-500 animate-pulse"/> : <div className="h-4 w-4 rounded-full border border-dashed flex-shrink-0"/>}
                        <span>{step.description}</span>
                        {step.status === 'running' && <Loader2 className="h-4 w-4 ml-auto animate-spin"/>}
                    </li>
                ))}
            </ul>
            {isExecutable && (
                <Button className="w-full mt-4" onClick={() => onExecute(plan)}>
                    <Play className="mr-2 h-4 w-4"/>
                    Execute Plan
                </Button>
            )}
        </div>
    )
}

interface Message {
  id: string;
  text?: string;
  sender: 'user' | 'ai';
  plan?: RollflowPlan;
  component?: 'listing_brief' | 'training_prompt_1';
  componentData?: any;
}

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;
    const userMessage: Message = { id: `user-${Date.now()}`, text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await runFlow('mainOrchestratorAgent', { command: input });
      const aiResponseMessage: Message = { id: `ai-${Date.now()}`, sender: 'ai', ...response };
      setMessages(prev => [...prev, aiResponseMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { id: `err-${Date.now()}`, text: "Sorry, I encountered an error.", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-background">
      <div ref={chatEndRef} className="flex-1 p-6 space-y-6 overflow-y-auto">
        {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
               {msg.sender === 'ai' && <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><Bot size={20} className="text-primary-foreground"/></div>}
               <div className={`max-w-xl w-full p-4 rounded-lg shadow-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {msg.text && <p className="text-sm mb-2">{msg.text}</p>}
                  {msg.plan && <PlanExecutionCard plan={msg.plan} onExecute={() => {}} />}
                  {msg.component === 'listing_brief' && <InteractiveListingBrief project={msg.componentData} />}
               </div>
               {msg.sender === 'user' && <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0"><User size={20}/></div>}
            </div>
        ))}
         {isLoading && <div className="flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>}
        <div className="h-1"/>
      </div>

      <div className="p-4 bg-background border-t">
        <div className="relative">
             <Textarea
                placeholder="Command your AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                className="w-full pr-14 text-base"
                rows={2}
            />
            <Button onClick={handleSendMessage} size="icon" className="absolute right-3 bottom-3 h-9 w-9" disabled={isLoading}>
                <Send size={18} />
            </Button>
        </div>
      </div>
    </div>
  );
}
