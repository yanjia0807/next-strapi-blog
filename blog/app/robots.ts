import { MetadataRoute } from 'next'
import { querySiteUrl } from '@/lib/strapi/global'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = await querySiteUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
