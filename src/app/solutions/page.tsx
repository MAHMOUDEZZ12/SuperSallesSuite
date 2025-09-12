'use client';

// This page is now deprecated. The user journey is now from /ecosystem to persona-specific
// solution pages like /solutions/agent, /solutions/investor, etc.
// This file is kept for routing purposes but should not be directly linked to.
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DeprecatedSolutionsPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect users to the main ecosystem page, which serves as the new solutions hub.
        router.replace('/ecosystem');
    }, [router]);

    return null; // Render nothing while redirecting
}
