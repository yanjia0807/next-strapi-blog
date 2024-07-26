import qs from 'qs'
import { flattenAttributes, getStrapiURL, setHeaders } from './utils'

const baseUrl = getStrapiURL()

export async function queryPostsSlug() {
  const path = '/api/posts'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = { fields: ['slug', 'publishedAt', 'updatedAt'] }
  url.search = qs.stringify(query, { encode: false })
  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['posts'] },
  })
  const json = await res.json()
  const result = flattenAttributes(json)
  return result
}

export async function queryPosts(pagination, locale) {
  const path = '/api/posts'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = {
    sort: ['publishedAt:desc'],
    pagination,
    populate: {
      authors: {
        fields: ['name'],
      },
      tags: {
        populate: true,
      },
    },
    locale,
  }
  url.search = qs.stringify(query, { encode: false })

  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['posts'] },
  })

  const json = await res.json()
  const result = flattenAttributes(json)
  return result
}

export async function queryAllPosts(locale) {
  const path = '/api/posts'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = {
    sort: ['publishedAt:desc'],
    fields: ['id', 'title', 'slug', 'description', 'publishedAt'],
    populate: {
      authors: {
        fields: ['name', 'slug'],
      },
      tags: {
        fields: ['name', 'slug'],
      },
    },
    locale,
  }
  url.search = qs.stringify(query, { encode: false })

  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['posts'] },
  })

  const json = await res.json()
  const result = flattenAttributes(json)
  return result
}

export async function queryPostsInTag(pagination, locale, tagSlug) {
  const path = '/api/posts'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = {
    sort: ['publishedAt:desc'],
    pagination,
    filters: {
      tags: {
        slug: {
          $contains: tagSlug,
        },
      },
    },
    populate: {
      authors: {
        fields: ['name'],
      },
      tags: {
        populate: true,
      },
    },
    locale,
  }
  url.search = qs.stringify(query, { encode: false })

  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['posts'] },
  })

  const json = await res.json()
  const result = flattenAttributes(json)
  return result
}

export async function queryPostFeatures(locale, pagination) {
  const path = '/api/posts'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = {
    sort: ['publishedAt:desc'],
    filters: {
      featured: true,
    },
    populate: {
      authors: {
        fields: ['name'],
      },
      tags: {
        populate: true,
      },
      cover: {
        populate: true,
      },
    },
    locale,
    pagination,
  }
  url.search = qs.stringify(query, { encode: false })

  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['posts'] },
  })
  const json = await res.json()
  const result = flattenAttributes(json)
  return result
}

export async function queryPostBySlug(slug) {
  const path = '/api/posts'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const query = {
    filters: { slug },
    populate: {
      authors: {
        populate: {
          avatar: true,
          blocks: true,
        },
      },
      cover: true,
      blocks: true,
      tags: true,
      localizations: {
        fields: ['locale', 'slug'],
      },
    },
    locale: 'all',
  }
  url.search = qs.stringify(query, { encode: false })
  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: [`post-${slug}`] },
  })
  const json = await res.json()
  const result = flattenAttributes(json)
  return result.data[0]
}

export async function queryPreviousPost(post) {
  const path = '/api/posts'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const { slug, publishedAt, locale } = post
  const query = {
    sort: ['publishedAt:desc'],
    pagination: { start: 1, limit: 1 },
    filters: {
      publishedAt: {
        $lt: publishedAt,
      },
    },
    fields: ['slug', 'title'],
    locale,
  }
  url.search = qs.stringify(query, { encode: false })
  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['posts'] },
  })
  const json = await res.json()
  const result = flattenAttributes(json)
  return result.data[0] || null
}

export async function queryNextPost(post) {
  const path = '/api/posts'
  const headers = setHeaders()
  const url = new URL(path, baseUrl)
  const { slug, publishedAt, locale } = post
  const query = {
    sort: ['publishedAt:asc'],
    pagination: { start: 1, limit: 1 },
    filters: {
      publishedAt: {
        $gt: publishedAt,
      },
    },
    fields: ['slug', 'title'],
    locale,
  }
  url.search = qs.stringify(query, { encode: false })
  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['posts'] },
  })
  const json = await res.json()
  const result = flattenAttributes(json)
  return result.data[0] || null
}
