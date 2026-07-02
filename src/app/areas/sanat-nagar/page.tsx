import { notFound } from 'next/navigation'
import AreaPageClient from '../AreaPageClient'
import { areasData } from '../AreaData'
import { getAreaMetadata } from '../seoHelper'

const slug = 'sanat-nagar';

export const metadata = getAreaMetadata(slug);

export default function Page() {
  const data = areasData[slug]
  if (!data) notFound()

  return <AreaPageClient data={data} />
}
