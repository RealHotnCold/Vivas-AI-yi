import { AppShell } from '../../components/layout/AppShell';
import { RiskView } from '../../features/risk/RiskView';

export default function RiskPage() {
  return (
    <AppShell currentRouteTitle="Risk Radar">
      <RiskView />
    </AppShell>
  );
}
