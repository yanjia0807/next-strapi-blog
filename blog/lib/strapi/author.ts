import qs from 'qs'
import { flattenAttributes, getStrapiURL, setHeaders } from './utils'

const baseUrl = getStrapiURL()

export async function queryMainAuthor(locale) {
  const path = '/api/authors'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = {
    filters: {
      isDefault: true,
    },
    populate: {
      blocks: {
        populate: true,
      },
      avatar: {
        populate: true,
      },
    },
    locale,
  }
  url.search = qs.stringify(query, { encode: false })
  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['authors'] },
  })
  const json = await res.json()
  const result = flattenAttributes(json)
  return result.data[0]
}
