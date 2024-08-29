'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface PaginationProps {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

function Pagination({
  pagination: { page, pageCount },
  className,
}: {
  pagination: PaginationProps
  className: string
}) {
  const { t } = useTranslation(['common'])
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const prevPage = Number(page) - 1 > 0
  const nextPage = Number(page) + 1 <= pageCount

  const handlePrevClick = (e) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', (prevPage ? Number(page) - 1 : 1).toString())
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleNextClick = (e) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', (nextPage ? Number(page) + 1 : pageCount).toString())
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={className}>
      <nav className="flex flex-1 justify-between">
        <button
          className={
            prevPage
              ? 'cursor-pointer text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
              : 'cursor-auto disabled:opacity-50'
          }
          disabled={!prevPage}
          onClick={handlePrevClick}
        >
          {t('prev_page')}
        </button>

        <span>
          {page}/{pageCount}
        </span>

        <button
          className={
            nextPage
              ? 'cursor-pointer text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
              : 'cursor-auto disabled:opacity-50'
          }
          disabled={!nextPage}
          onClick={handleNextClick}
        >
          {t('next_page')}
        </button>
      </nav>
    </div>
  )
}

export default Pagination
