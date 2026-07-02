import { getPlaceholderMetadata } from '@/lib/placeholderData'
import PlaceholderPage from '@/components/PlaceholderPage'

export const metadata = getPlaceholderMetadata('neighborhood-guides');

export default function Page() {
  return <PlaceholderPage pageKey="neighborhood-guides" />
}
