
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Youtube } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DeprecatedYoutubeEditorPage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="AI YouTube Video Editor (Consolidated)"
        description="This tool has been merged into the new Creative Canvas."
        icon={<Youtube className="h-8 w-8" />}
      />

        <Alert variant="destructive">
          <AlertTitle>This Tool has been Upgraded!</AlertTitle>
          <AlertDescription>
            The YouTube Video Editor functionality has been consolidated into the new, more powerful{' '}
            <Link href="/dashboard/tool/creative-canvas" className="font-semibold underline">Creative Canvas</Link>. 
            Please use the canvas for all your creative editing needs.
          </AlertDescription>
        </Alert>

        <Card>
            <CardHeader>
                <CardTitle>Why was this tool consolidated?</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert">
                <p>
                    To create a single, unified workflow for all creative tasks. Instead of having separate tools for editing PDFs, videos, and images, the Creative Canvas provides one consistent interface.
                </p>
                <p>
                    Simply upload your video to the canvas, and use the smart tools or natural language commands to edit it for YouTube.
                </p>
                 <Link href="/dashboard/tool/creative-canvas">
                    <Button>
                        <Edit className="mr-2 h-4 w-4" /> Go to Creative Canvas
                    </Button>
                </Link>
            </CardContent>
        </Card>

    </main>
  );
}
