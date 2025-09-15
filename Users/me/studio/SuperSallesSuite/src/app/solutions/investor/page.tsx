
// DELETED: Architectural debt. The new /g/flows page serves as the primary
// superior showcase for our platform's capabilities.
import { redirect } from 'next/navigation';

export default function DeprecatedInvestorSolutionsPage() {
    redirect('/g/flows');
}
