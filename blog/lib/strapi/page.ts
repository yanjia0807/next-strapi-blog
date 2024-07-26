import qs from 'qs'
import { flattenAttributes, getStrapiURL, setHeaders } from './utils'

const baseUrl = getStrapiURL()
export async function queryPage(slug) {
  const path = '/api/pages'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = {
    filters: {
      slug,
    },
    populate: {
      contentSections: true,
    },
    locale: 'all',
  }
  url.search = qs.stringify(query, { encode: false })

  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: [`page-${slug}`] },
  })
  const json = await res.json()
  const result = flattenAttributes(json)
  return result.data[0]
}
