'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, X, Loader2, Play, CheckCircle, BrainCircuit } from 'lucide-react';
import { Button } from './ui/button';
import { runFlow } from '@/lib/flows';
import { ExecutionStep, RollflowPlan } from '@/types';
import { Textarea } from './ui/textarea';
import { InteractiveListingBrief } from '@/components/interactive-listing-brief';
import { track } from '@/lib/events';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text?: string;
  sender: 'user' | 'ai';
  plan?: RollflowPlan;
  component?: 'listing_brief' | 'financial_summary_form' | 'training_prompt_1';
  componentData?: any;
}

const PlanExecutionCard = ({ plan }: { plan: RollflowPlan }) => {
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
                        <CheckCircle className="h-4 w-4 text-green-500"/>
                        <span>{step.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export function AssistantChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const chatEndRef = useRef<HTMLDivElement>(null);

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
                aiResponseMessage.text = "I've analyzed your request and generated the following execution plan. It has been saved to your Flows.";
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
    
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-24 right-6 w-[400px] h-[600px] bg-background border rounded-xl shadow-2xl flex flex-col z-50"
                >
                    <div className="p-4 border-b flex justify-between items-center">
                        <h3 className="font-semibold flex items-center gap-2"><Bot className="text-primary"/> AI Assistant</h3>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X className="h-4 w-4"/></Button>
                    </div>
                    <div ref={chatEndRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                               {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><Bot size={18} className="text-primary-foreground"/></div>}
                               <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                  {msg.text && <p className="text-sm mb-2">{msg.text}</p>}
                                  {msg.plan && <PlanExecutionCard plan={msg.plan} />}
                                  {msg.component === 'listing_brief' && <InteractiveListingBrief project={msg.componentData} />}
                               </div>
                               {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0"><User size={18}/></div>}
                            </div>
                        ))}
                        {isLoading && <div className="flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>}
                    </div>
                    <div className="p-4 border-t">
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
                </motion.div>
            )}
        </AnimatePresence>
    );
}