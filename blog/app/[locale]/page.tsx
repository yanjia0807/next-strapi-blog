import HomeLayout from '@/layouts/home-layout'
import { queryPage } from '@/lib/strapi/page'
import { queryPosts } from '@/lib/strapi/post'

export default async function Page({ params: { locale } }) {
  const { contentSections } = await queryPage(`home-${locale}`)
  const { size } = contentSections.find(
    (section) => section['__component'] === 'shared.display-size'
  )
  const pagination = {
    pageSize: size || 10,
    page: 1,
  }
  const { data: posts } = await queryPosts(pagination, locale)

  return <HomeLayout posts={posts} contentSections={contentSections} locale={locale} />
}
