import Link from 'next/link'
import Image from '@/components/image'
import Pagination from '@/components/pagination'
import MotionList from '@/components/motion-list'
import MotionItem from '@/components/motion-item'
import { queryStrapiMedia } from '@/lib/strapi/utils'
import { createTranslation } from '@/lib/i18n'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'

const FeatureCard = async ({ locale, posts, pagination }) => {
  const { t } = await createTranslation(locale, ['common'])

  return (
    <>
      <MotionList className="-mx-8 flex flex-wrap justify-between">
        {!posts.length && t('no_results')}
        {posts.map((post) => {
          const { title, description, cover } = post
          const img = queryStrapiMedia(cover.url)

          return (
            <MotionItem key={post.slug} className="relative p-4 md:w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words break-all text-gray-500 dark:text-gray-400">
                      {description}
                    </pre>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    alt={title}
                    src={img}
                    className="h-auto w-full object-cover md:h-36 lg:h-48"
                    width={0}
                    height={0}
                    unoptimized={true}
                  />
                </CardContent>
                <CardFooter className="flex-row-reverse">
                  <Link
                    href={`/${locale}/posts/${post.slug}`}
                    className={buttonVariants({ variant: 'outline' })}
                  >
                    {t('read_more')}
                  </Link>
                </CardFooter>
              </Card>
            </MotionItem>
          )
        })}
      </MotionList>
      {pagination.total > 0 && <Pagination pagination={pagination} className="py-6" />}
    </>
  )
}

export default FeatureCard
