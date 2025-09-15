
'use client';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './card';
import { ArrowRight, Lock } from 'lucide-react';
import { track } from '@/lib/events';

/**
 * The "Smart Gate" component. It appears seamlessly in the briefing flow
 * and uses benefit-driven language to encourage account creation.
 */
export function LoginToContinue({ onLogin }: { onLogin: () => void }) {
    
    const handleLogin = () => {
        track('login_gate_interaction', { action: 'login_click' });
        // Simulate a successful login
        onLogin();
    };

    return (
        <Card className="border-primary/50 bg-primary/10 text-center p-8">
            <CardHeader>
                 <div className="mx-auto w-fit p-3 bg-primary/20 text-primary rounded-full mb-4">
                    <Lock className="h-6 w-6" />
                </div>
                <CardTitle>Unlock the Full Intelligence Briefing</CardTitle>
                <CardDescription>Create a free account to access deeper insights, save your analysis, and use our full suite of AI tools.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" onClick={handleLogin}>
                    Continue for Free <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
            </CardContent>
        </Card>
    );
}
