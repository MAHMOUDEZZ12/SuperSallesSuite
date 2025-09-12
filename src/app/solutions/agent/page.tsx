
'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// This page is now deprecated.
export default function DeprecatedAgentSolutionsPage() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4"/>
            <h1 className="text-2xl font-bold">This page has moved.</h1>
            <p className="text-muted-foreground">All solutions are now showcased in our central Solutions Universe.</p>
            <Link href="/solutions" className="mt-4">
                <Button>Go to Solutions</Button>
            </Link>
        </div>
    );
}
