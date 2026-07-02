import { getPlaceholderMetadata } from '@/lib/placeholderData'
import PlaceholderPage from '@/components/PlaceholderPage'

export const metadata = getPlaceholderMetadata('market-reports');

export default function Page() {
  return <PlaceholderPage pageKey="market-reports" />
}
