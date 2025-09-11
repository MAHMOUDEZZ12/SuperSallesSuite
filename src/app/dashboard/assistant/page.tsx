
'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { BrainCircuit, Upload, Sparkles, BookOpen, Wand2, FileText, Bot, Loader2, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast';
import { fileToDataUri } from '@/lib/tools-client';
import { aiBrandCreator } from '@/ai/flows/ai-brand-creator';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import Link from 'next/link';


const samplePrompts = [
    { title: "Summarize Market Trends", prompt: "Summarize the latest market trends for downtown luxury condos based on the Q2 report I uploaded." },
    { title: "Draft a Follow-up Email", prompt: "Draft a polite but persistent follow-up email to Jane Doe regarding the offer on 123 Main St." },
    { title: "Analyze a Brochure", prompt: "What are the top 3 selling points from the 'Emaar Beachfront' brochure?" },
    { title: "Generate Social Post Ideas", prompt: "Give me 5 Instagram post ideas for the new listing at Sobha Hartland." },
    { title: "Compare Two Properties", prompt: "Create a comparison table for a client between 'Emaar Beachfront' and 'Damac Hills 2'." },
    { title: "Role-play a Negotiation", prompt: "Let's role-play. I'm the seller's agent for a property in Dubai Marina, and you're a buyer's agent with a low offer. Start the conversation." },
]

type MockFile = { id: number; name: string; type: string; icon: React.ReactNode; size: string; file?: File };


export default function AssistantPage() {
    const { toast } = useToast();
    const [goal, setGoal] = useState("create");
    const [context, setContext] = useState("a bulleted list of social media post ideas");
    const [format, setFormat] = useState("for a new luxury condo listing");
    const [generatedPrompt, setGeneratedPrompt] = useState("Based on the new luxury condo listing, create a bulleted list of 5 social media post ideas.");

    const handleGeneratePrompt = () => {
        const goalTextMap: { [key: string]: string } = {
            create: "create",
            analyze: "analyze",
            strategize: "develop a strategy for"
        };

        const fullGoalText = goalTextMap[goal] || "do something with";
        const fullContext = context || "the provided information";
        const fullFormat = format || "a paragraph";

        const prompt = `Act as an expert real estate marketing assistant. Your task is to ${fullGoalText} ${fullFormat} based on ${fullContext}.`;
        setGeneratedPrompt(prompt);
    }


  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="AI Command Center"
        description="Your mission control for all AI agents. Train them, define their personality, and manage their knowledge."
        icon={<BrainCircuit className="h-8 w-8" />}
      />

      <Tabs defaultValue="personality" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personality"><Bot className="mr-2 h-4 w-4" /> Personality & Instructions</TabsTrigger>
          <TabsTrigger value="prompts"><Wand2 className="mr-2 h-4 w-4" /> Prompt Library & Generator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personality">
          <Card>
            <CardHeader>
              <CardTitle>Assistant Configuration</CardTitle>
              <CardDescription>Define how your AI agents interact and what their core purpose is. The more specific you are, the better they will perform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="assistant-name">Assistant Name</Label>
                    <Input 
                      id="assistant-name" 
                      defaultValue="My Assistant"
                    />
                    <p className="text-sm text-muted-foreground">Give your AI a name to make it feel more personal.</p>
                 </div>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="assistant-instructions">Core Instructions</Label>
                  <Textarea 
                    id="assistant-instructions" 
                    placeholder="e.g., You are a real estate marketing expert. Your goal is to help me create compelling content and find leads..."
                    rows={8}
                    defaultValue="You are an expert real estate sales and marketing assistant with 25 years of experience in the Dubai market. Your primary function is to help the user save time, create high-quality marketing materials, and identify sales opportunities. Use the knowledge provided in the 'Knowledge Base' to inform your answers. Always tailor your responses to the UAE real estate landscape."
                   />
                    <p className="text-sm text-muted-foreground">This is the most important setting. It defines the base personality and directives for all your AI agents, including embeddable chatbots.</p>
               </div>
               <div className="space-y-2">
                 <Label>AI Knowledge Base</Label>
                 <Card className="bg-muted/50 p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-grow">
                             <p className="text-sm text-foreground">The AI's private knowledge comes from the files you upload. Go to the Brand & Assets page to manage your AI's brain. The more documents you provide, the smarter your assistants will become.</p>
                        </div>
                        <Link href="/dashboard/brand">
                           <Button variant="outline">
                               <BookOpen className="mr-2 h-4 w-4" />
                               Manage Knowledge Base
                           </Button>
                        </Link>
                    </div>
                 </Card>
               </div>
            </CardContent>
            <CardFooter>
                 <Button>Save Configuration</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Prompt Library</CardTitle>
                        <CardDescription>Use these expert-crafted prompts to get the most out of your assistant.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {samplePrompts.map((prompt) => (
                            <div key={prompt.title} className="p-3 bg-muted/50 rounded-md hover:bg-muted cursor-pointer">
                                <p className="font-semibold">{prompt.title}</p>
                                <p className="text-sm text-muted-foreground italic">"{prompt.prompt}"</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Prompt Generator</CardTitle>
                        <CardDescription>Learn how to write better prompts to get better results from the AI.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <Label>What is your goal?</Label>
                           <Select value={goal} onValueChange={setGoal}>
                               <SelectTrigger>
                                 <SelectValue placeholder="e.g., Create content, analyze data..." />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="create">Create Content</SelectItem>
                                 <SelectItem value="analyze">Analyze Data</SelectItem>
                                 <SelectItem value="strategize">Develop a Strategy</SelectItem>
                               </SelectContent>
                           </Select>
                        </div>
                         <div className="space-y-2">
                           <Label>What is the context?</Label>
                            <Input placeholder="e.g., A new luxury condo listing" value={format} onChange={e => setFormat(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                           <Label>What format should the output be?</Label>
                            <Input placeholder="e.g., A bulleted list, a paragraph, a table" value={context} onChange={e => setContext(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                           <Label>Generated Prompt</Label>
                           <Textarea 
                                readOnly
                                value={generatedPrompt}
                                className="italic text-muted-foreground"
                                rows={4}
                           />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleGeneratePrompt}>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Prompt
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
