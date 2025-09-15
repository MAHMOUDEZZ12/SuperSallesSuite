'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, X, Loader2, Play, CheckCircle, BrainCircuit } from 'lucide-react';
import { Button } from './ui/button';
import { runFlow } from '@/lib/flows';
import { ExecutionStep, RollflowPlan } from '@/types';
import { Textarea } from './ui/textarea';
import { InteractiveListingBrief } from '@/components/ui/interactive-listing-brief';
import { track } from '@/lib/events';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text?: string;
  sender: 'user' | 'ai';
  plan?: RollflowPlan;
  component?: 'listing_brief' | 'persona_select' | 'name_input' | 'code_input';
  componentData?: any;
}

const initialMessages: Message[] = [
    {
      id: `msg-init-1`,
      sender: 'ai',
      text: "Welcome to WhatsMAP. I'm the AI brain of your new real estate OS. To give you the best experience, I need to know a little about you. It's my first time meeting you, so let's get your workspace adapted for your needs.",
    },
    {
      id: `msg-init-2`,
      sender: 'ai',
      component: 'persona_select'
    }
];

const PlanExecutionCard = ({ plan, onExecute }: { plan: RollflowPlan; onExecute: (plan: RollflowPlan) => void }) => {
    const [isExecuting, setIsExecuting] = useState(false);

    const handleExecute = () => {
        setIsExecuting(true);
        onExecute(plan);
    };

    const isCompleted = plan.steps.every(s => s.status === 'complete');
    const isExecutable = !isExecuting && !isCompleted && plan.steps.every(s => s.status === 'pending');

    return (
        <div className="bg-muted/50 p-4 rounded-lg border border-primary/20">
            <div className='flex items-center gap-3 mb-2'>
                <BrainCircuit className="h-5 w-5 text-primary"/>
                <h4 className="font-semibold text-foreground">Generated Plan: {plan.title}</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-3">The AI has created a multi-step workflow. Please review before execution.</p>
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
                <Button className="w-full mt-4" onClick={handleExecute}>
                    <Play className="mr-2 h-4 w-4"/>
                    Execute Plan
                </Button>
            )}
             {isCompleted && (
                 <div className="text-center mt-3 text-xs text-green-500 font-semibold flex items-center justify-center gap-2"><CheckCircle className="h-4 w-4"/>Execution Complete</div>
            )}
        </div>
    );
};

export function AssistantChat() {
  const [isOpen, setIsOpen] = useState(true); // Default to open in the main view
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [onboardingState, setOnboardingState] = useState({ step: 'none' });


  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { id: `msg-user-${Date.now()}`, text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const command = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await runFlow('mainOrchestratorAgent', { command });
      
      const aiResponseMessage: Message = { id: `msg-ai-${Date.now()}`, sender: 'ai' };
      if (response.plan) {
         aiResponseMessage.plan = response.plan;
         aiResponseMessage.text = "I've analyzed your request and generated the following execution plan.";
      } else if (response.component) {
          aiResponseMessage.component = response.component;
          aiResponseMessage.componentData = response.componentData;
          aiResponseMessage.text = response.text;
      } else {
         aiResponseMessage.text = response.text || "I was unable to process that command.";
      }
      setMessages(prev => [...prev, aiResponseMessage]);

    } catch (error) {
      const errorMessage: Message = { id: `msg-err-${Date.now()}`, text: "Sorry, I encountered a critical error orchestrating that request.", sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecutePlan = useCallback(async (plan: RollflowPlan) => {
     let currentPlanId = plan.id;
     for (let i = 0; i < plan.steps.length; i++) {
        setMessages(prev => prev.map(msg => {
            if (msg.plan?.id === currentPlanId) {
                const newSteps = [...msg.plan.steps];
                newSteps[i].status = "running";
                return { ...msg, plan: { ...msg.plan, steps: newSteps }};
            }
            return msg;
        }));
        await new Promise(resolve => setTimeout(resolve, 1500));
        setMessages(prev => prev.map(msg => {
            if (msg.plan?.id === currentPlanId) {
                const newSteps = [...msg.plan.steps];
                newSteps[i].status = "complete";
                if (newSteps[i+1]) newSteps[i+1].status = "running";
                return { ...msg, plan: { ...msg.plan, steps: newSteps }};
            }
            return msg;
        }));
     }
     const finalMessage: Message = { id: `msg-fin-${Date.now()}`, sender: 'ai', text: `Execution of plan '${plan.title}' is complete.`};
     setMessages(prev => [...prev, finalMessage]);
  }, []);

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
                  {msg.plan && <PlanExecutionCard plan={msg.plan} onExecute={handleExecutePlan} />}
                  
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
                placeholder="Command your AI... (e.g. Find me off-plan villas in Dubai Hills with a strong ROI potential)"
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
        
    