import { queryI18nConfig } from '@/lib/strapi/global'
import { CustomMiddleware } from './chain'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { queryPostBySlug } from '@/lib/strapi/post'
import { mapSlugsWithLocales } from '@/lib/strapi/utils'

export function withPostSlugMiddleware(middleware: CustomMiddleware) {
  return async function (request: NextRequest, event: NextFetchEvent, response: NextResponse) {
    const regex1 = /posts\/.+/
    const pathname = request.nextUrl.pathname
    if (!regex1.test(pathname)) {
      return middleware(request, event, response)
    }

    const { locales, defaultLocale } = await queryI18nConfig()
    const segments = pathname.split('/')
    const localeIndex = segments.findIndex((segment) => locales.includes(segment))
    let locale = defaultLocale
    if (localeIndex !== -1) {
      locale = segments[localeIndex]
    }
    const slug = segments[segments.length - 1]
    const post = await queryPostBySlug(slug)
    const localizations = post.localizations.data || []
    const currentLocalization = { [locale]: slug }
    const localesWithSlugsMap = mapSlugsWithLocales(localizations, { currentLocalization })
    const localSlug = localesWithSlugsMap[locale]

    if (slug !== localSlug) {
      const redirectURL = new URL(request.url)
      redirectURL.search = request.nextUrl.search
      redirectURL.pathname = `/${locale}/posts/${localSlug}`
      return NextResponse.redirect(redirectURL.toString())
    }

    return middleware(request, event, response)
  }
}
