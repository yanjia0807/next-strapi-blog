'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation.js'
import { KBarProvider } from 'kbar'
import { KBarModal } from './kbar-modal'
import { queryAllPosts } from '@/lib/strapi/post'

export function KBarSearchProvider({ children, locale }) {
  const router = useRouter()
  const [searchActions, setSearchActions] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    function mapPosts(posts) {
      return posts.map((post) => ({
        id: post.id,
        name: post.title,
        keywords: post.description || '',
        section: 'Content',
        subtitle: post.publishedAt,
        perform: () => router.push(`/${locale}/posts/${post.slug}`),
      }))
    }

    async function fetchData() {
      const { data } = await queryAllPosts(locale)
      const actions = mapPosts(data)
      setSearchActions(actions)
      setDataLoaded(true)
    }

    if (!dataLoaded) {
      fetchData()
    } else {
      setDataLoaded(true)
    }
  }, [dataLoaded, router, locale])

  return (
    <KBarProvider>
      <KBarModal actions={searchActions} isLoading={!dataLoaded}></KBarModal>
      {children}
    </KBarProvider>
  )
}
