import Link from 'next/link'
import { createTranslation } from '@/lib/i18n'

async function TagSidebar({ tags, tag, locale, className }) {
  const { t } = await createTranslation(locale, ['common'])

  return (
    <div>
      <div className={className}>
        <div className="px-6 py-4">
          {tag ? (
            <Link
              href={`/posts?page=1`}
              className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
            >
              {t('tagnav_title')}
            </Link>
          ) : (
            <h3 className="font-bold uppercase text-primary-500">{t('tagnav_title')}</h3>
          )}
          <ul>
            {tags.map((t) => (
              <li key={t.slug} className="my-3">
                {tag && tag.slug === t.slug ? (
                  <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                    {`${t.name}`}
                  </h3>
                ) : (
                  <Link
                    href={`/posts?page=1&tagSlug=${t.slug}`}
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                  >
                    {`${t.name}`}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TagSidebar
