import { Metadata } from 'next'
import TagsLayout from '@/layouts/tags-layout'
import { createPageMetadata } from '@/lib/utils'
import { queryTags } from '@/lib/strapi/tag'

export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  return createPageMetadata(`tag-${locale}`)
}

export default async function Page({ params: { locale } }) {
  const tags = await queryTags(locale)
  return <TagsLayout locale={locale} tags={tags} />
}
