import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { queryI18nConfig, queryI18nResources } from '@/lib/strapi/global'

export function initI18next({ locale, ns, resources, locales, defaultLocale }) {
  const i18nInstance = createInstance()
  i18nInstance.use(initReactI18next).init({
    lng: locale,
    resources,
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    ns,
  })

  return {
    t: i18nInstance.getFixedT(locale, ns),
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
  }
}

export async function createTranslation(locale, ns) {
  const { locales, defaultLocale } = await queryI18nConfig()
  const resources = await queryI18nResources(locale, ns)
  return initI18next({ locale, ns, resources, locales, defaultLocale })
}
