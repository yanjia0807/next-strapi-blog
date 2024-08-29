import { Metadata } from 'next'
import { createPageMetadata } from '@/lib/utils'
import AuthorLayout from '@/layouts/author-layout'
import { queryPage } from '@/lib/strapi/page'
import { queryMainAuthor } from '@/lib/strapi/author'
import { queryStrapiMedia } from '@/lib/strapi/utils'
import MdxRender from '@/components/mdx-render'

export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  return createPageMetadata(`about-${locale}`)
}

export default async function Page({ params: { locale } }) {
  const { contentSections } = await queryPage(`about-${locale}`)
  const displaySection = contentSections.find(
    (section) => section['__component'] === 'shared.display-section'
  )

  const author: any = await queryMainAuthor(locale)
  const {
    name,
    description,
    mobile,
    email,
    weixin,
    avatar: { url: avatarUrl },
    blocks,
  } = author
  const avatar = queryStrapiMedia(avatarUrl)
  const source = blocks?.find((block) => block['__component'] === 'shared.rich-text')?.body

  return (
    <AuthorLayout
      content={{ name, email, mobile, weixin, description, avatar, displaySection }}
      locale={locale}
    >
      <MdxRender source={source} />
    </AuthorLayout>
  )
}
