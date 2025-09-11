
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Bot, Send, X, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { secretCodes } from '@/lib/codes';
import Link from 'next/link';

type Message = {
    from: 'ai' | 'user';
    text: string | React.ReactNode;
};

const InitialAssistantMessage = () => (
    <div>
        <p className="font-semibold mb-2">Hello! I'm your AI co-pilot, the brain of selltoday.ai.</p>
        <p className="mb-2">You can command me to perform complex tasks, but first, you should train me. The more I know, the better I can help you.</p>
        <div className="p-3 bg-background rounded-lg border space-y-2">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><BookOpen className="h-5 w-5" /></div>
                <div>
                    <h4 className="font-semibold text-foreground">How to Train Me</h4>
                    <p className="text-sm text-foreground/80">Go to the <Link href="/dashboard/brand" className="underline font-semibold hover:text-primary">Brand & Assets</Link> page and upload your brochures, price lists, and market reports. This is my "Knowledge Base".</p>
                </div>
            </div>
             <div className="flex items-start gap-3">
                 <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><Sparkles className="h-5 w-5" /></div>
                <div>
                    <h4 className="font-semibold text-foreground">Next Best Step</h4>
                    <p className="text-sm text-foreground/80">A great place to start is the <Link href="/dashboard/tool/meta-auto-pilot" className="underline font-semibold hover:text-primary">Meta Auto Pilot</Link>. It can run an entire ad campaign for you with a single click.</p>
                </div>
            </div>
        </div>
         <p className="mt-3 text-sm">If you have a secret code, feel free to enter it below.</p>
    </div>
);


export function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'ai', text: <InitialAssistantMessage /> },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
      setTimeout(() => {
          scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
        const foundCode = secretCodes.find(c => input.toUpperCase().includes(c.code));
        let aiResponse: Message;

        if (foundCode) {
            aiResponse = { from: 'ai', text: `Excellent! The code ${foundCode.code} is valid. \n\n**Reward Unlocked**: ${foundCode.reward} \n\nI can now perform this action for you. What property or project should I start with?` };
        } else {
            aiResponse = { from: 'ai', text: "I've received your message. While I'm still in training for full conversational abilities, I've logged your request. You can use the tools in the sidebar to get started right away!" };
        }
        
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
    }, 1200);
  };

  if (!isOpen) {
      return (
        <button
            aria-label="Open AI Assistant"
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg hover:bg-primary/90 animate-in fade-in zoom-in"
        >
            <Sparkles className="h-6 w-6" />
      </button>
      )
  }


  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-end justify-end bg-black/50 animate-in fade-in">
          <div className="m-4 w-full max-w-lg rounded-2xl border bg-card text-card-foreground shadow-lg animate-in slide-in-from-bottom-8">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary"/>
                Your AI Assistant
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            
            <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef as any}>
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={cn(
                        "flex items-end gap-2",
                        msg.from === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                        {msg.from === 'ai' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/20 text-primary">
                            <Bot className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                        )}
                        <div
                        className={cn(
                            "max-w-xs rounded-2xl p-3 text-sm whitespace-pre-wrap",
                            msg.from === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted rounded-bl-none'
                        )}
                        >
                        {msg.text}
                        </div>
                        {msg.from === 'user' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        )}
                    </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-end gap-2 justify-start">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/20 text-primary">
                                <Bot className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                             <div className="max-w-xs rounded-2xl p-3 text-sm bg-muted rounded-bl-none">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                             </div>
                         </div>
                    )}
                </div>
                </ScrollArea>
            </CardContent>
            
             <CardFooter className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                    <Input 
                        placeholder="Ask anything or enter a secret code..." 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardFooter>
          </div>
        </div>
    </>
  );
}
