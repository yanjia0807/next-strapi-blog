import qs from 'qs'
import { flattenAttributes, getStrapiURL, setHeaders } from './utils'

const baseUrl = getStrapiURL()
export async function queryGlobalConfigData(locale) {
  const path = '/api/global'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = {
    populate: {
      navbar: {
        populate: {
          links: true,
        },
      },
      socialbar: {
        populate: {
          links: true,
        },
      },
      logo: true,
      shareImages: true,
    },
    locale,
  }
  url.search = qs.stringify(query, { encode: false })
  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['global'] },
  })
  const json = await res.json()
  const result = flattenAttributes(json)
  return result
}

export async function querySiteUrl() {
  const path = '/api/global'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = {
    fields: ['url'],
  }
  url.search = qs.stringify(query, { encode: false })
  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['global'] },
  })
  const json = await res.json()
  const result = flattenAttributes(json)
  return result.url
}

export async function queryI18nConfig() {
  const path = '/api/i18n/locales'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['global'] },
  })
  const json = await res.json()
  const result = flattenAttributes(json)
  const defaultLocale = result.find((item) => item.isDefault).code
  const locales = result.map(({ code }) => code)

  return {
    defaultLocale,
    locales,
  }
}

export async function queryI18nResources(language, namespaces) {
  const path = '/api/global'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = {
    populate: {
      i18nConfig: true,
    },
    fields: ['id'],
    locale: language,
  }
  url.search = qs.stringify(query, { encode: false })

  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['global'] },
  })
  const json = await res.json()
  const result = flattenAttributes(json)

  const ns: any = []
  result['i18nConfig'].forEach((item) => {
    if (namespaces.includes(item.namespace)) {
      ns.push(item)
    }
  })

  const nsObject = ns.reduce((prev, curr) => {
    Object.assign(prev, {
      [curr['namespace']]: curr['config'],
    })
    return prev
  }, {})

  return {
    [language]: nsObject,
  }
}
