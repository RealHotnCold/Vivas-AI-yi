import { AppShell } from '../../components/layout/AppShell';
import { StressTestView } from '../../features/stress-test/StressTestView';

export default function StressTestPage() {
  return (
    <AppShell currentRouteTitle="Stress Test">
      <StressTestView />
    </AppShell>
  );
}
