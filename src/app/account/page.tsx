
'use client';
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Check, Bot, User } from "lucide-react";
import Link from 'next/link';

const benefits = [
    "A private AI that learns from your data.",
    "Access to a full suite of automated workflows.",
    "A personalized workspace that adapts to you.",
    "Unlock institutional-grade market intelligence."
]

export default function AccountPage() {
    return (
        <div className="container mx-auto px-6 py-12">
            <PageHeader
                title="Your Intelligent Workspace Awaits"
                description="Creating an account doesn't just give you a login. It gives you a personalized AI co-pilot that learns your business and works exclusively for you."
                className="text-center"
            />

            <div className="grid md:grid-cols-2 gap-12 items-center mt-16 max-w-5xl mx-auto">
                <div className="space-y-4">
                    {benefits.map(benefit => (
                        <div key={benefit} className="flex items-start gap-3">
                            <div className="p-1 bg-green-500/20 text-green-500 rounded-full mt-1">
                                <Check className="h-4 w-4" />
                            </div>
                            <p className="text-lg text-muted-foreground">{benefit}</p>
                        </div>
                    ))}
                </div>
                <Card className="bg-muted/40">
                    <CardHeader className="text-center">
                        <Bot className="h-10 w-10 mx-auto text-primary mb-2" />
                        <CardTitle>Smart Account Creation</CardTitle>
                        <CardDescription>
                            Your first conversation with our AI is your onboarding.
                            It will ask a few simple questions to configure your entire workspace.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Button size="lg" asChild>
                            <Link href="/signup">Create Your Intelligent Account</Link>
                        </Button>
                         <p className="text-xs text-muted-foreground mt-4">
                            Already have an account? <Link href="/login" className="underline hover:text-primary">Log in here</Link>.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
