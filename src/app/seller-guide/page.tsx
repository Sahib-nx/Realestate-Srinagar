import { getPlaceholderMetadata } from '@/lib/placeholderData'
import PlaceholderPage from '@/components/PlaceholderPage'

export const metadata = getPlaceholderMetadata('seller-guide');

export default function Page() {
  return <PlaceholderPage pageKey="seller-guide" />
}
