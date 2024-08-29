import { queryPage } from './strapi/page'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import moment from 'moment'

export function getMomentLocal(local) {
  const locals = {
    zh: 'zh-cn',
    ja: 'ja',
    en: 'en',
  }

  return locals[local]
}

export function momentFormat(value, locale, format) {
  return moment(value).locale(locale).format(format)
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
