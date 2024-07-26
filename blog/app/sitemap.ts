import { MetadataRoute } from 'next'
import { queryI18nConfig, querySiteUrl } from '@/lib/strapi/global'
import { queryPostsSlug } from '@/lib/strapi/post'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await querySiteUrl()
  const { defaultLocale, locales } = await queryI18nConfig()
  const alternateLngs = locales.filter((locale) => locale !== defaultLocale)

  const staticRoutes = [
    {
      url: `/`,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'weekly',
    },
    {
      url: `/posts`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'daily',
    },
    {
      url: `/tags`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: `/features`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: `/about`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
  ].map(({ url, lastModified, priority, changeFrequency }) => ({
    url: `${siteUrl}${url}`,
    lastModified,
    priority,
    changeFrequency,
    alternates: {
      languages: alternateLngs.reduce((prev, curr) => {
        Object.assign(prev, { [curr]: `${siteUrl}/${curr}${url}` })
        return prev
      }, {}),
    },
  }))

  const { data: posts } = await queryPostsSlug()

  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    priority: 0.64,
    lastModified: post.updatedAt,
    changeFrequency: 'daily',
    alternates: {
      languages: alternateLngs.reduce((prev, curr) => {
        Object.assign(prev, { [curr]: `${siteUrl}/${curr}/posts/${post.slug}` })
        return prev
      }, {}),
    },
  }))

  return [...staticRoutes, ...postRoutes]
}
