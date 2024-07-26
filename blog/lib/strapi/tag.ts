import qs from 'qs'
import { flattenAttributes, getStrapiURL, setHeaders } from './utils'

const baseUrl = getStrapiURL()
export async function queryTags(locale) {
  const path = '/api/tags'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = {
    populate: {
      posts: {
        count: true,
      },
    },
    locale,
  }
  url.search = qs.stringify(query, { encode: false })
  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['tags'] },
  })
  const json = await res.json()
  const { data } = flattenAttributes(json)

  const tags = data
    .map(({ name, slug, posts: { count } }) => ({
      name,
      slug,
      count,
    }))
    .sort((item1, item2) => item2.count - item1.count)

  return tags
}

export async function queryTagBySlug(slug) {
  const path = '/api/tags'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = { filters: { slug }, locale: 'all' }
  url.search = qs.stringify(query, { encode: false })
  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: [`tag-${slug}`] },
  })
  const json = await res.json()
  const result = flattenAttributes(json)
  return result.data[0]
}
