'use client'

import { I18nextProvider } from 'react-i18next'
import { initI18next } from '@/lib/i18n'

export default function TranslationsProvider({
  children,
  locale,
  ns,
  resources,
  locales,
  defaultLocale,
}) {
  const { i18n } = initI18next({
    locale,
    ns,
    resources,
    locales,
    defaultLocale,
  })
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
