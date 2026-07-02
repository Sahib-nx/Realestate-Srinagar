import { notFound } from 'next/navigation'
import AreaPageClient from '../AreaPageClient'
import { areasData } from '../AreaData'
import { getAreaMetadata } from '../seoHelper'

const slug = 'nishat';

export const metadata = getAreaMetadata(slug);

export default function Page() {
  const data = areasData[slug]
  if (!data) notFound()

  return <AreaPageClient data={data} />
}
