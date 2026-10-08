'use client';

import React from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface AppShellProps {
  children: React.ReactNode;
  currentRouteTitle?: string;
}

export function AppShell({ children, currentRouteTitle }: AppShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f2fcf2] text-[#151e18]">
      <Header currentRouteTitle={currentRouteTitle} />
      <main className="flex-1 flex flex-col relative w-full pt-28 pb-24 px-4 max-w-md mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
