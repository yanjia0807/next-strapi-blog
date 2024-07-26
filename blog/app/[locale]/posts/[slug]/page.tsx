import 'css/prism.css'
import { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import PostLayout from '@/layouts/PostLayout'
import MdxRender from '@/components/MdxRender'
import {
  queryNextPost,
  queryPostBySlug,
  queryPostsSlug,
  queryPreviousPost,
} from '@/lib/strapi/post'
import { mapSlugsWithLocales } from '@/lib/strapi/utils'

export async function generateMetadata({ params: { slug } }): Promise<Metadata | undefined> {
  const post = await queryPostBySlug(slug)
  const { title, description } = post
  const metadata: any = {}
  if (title) metadata.title = title
  if (description) metadata.description = description
  return metadata
}

export async function generateStaticParams() {
  const { data } = await queryPostsSlug()
  return data.map(({ slug }) => ({ slug }))
}

export default async function Page({ params: { locale, slug } }) {
  const post = await queryPostBySlug(slug)
  if (!post) return notFound()

  const localizations = post.localizations.data || []
  const currentLocalization = { [locale]: slug }
  const localesWithSlugsMap = mapSlugsWithLocales(localizations, { currentLocalization })
  const currentSlugIsInvalid = slug !== localesWithSlugsMap[locale]
  if (currentSlugIsInvalid) {
    return redirect(`${localesWithSlugsMap[locale]}`)
  }

  const source = post.blocks?.find((block) => block['__component'] === 'shared.rich-text')?.body
  const prev = await queryPreviousPost({ slug, locale, publishedAt: post.publishedAt })
  const next = await queryNextPost({ slug, locale, publishedAt: post.publishedAt })

  return (
    <PostLayout post={post} prev={prev} next={next} locale={locale} className="">
      <MdxRender source={source} />
    </PostLayout>
  )
}
