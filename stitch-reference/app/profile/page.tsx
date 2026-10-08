import { AppShell } from '../../components/layout/AppShell';
import { ProfileVoiceView } from '../../features/profile/ProfileVoiceView';

export default function ProfilePage() {
  return (
    <AppShell currentRouteTitle="Voice / Profile">
      <ProfileVoiceView />
    </AppShell>
  );
}
