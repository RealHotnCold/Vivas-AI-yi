import { AppShell } from '../components/layout/AppShell';
import { HomeView } from '../features/home/HomeView';

export default function HomePage() {
  return (
    <AppShell currentRouteTitle="Dashboard">
      <HomeView />
    </AppShell>
  );
}
