'use client';

import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { TabType } from '../components/layout/BottomNav';
import { HomeView } from '../features/home/HomeView';
import { RiskView } from '../features/risk/RiskView';
import { ActionsView } from '../features/actions/ActionsView';
import { StressTestView } from '../features/stress-test/StressTestView';
import { ProfileVoiceView } from '../features/profile/ProfileVoiceView';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'home' && <HomeView onNavigate={setActiveTab} />}
      {activeTab === 'risk' && <RiskView onNavigate={setActiveTab} />}
      {activeTab === 'actions' && <ActionsView onNavigate={setActiveTab} />}
      {activeTab === 'stress-test' && <StressTestView />}
      {activeTab === 'profile' && <ProfileVoiceView />}
    </AppShell>
  );
}
