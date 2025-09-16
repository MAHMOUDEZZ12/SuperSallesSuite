
'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, X, Loader2, Play, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { runFlow } from '@/lib/flows';
import { ExecutionStep, RollflowPlan, Project } from '@/types';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { track } from '@/lib/events';
import { InteractiveListingBrief } from './ui/interactive-listing-brief';
import Link from 'next/link';

interface Message {
  id: string;
  text?: string;
  sender: 'user' | 'ai';
  plan?: RollflowPlan;
  component?: 'persona_select' | 'name_input' | 'final_upsell';
  componentData?: any;
}

const PlanExecutionCard = ({ plan }: { plan: RollflowPlan }) => (
    <div className="bg-muted/50 p-4 rounded-lg border border-primary/20">
        <h4 className="font-semibold text-foreground mb-2">Generated Plan: {plan.title}</h4>
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

export function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On first load, check if user is new.
    const userTrained = localStorage.getItem('whatsmap_user_trained');
    if (!userTrained) {
      setIsNewUser(true);
      setIsOpen(true); // Automatically open chat for new users
      setMessages([
        { id: `msg-welcome-${Date.now()}`, sender: 'ai', text: "Welcome to WhatsMAP. I'm your AI co-pilot. To give you the best experience, I need to understand your business. Let's start with a quick question:"},
        { id: `msg-persona-${Date.now()}`, sender: 'ai', component: 'persona_select' }
      ]);
    }
  }, []);

  const handleOnboardingSelect = useCallback(async (persona: string) => {
    setIsLoading(true);
    const userMessage: Message = { id: `msg-user-persona-${Date.now()}`, text: `I'm a ${persona}.`, sender: 'user' };
    const loadingMessage: Message = { id: `msg-loading-${Date.now()}`, sender: 'ai', text: "Perfect. I'm reconfiguring your workspace and personalizing your available tools..." };
    setMessages(prev => [...prev.filter(m => m.component !== 'persona_select'), userMessage, loadingMessage]);

    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate backend processing

    const finalMessage: Message = {
        id: `msg-upsell-${Date.now()}`,
        sender: 'ai',
        component: 'final_upsell',
        text: `Your workspace is now tailored for a real estate ${persona}. I've unlocked the relevant apps for you.\n\nMy final training step is to connect this intelligence to your website.`
    };
    setMessages(prev => [...prev.slice(0, -1), finalMessage]);
    localStorage.setItem('whatsmap_user_trained', 'true');
    setIsNewUser(false);
    setIsLoading(false);
    track('onboarding_persona_selected', { persona });
  }, [messages]);
  
  const handleSendMessage = async () => { /* Standard chat logic */ };

  return (
    <>
      {!isOpen && <Button size="icon" className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg" onClick={() => setIsOpen(true)}><Sparkles /></Button>}
      <AnimatePresence>
        {isOpen && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 right-6 w-[400px] h-[calc(100vh-6rem)] max-h-[700px] bg-background border rounded-xl shadow-2xl flex flex-col z-50">
              <div className="p-4 border-b flex justify-between items-center"><h3 className="font-semibold flex items-center gap-2"><Bot className="text-primary"/> AI Assistant</h3><Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X className="h-4 w-4"/></Button></div>
              <div ref={chatEndRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                      {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><Bot size={18} className="text-primary-foreground"/></div>}
                      <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          {msg.text && <p className="text-sm">{msg.text}</p>}
                          {msg.component === 'persona_select' && (
                            <div className='space-y-2 mt-2'>
                                <p className='text-sm font-semibold mb-3'>Which best describes you?</p>
                                <Button className='w-full justify-start' variant='outline' onClick={() => handleOnboardingSelect('Broker')}>Real Estate Agent / Broker</Button>
                                <Button className='w-full justify-start' variant='outline' onClick={() => handleOnboardingSelect('Investor')}>Investor</Button>
                                <Button className='w-full justify-start' variant='outline' onClick={() => handleOnboardingSelect('Developer')}>Developer</Button>
                            </div>
                          )}
                          {msg.component === 'final_upsell' && (
                             <div className='space-y-3 mt-2'>
                                 <p className="text-sm font-semibold">Ready to deploy your AI to your website?</p>
                                 <Button className="w-full" asChild>
                                     <Link href="/dashboard/tool/chatbot-creator">Yes, Get My Embed Code</Link>
                                 </Button>
                                 <Button className="w-full" variant="ghost" onClick={() => setIsOpen(false)}>I'll do this later</Button>
                             </div>
                          )}
                          {msg.plan && <PlanExecutionCard plan={msg.plan} />}
                      </div>
                      {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0"><User size={18}/></div>}
                    </div>
                ))}
                {isLoading && <div className="flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>}
              </div>
              {!isNewUser && <div className="p-4 border-t"><Textarea placeholder="Command your AI..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}} /></div>}
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
