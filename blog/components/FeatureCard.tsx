import Link from 'next/link'
import Image from '@/components/Image'
import Pagination from '@/components/Pagination'
import MotionList from '@/components/MotionList'
import MotionItem from '@/components/MotionItem'
import { queryStrapiMedia } from '@/lib/strapi/utils'
import { createTranslation } from '@/lib/i18n'

const FeatureCard = async ({ locale, posts, pagination }) => {
  const { t } = await createTranslation(locale, ['common'])

  return (
    <>
      <MotionList className="-m-4 flex flex-wrap">
        {!posts.length && t('no_results')}
        {posts.map((post) => {
          const { title, description, cover } = post
          const href = `/posts/${post.slug}`
          const imgSrc = queryStrapiMedia(cover.url)

          return (
            <MotionItem key={post.slug} className="md relative w-full p-4 md:w-1/2">
              <div
                className={`${
                  imgSrc && 'h-full'
                }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
              >
                {imgSrc && (
                  <Link href={href}>
                    <Image
                      alt={title}
                      src={imgSrc}
                      className="h-auto w-full object-cover md:h-36 lg:h-48"
                      width={0}
                      height={0}
                      unoptimized={true}
                    />
                  </Link>
                )}
                <div className="p-6">
                  <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
                    <Link href={href}>{title}</Link>
                  </h2>
                  <pre className=" prose mb-3 overflow-x-hidden text-wrap break-words  text-gray-500 dark:text-gray-400">
                    {description}
                  </pre>
                </div>
              </div>
            </MotionItem>
          )
        })}
      </MotionList>
      {pagination.total > 0 && <Pagination pagination={pagination} className="py-6" />}
    </>
  )
}

export default FeatureCard
