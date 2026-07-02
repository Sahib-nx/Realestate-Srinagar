import { getPlaceholderMetadata } from '@/lib/placeholderData'
import PlaceholderPage from '@/components/PlaceholderPage'

export const metadata = getPlaceholderMetadata('privacy-policy');

export default function Page() {
  return <PlaceholderPage pageKey="privacy-policy" />
}
