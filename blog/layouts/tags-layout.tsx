import { createTranslation } from '@/lib/i18n'
import Tag from '@/components/tag'
import MotionSection from '@/components/motion-section'

const variants = {
  hidden: { opacity: 0, x: 0, y: -25 },
  enter: { opacity: 1, x: 0, y: 0 },
}

async function TagsLayout({ locale, tags }) {
  const { t } = await createTranslation(locale, ['common'])

  return (
    <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
      <div className="space-x-2 py-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
          {t('tags')}
        </h1>
      </div>
      <MotionSection className="flex w-full max-w-lg flex-wrap">
        {tags.length === 0 && t('not_found')}
        {tags.map(({ slug, name, count }) => {
          return (
            <div key={slug} className="mb-2 mr-5 mt-2">
              <Tag key={slug} slug={slug} text={name} count={count} />
            </div>
          )
        })}
      </MotionSection>
    </div>
  )
}

export default TagsLayout
