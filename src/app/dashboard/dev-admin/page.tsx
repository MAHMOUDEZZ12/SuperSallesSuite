
import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { GanttChartSquare } from 'lucide-react';
import { DevAdminClient } from '@/components/ui/dev-admin-client';
import { cookies } from "next/headers";

export default function DevAdminPage() {
    const cookieStore = cookies();
    const country = cookieStore.get("country")?.value || "AE";
    const city = cookieStore.get("city")?.value || "Dubai";
    
    // This page is now a Server Component. It fetches server-side data
    // and passes it to the client component that handles interactivity.
    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Development Admin Dashboard"
                description="Our shared workspace. Assign tasks, monitor the Change Log, and manage data ingestion."
                icon={<GanttChartSquare className="h-8 w-8" />}
            />
            <DevAdminClient initialCity={city} initialCountry={country} />
        </main>
    );
}
