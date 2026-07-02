import { getPlaceholderMetadata } from '@/lib/placeholderData'
import PlaceholderPage from '@/components/PlaceholderPage'

export const metadata = getPlaceholderMetadata('insightss');

export default function Page() {
  return <PlaceholderPage pageKey="insightss" />
}
