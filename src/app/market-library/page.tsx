
'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// This page has been deprecated and its logic consolidated into the root page.tsx.
// It is kept for routing purposes but should not be directly linked to.
export default function DeprecatedMarketLibraryPage() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4"/>
            <h1 className="text-2xl font-bold">Loading...</h1>
            <p className="text-muted-foreground">This page has moved.</p>
            <Link href="/" className="mt-4">
                <Button>Go to Home</Button>
            </Link>
        </div>
    );
}
