import { AppShell } from '../../components/layout/AppShell';
import { ProfileView } from '../../features/profile/ProfileView';

export default function ProfilePage() {
  return (
    <AppShell activeTab="profile" currentRouteTitle="Profile">
      <ProfileView />
    </AppShell>
  );
}
