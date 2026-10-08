'use client';

import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { TabType } from '../components/layout/BottomNav';
import { HomeView } from '../features/home/HomeView';
import { RiskView } from '../features/risk/RiskView';
import { ActionsView } from '../features/actions/ActionsView';
import { StressTestView } from '../features/stress-test/StressTestView';
import { ProfileView } from '../features/profile/ProfileView';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const handleOpenVoice = () => {
    setVoiceModalOpen(true);
  };

  return (
    <AppShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onOpenVoice={handleOpenVoice}
    >
      {activeTab === 'home' && <HomeView onNavigate={setActiveTab} onOpenVoice={handleOpenVoice} />}
      {activeTab === 'risk' && <RiskView onNavigate={setActiveTab} />}
      {activeTab === 'actions' && <ActionsView onNavigate={setActiveTab} onOpenVoice={handleOpenVoice} />}
      {activeTab === 'stress-test' && <StressTestView />}
      {activeTab === 'profile' && <ProfileView onNavigate={setActiveTab} onOpenVoice={handleOpenVoice} />}
    </AppShell>
  );
}
