
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { BarChart2, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function PerformancePage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Performance Dashboard"
        description="This is a placeholder for the future performance and analytics hub."
        icon={<BarChart2 className="h-8 w-8" />}
      />
      <Card className="mt-12 flex items-center justify-center h-96 border-dashed">
        <CardContent className="text-center p-6">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">Performance Hub Coming Soon</h3>
            <p className="text-muted-foreground mt-2">
                This section will contain detailed analytics on your marketing efforts, lead conversion, and ROI.
            </p>
        </CardContent>
      </Card>
    </main>
  );
}
