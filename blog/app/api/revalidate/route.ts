import { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { event, model, entry } = data

    if (model === 'post') {
      revalidateTag('posts')
      if (event === 'entry.update') {
        revalidateTag('posts')
        revalidateTag(`post-${entry.slug}}`)
      }
    }
    if (model === 'tag') {
      revalidateTag('tags')
      revalidateTag('posts')
    }
    if (model === 'author') {
      revalidateTag('authors')
    }
    if (model === 'page') {
      revalidateTag(`page-${entry.slug}`)
    }

    if (model === 'global') {
      revalidateTag('global')
    }
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    })
  }

  return new Response('Success!', {
    status: 200,
  })
}
