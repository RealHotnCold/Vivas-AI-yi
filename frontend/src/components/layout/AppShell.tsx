'use client';

import React, { useState } from 'react';
import { Header } from './Header';
import { BottomNav, TabType } from './BottomNav';
import { FloatingMic } from '../ui/FloatingMic';
import { VoiceModal } from '../ui/VoiceModal';

interface AppShellProps {
  children: React.ReactNode;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  currentRouteTitle?: string;
  onOpenVoice?: () => void;
}

export function AppShell({ children, activeTab = 'home', onTabChange, currentRouteTitle, onOpenVoice }: AppShellProps) {
  const [voiceOpen, setVoiceOpen] = useState(false);

  const titles: Record<TabType, string> = {
    home: 'Dashboard',
    risk: 'Risk Radar',
    actions: 'Actions',
    'stress-test': 'Stress Test',
    profile: 'Profile'
  };

  const handleOpenVoice = () => {
    if (onOpenVoice) {
      onOpenVoice();
    } else {
      setVoiceOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f2fcf2] text-[#151e18] relative">
      <Header currentRouteTitle={currentRouteTitle || titles[activeTab]} />
      <main className="flex-1 flex flex-col relative w-full pt-28 pb-24 px-4 max-w-md mx-auto">
        {children}
      </main>

      {/* Always Accessible Floating Speak Button */}
      <FloatingMic onClick={handleOpenVoice} />

      {/* Always Accessible Voice Modal Overlay */}
      <VoiceModal isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
