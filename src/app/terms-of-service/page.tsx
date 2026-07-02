import { getPlaceholderMetadata } from '@/lib/placeholderData'
import PlaceholderPage from '@/components/PlaceholderPage'

export const metadata = getPlaceholderMetadata('terms-of-service');

export default function Page() {
  return <PlaceholderPage pageKey="terms-of-service" />
}
