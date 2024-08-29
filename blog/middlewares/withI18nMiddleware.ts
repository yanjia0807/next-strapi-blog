import { i18nRouter } from 'next-i18n-router'
import { queryI18nConfig } from '@/lib/strapi/global'
import { CustomMiddleware } from './chain'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export function withI18nMiddleware(middleware: CustomMiddleware) {
  return async function (request: NextRequest, event: NextFetchEvent, response: NextResponse) {
    const { defaultLocale, locales } = await queryI18nConfig()
    return middleware(request, event, i18nRouter(request, { defaultLocale, locales }))
  }
}
