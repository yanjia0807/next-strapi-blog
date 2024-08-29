import { createTranslation } from '@/lib/i18n'
import { PaginationProps } from '@/components/pagination'
import TagSidebar from '@/components/tag-sidebar'
import PostList from '@/components/post-list'

interface ListLayoutWithTagsProps {
  tags: any[]
  tag: any
  posts: any[]
  pagination?: PaginationProps
  locale: string
}

export default async function ListLayoutWithTags({
  tags,
  tag,
  posts,
  pagination,
  locale,
}: ListLayoutWithTagsProps) {
  const { t } = await createTranslation(locale, ['common'])

  return (
    <div>
      <div className="pb-6 pt-6">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {tag ? tag.name : t('tagnav_title')}
        </h1>
      </div>
      <div className="flex sm:space-x-24">
        <TagSidebar
          tags={tags}
          tag={tag}
          locale={locale}
          className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-6 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex"
        />
        <PostList posts={posts} pagination={pagination} locale={locale} />
      </div>
    </div>
  )
}
