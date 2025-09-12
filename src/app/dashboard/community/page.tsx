
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function CommunityPage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Community"
        description="Connect with other real estate professionals, share strategies, and learn together."
        icon={<Users className="h-8 w-8" />}
      />

      <Card className="flex items-center justify-center h-96 border-dashed">
        <CardContent className="text-center">
            <h3 className="text-2xl font-bold">Coming Soon</h3>
            <p className="text-muted-foreground mt-2">Our community platform is under construction. Stay tuned!</p>
        </CardContent>
      </Card>
    </main>
  );
}
