import { i18nRouter } from 'next-i18n-router'
import { queryI18nConfig } from './lib/strapi/global'

export async function middleware(request) {
  const { defaultLocale, locales } = await queryI18nConfig()
  return i18nRouter(request, { defaultLocale, locales })
}

export const config = {
  // Do not run the middleware on the following paths
  matcher: '/((?!lib|api|static|.*\\..*|_next).*)',
}
