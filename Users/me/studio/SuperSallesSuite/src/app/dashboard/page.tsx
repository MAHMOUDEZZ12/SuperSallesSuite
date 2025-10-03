
// The root dashboard page now redirects immediately to the AI Command Center.
// The user's journey begins with a conversation.
import { redirect } from 'next/navigation';

export default function RootDashboardRedirect() {
  redirect('/dashboard/assistant');
}
