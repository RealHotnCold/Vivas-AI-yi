'use client';

import React from 'react';
import { Header } from './Header';
import { BottomNav, TabType } from './BottomNav';

interface AppShellProps {
  children: React.ReactNode;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  currentRouteTitle?: string;
}

export function AppShell({ children, activeTab = 'home', onTabChange, currentRouteTitle }: AppShellProps) {
  const titles: Record<TabType, string> = {
    home: 'Dashboard',
    risk: 'Risk Radar',
    actions: 'Actions',
    'stress-test': 'Stress Test',
    profile: 'Voice Advisory'
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f2fcf2] text-[#151e18]">
      <Header currentRouteTitle={currentRouteTitle || titles[activeTab]} />
      <main className="flex-1 flex flex-col relative w-full pt-28 pb-24 px-4 max-w-md mx-auto">
        {children}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
