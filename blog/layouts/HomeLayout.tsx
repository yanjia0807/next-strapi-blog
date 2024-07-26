import Link from 'next/link'
import { createTranslation } from '@/lib/i18n'
import DisplaySection from '@/components/DisplaySection'
import PostList from '@/components/PostList'

export default async function HomeLayout({ posts, contentSections, locale }) {
  const { t } = await createTranslation(locale, ['common'])

  const displaySection = contentSections.find(
    (section) => section['__component'] === 'shared.display-section'
  )

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <DisplaySection content={displaySection} />
        <PostList posts={posts} locale={locale} pagination={false} />
      </div>
      <div className="flex justify-end text-base font-medium leading-6">
        <Link
          href="/posts?page=1"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
          {`${t('all_posts')} →`}
        </Link>
      </div>
    </>
  )
}
