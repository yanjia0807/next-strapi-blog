import 'css/prism.css'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostLayout from '@/layouts/post-layout'
import MdxRender from '@/components/mdx-render'
import {
  queryNextPost,
  queryPostBySlug,
  queryPostsSlug,
  queryPreviousPost,
} from '@/lib/strapi/post'

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
  const source = post.blocks?.find((block) => block['__component'] === 'shared.rich-text')?.body
  const prev = await queryPreviousPost({ slug, locale, publishedAt: post.publishedAt })
  const next = await queryNextPost({ slug, locale, publishedAt: post.publishedAt })

  return (
    <PostLayout post={post} prev={prev} next={next} locale={locale}>
      <MdxRender source={source} />
    </PostLayout>
  )
}
