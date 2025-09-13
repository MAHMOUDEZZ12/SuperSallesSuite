
// DELETED: Architectural debt. The new /solutions page is the central destination.
import { redirect } from 'next/navigation';

export default function DeprecatedAgentSolutionsPage() {
    redirect('/solutions');
}
