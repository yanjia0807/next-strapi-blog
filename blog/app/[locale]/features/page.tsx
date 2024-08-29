import { Metadata } from 'next'
import { createPageMetadata } from '@/lib/utils'
import FeaturesLayout from '@/layouts/features-layout'
import { queryPage } from '@/lib/strapi/page'
import { queryPostFeatures } from '@/lib/strapi/post'

export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  return createPageMetadata(`feature-${locale}`)
}

export default async function Page({ params: { locale }, searchParams: { page = 1 } }) {
  const { contentSections } = await queryPage(`feature-${locale}`)
  const { size } = contentSections.find(
    (section) => section['__component'] === 'shared.display-size'
  )
  const displaySection = contentSections.find(
    (section) => section['__component'] === 'shared.display-section'
  )

  const {
    data: posts,
    meta: { pagination },
  } = await queryPostFeatures(locale, {
    page,
    pageSize: size,
  })

  return (
    <FeaturesLayout
      locale={locale}
      displaySection={displaySection}
      posts={posts}
      pagination={pagination}
    />
  )
}
