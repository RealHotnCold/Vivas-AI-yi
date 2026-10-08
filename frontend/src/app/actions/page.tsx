import { AppShell } from '../../components/layout/AppShell';
import { ActionsView } from '../../features/actions/ActionsView';

export default function ActionsPage() {
  return (
    <AppShell currentRouteTitle="Actions">
      <ActionsView />
    </AppShell>
  );
}
