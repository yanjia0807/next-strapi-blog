import Link from 'next/link'
import Tag from './Tag'
import MotionList from './MotionList'
import MotionItem from './MotionItem'
import Pagination from './Pagination'
import { formatDate } from '@/lib/utils'
import { createTranslation } from '@/lib/i18n'

async function PostList({ posts, locale, pagination }: any) {
  const { t } = await createTranslation(locale, ['common'])

  return (
    <div className="flex-1">
      <MotionList>
        {!posts.length && t('no_results')}
        {posts.map(async (post) => {
          const { slug, publishedAt, title, description, tags } = post

          return (
            <MotionItem key={slug} className="py-5">
              <article className="flex flex-col space-y-2 xl:space-y-0">
                <dl>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={publishedAt}>{formatDate(publishedAt, locale)}</time>
                  </dd>
                </dl>
                <div className="space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link href={`/posts/${slug}`} className="text-gray-900 dark:text-gray-100">
                        {title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.data.map((tag) => (
                        <Tag
                          key={tag.slug}
                          slug={tag.slug}
                          text={tag.name}
                          className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        />
                      ))}
                    </div>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words break-all text-gray-500 dark:text-gray-400">
                    {description}
                  </pre>
                </div>
              </article>
            </MotionItem>
          )
        })}
      </MotionList>
      {pagination.total > 0 && <Pagination pagination={pagination} className="py-6" />}
    </div>
  )
}

export default PostList
