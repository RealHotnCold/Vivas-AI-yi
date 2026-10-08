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
    <div className="min-h-screen w-full bg-[#e8eee8] flex justify-center selection:bg-[#0ea5e9] selection:text-white">
      {/* Mobile Frame Container: Emulates native smartphone screen */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#f2fcf2] text-[#151e18] shadow-[0_0_50px_rgba(0,0,0,0.15)] flex flex-col relative border-x border-[#bec8d2]/30">
        
        {/* Sticky Fixed Header within Mobile Frame */}
        <Header currentRouteTitle={currentRouteTitle || titles[activeTab]} />

        {/* Scrollable Screen Content */}
        <main className="flex-1 flex flex-col w-full pt-28 pb-24 px-4 overflow-y-auto">
          {children}
        </main>

        {/* Universal Floating Speak Mic */}
        <FloatingMic onClick={handleOpenVoice} />

        {/* Universal Voice Modal Overlay */}
        <VoiceModal isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />

        {/* Fixed Mobile Bottom Nav */}
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
}
