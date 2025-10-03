
'use client';

import * as React from 'react';
import { AssistantChat } from '@/components/assistant-chat';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardFooter } from '@/components/dashboard-footer';
import { TabProvider } from '@/context/TabManagerContext';
import { CanvasProvider } from '@/context/CanvasContext';
import { CreativeCanvas } from '@/components/creative-canvas';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TabProvider>
      <CanvasProvider>
       <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-10">{children}</main>
         <CreativeCanvas />
         <AssistantChat />
       </div>
      </CanvasProvider>
    </TabProvider>
  );
}

