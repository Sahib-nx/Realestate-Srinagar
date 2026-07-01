import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AreaPageClient from '../AreaPageClient'
import { areasData } from '../AreaData'

const slug = 'rajbagh';

export const metadata: Metadata = {
  title: `${areasData[slug]?.name} Real Estate | Realestate Srinagar`,
  description: areasData[slug]?.metaDescription,
}

export default function Page() {
  const data = areasData[slug]
  if (!data) notFound()

  return <AreaPageClient data={data} />
}
