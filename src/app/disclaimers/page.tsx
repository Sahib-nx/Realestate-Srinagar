import { getPlaceholderMetadata } from '@/lib/placeholderData'
import PlaceholderPage from '@/components/PlaceholderPage'

export const metadata = getPlaceholderMetadata('disclaimers');

export default function Page() {
  return <PlaceholderPage pageKey="disclaimers" />
}
