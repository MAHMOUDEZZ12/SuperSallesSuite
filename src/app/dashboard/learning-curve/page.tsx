
'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { BrainCircuit, BookOpen, Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data - in a real app, this would be fetched from a backend
const mockLearningData = [
  { date: 'Jul 1', confidence: 65 },
  { date: 'Jul 5', confidence: 68 },
  { date: 'Jul 10', confidence: 72 },
  { date: 'Jul 15', confidence: 71 },
  { date: 'Jul 20', confidence: 78 },
  { date: 'Jul 25', confidence: 82 },
];

const mockRecentLearnings = [
  "Learned new investor preference for 'high yield' from CRM notes.",
  "Identified 'Emaar Beachfront' as a high-performing project based on listing data.",
  "Updated brand colors from 'BrandKit.pdf' document.",
  "Recognized 'Damac Hills 2' as a family-focused community from brochure analysis.",
  "Adjusted market sentiment to 'Optimistic' based on recent market reports."
];

export default function LearningCurvePage() {
  const [knowledgeScore, setKnowledgeScore] = useState(0);

  useEffect(() => {
    // Simulate calculating the score based on localStorage
    const docs = JSON.parse(localStorage.getItem('myProjects') || '[]').length;
    // A simple heuristic for demonstration
    const score = Math.min(100, 20 + docs * 8); 
    setKnowledgeScore(score);
  }, []);

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="My AI's Learning Curve"
        description="Visualize how your AI assistant gets smarter as you use the platform and train it with your data."
        icon={<BrainCircuit className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Price Estimator Accuracy</CardTitle>
                    <CardDescription>Visualizing the AI's confidence in its price estimations for your market over time.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockLearningData}>
                           <CartesianGrid strokeDasharray="3 3" />
                           <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                           <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[60, 90]} tickFormatter={(value) => `${value}%`} />
                           <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                           <Line type="monotone" dataKey="confidence" name="Confidence" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Recent Learnings</CardTitle>
                    <CardDescription>A feed of recent insights and knowledge your AI has acquired.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {mockRecentLearnings.map((learning, index) => (
                             <li key={index} className="flex items-start gap-3 text-sm p-3 bg-muted/50 rounded-md">
                                <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                <span className="text-muted-foreground">{learning}</span>
                             </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Knowledge Base Score</CardTitle>
                    <CardDescription>How well your AI is trained on your specific business data.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="relative h-32 w-32 mx-auto mb-4">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="hsl(var(--secondary))"
                                strokeWidth="3"
                            />
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="3"
                                strokeDasharray={`${knowledgeScore}, 100`}
                                strokeLinecap="round"
                            />
                        </svg>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-primary">{knowledgeScore}</span>
                            <span className="text-sm text-muted-foreground">/100</span>
                        </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                        Your AI's knowledge score is based on the quantity and quality of documents in your Knowledge Base.
                    </p>
                </CardContent>
                <CardFooter>
                    <Link href="/dashboard/brand" className="w-full">
                        <Button className="w-full">
                            <BookOpen className="mr-2 h-4 w-4"/>
                            Improve Score
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
      </div>
    </main>
  );
}
