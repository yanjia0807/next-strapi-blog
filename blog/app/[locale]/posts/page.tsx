import { Metadata } from 'next'
import { createPageMetadata } from '@/lib/utils'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { queryPage } from '@/lib/strapi/page'
import { queryTagBySlug, queryTags } from '@/lib/strapi/tag'
import { queryPosts, queryPostsInTag } from '@/lib/strapi/post'

export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  return createPageMetadata(`post-${locale}`)
}

export default async function Page({ params: { locale }, searchParams: { page = 1, tagSlug } }) {
  const tags = await queryTags(locale)

  const { contentSections } = await queryPage(`post-${locale}`)
  const { size } = contentSections.find(
    (section) => section['__component'] === 'shared.display-size'
  )
  const pageSize = size || 10

  let tag: any = null,
    posts: any = null,
    pagination: any = null
  if (tagSlug) {
    tag = await queryTagBySlug(tagSlug)
    const result = await queryPostsInTag({ page, pageSize }, locale, tagSlug)
    posts = result.data
    pagination = result.meta.pagination
  } else {
    const result = await queryPosts({ page, pageSize }, locale)
    posts = result.data
    pagination = result.meta.pagination
  }

  return (
    <ListLayoutWithTags
      pagination={pagination}
      tag={tag}
      tags={tags}
      posts={posts}
      locale={locale}
    />
  )
}
