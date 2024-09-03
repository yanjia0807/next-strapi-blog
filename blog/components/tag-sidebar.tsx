import Link from 'next/link'
import { createTranslation } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

async function TagSidebar({ tags, tag, locale }) {
  const { t } = await createTranslation(locale, ['common'])

  return (
    <Card className="hidden h-full w-1/3 sm:block">
      <CardHeader className="font-bold uppercase">
        <CardTitle>
          {tag ? (
            <Link
              href={`/posts?page=1`}
              className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
            >
              {t('tagnav_title')}
            </Link>
          ) : (
            <h3 className="text-primary-500 dark:text-primary-500">{t('tagnav_title')}</h3>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="font-bold uppercase">
          {tags.map((t) => (
            <li key={t.slug} className="my-3">
              {tag && tag.slug === t.slug ? (
                <h3 className="text-primary-500 dark:text-primary-500">{`${t.name}`}</h3>
              ) : (
                <Link
                  href={`/posts?page=1&tagSlug=${t.slug}`}
                  className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  {`${t.name}`}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default TagSidebar
