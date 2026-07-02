import { getPlaceholderMetadata } from '@/lib/placeholderData'
import PlaceholderPage from '@/components/PlaceholderPage'

export const metadata = getPlaceholderMetadata('buyer-guide');

export default function Page() {
  return <PlaceholderPage pageKey="buyer-guide" />
}
