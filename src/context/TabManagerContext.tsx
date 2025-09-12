
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { tools } from '@/lib/features';

interface Tab {
  href: string;
  label: string;
}

interface TabManagerContextType {
  openTabs: Tab[];
  activeTab: Tab | null;
  addTab: (tab: Tab) => void;
  removeTab: (href: string) => void;
}

const TabManagerContext = createContext<TabManagerContextType | undefined>(undefined);

const navMap: {[key: string]: string} = {
    '/dashboard': 'AI Command Center',
    '/dashboard/marketing': 'Apps',
    '/dashboard/flows': 'Flows',
    '/dashboard/assistant': 'AI Command Center',
    '/dashboard/tool/projects-finder': 'Market Library',
    '/dashboard/brand': 'Brand & Assets',
    '/dashboard/clients': 'Clients',
    '/dashboard/leads': 'Leads (CRM)',
    '/dashboard/settings': 'Settings',
    '/dashboard/tool/listing-performance': 'Performance',
};

const getLabelForPath = (path: string): string => {
    if (navMap[path]) return navMap[path];
    if (path.startsWith('/dashboard/tool/')) {
        const toolId = path.split('/')[3];
        const tool = tools.find(t => t.id === toolId);
        return tool?.title || 'Tool';
    }
    return 'Page';
}


export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openTabs, setOpenTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // On initial load, set the first tab
    if (pathname.startsWith('/dashboard') && openTabs.length === 0) {
        const initialTab = { href: pathname, label: getLabelForPath(pathname) };
        setOpenTabs([initialTab]);
        setActiveTab(initialTab);
    }
  }, [pathname, openTabs.length]);

  useEffect(() => {
    const currentTab = openTabs.find(tab => tab.href === pathname);
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [pathname, openTabs]);


  const addTab = useCallback((newTab: Tab) => {
    setOpenTabs((prevTabs) => {
      if (prevTabs.some(tab => tab.href === newTab.href)) {
        return prevTabs;
      }
      return [...prevTabs, newTab];
    });
  }, []);

  const removeTab = useCallback((hrefToRemove: string) => {
    let nextActiveTab: Tab | null = null;
    const remainingTabs = openTabs.filter((tab) => tab.href !== hrefToRemove);

    if (pathname === hrefToRemove && remainingTabs.length > 0) {
        // If we closed the active tab, navigate to the last remaining tab
        nextActiveTab = remainingTabs[remainingTabs.length - 1];
        router.push(nextActiveTab.href);
    }
    
    setOpenTabs(remainingTabs);
  }, [openTabs, pathname, router]);

  const value = { openTabs, activeTab, addTab, removeTab };

  return (
    <TabManagerContext.Provider value={value}>
      {children}
    </TabManagerContext.Provider>
  );
};

export const useTabManager = () => {
  const context = useContext(TabManagerContext);
  if (context === undefined) {
    throw new Error('useTabManager must be used within a TabProvider');
  }
  return context;
};

    
