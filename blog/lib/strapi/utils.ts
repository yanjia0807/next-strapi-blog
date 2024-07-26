export function getStrapiURL() {
  return process.env.STRAPI_URL
}

export function getStrapiPublicToken() {
  return process.env.STRAPI_PUBLIC_TOKEN
}

export function setHeaders() {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${getStrapiPublicToken()}`)
  return headers
}

export function queryStrapiMedia(url: string) {
  if (url.startsWith('data:')) return url
  if (url.startsWith('http') || url.startsWith('//')) return url
  return `${getStrapiURL()}${url}`
}

export function flattenAttributes(data: any): any {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== 'object' ||
    data === null ||
    data instanceof Date ||
    typeof data === 'function'
  ) {
    return data
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item))
  }

  // Initialize an object with an index signature for the flattened structure
  const flattened: { [key: string]: any } = {}

  // Iterate over each key in the object
  for (const key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if (
      (key === 'attributes' || key === 'data') &&
      typeof data[key] === 'object' &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenAttributes(data[key]))
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(data[key])
    }
  }

  return flattened
}

export function mapSlugsWithLocales(
  localizations: any[],
  { currentLocalization }: { currentLocalization: Record<string, string> }
) {
  return localizations.reduce((acc: Record<string, string>, { locale, slug }) => {
    acc[locale] = slug
    return acc
  }, currentLocalization)
}
