
// DELETED: This page is now obsolete. The new homepage (app/page.tsx)
// has absorbed its functionality into the immersive Genesis UI.
'use client';
import React from 'react';
import { redirect } from 'next/navigation';

export default function DeprecatedSearchPage() {
    // Redirect all traffic to the new unified homepage search experience
    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const query = searchParams.get('q');
        if (query) {
            redirect(`/?q=${encodeURIComponent(query)}`);
        } else {
            redirect('/');
        }
    }, []);

    return null;
}
