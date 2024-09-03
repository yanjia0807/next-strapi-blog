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
        <h1 className="text-3xl font-bold uppercase tracking-tight text-gray-900 dark:text-gray-100 sm:hidden">
          {tag ? tag.name : t('tagnav_title')}
        </h1>
      </div>
      <div className="flex sm:space-x-24">
        <TagSidebar tags={tags} tag={tag} locale={locale} />
        <PostList posts={posts} pagination={pagination} locale={locale} />
      </div>
    </div>
  )
}
