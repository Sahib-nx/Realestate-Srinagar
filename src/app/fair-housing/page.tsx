import { getPlaceholderMetadata } from '@/lib/placeholderData'
import PlaceholderPage from '@/components/PlaceholderPage'

export const metadata = getPlaceholderMetadata('fair-housing');

export default function Page() {
  return <PlaceholderPage pageKey="fair-housing" />
}
