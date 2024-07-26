import { queryPage } from './strapi/page'

export function formatDate(
  date: string | Date,
  locale: string,
  format?: Intl.DateTimeFormatOptions
): string {
  const defaultFormat: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const fmt = format || defaultFormat
  const now = new Date(date).toLocaleDateString(locale, fmt)
  return now
}

export async function createPageMetadata(slug) {
  const { contentSections } = await queryPage(slug)
  const seoSection = contentSections.find((section) => section['__component'] === 'shared.seo')
  const { title, description } = seoSection
  const metadata: any = {}
  if (title) metadata.title = title
  if (description) metadata.description = description
  return metadata
}
