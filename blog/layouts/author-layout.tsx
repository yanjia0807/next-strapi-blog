import Image from '@/components/image'
import DisplaySection from '@/components/display-section'
import MotionSection from '@/components/motion-section'
import { createTranslation } from '@/lib/i18n'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function AuthorLayout({ children, content, locale }: any) {
  const { name, avatar, mobile, weixin, email, description, displaySection } = content
  const { t } = await createTranslation(locale, ['common'])

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <DisplaySection content={displaySection} />
      <MotionSection className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col space-x-2 pt-8">
          <div className="mb-2 flex flex-row items-center gap-2">
            {avatar && (
              <Avatar>
                <AvatarImage src={avatar} />
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>
            )}
            <p>{description}</p>
          </div>
          <div className="flex h-4 flex-wrap items-center justify-start gap-2 font-bold text-gray-500 dark:text-gray-400">
            {email && (
              <>
                <div>{t('email')}:</div>
                <div>{email}</div>
                <Separator orientation="vertical" />
              </>
            )}
            {email && (
              <>
                <div>{t('mobile')}:</div>
                <div>{mobile}</div>
                <Separator orientation="vertical" />
              </>
            )}
            {email && (
              <>
                <div>{t('wechat')}:</div>
                <div>{weixin}</div>
                <Separator orientation="vertical" />
              </>
            )}
          </div>
        </div>
        <div className="prose max-w-none py-8 dark:prose-invert xl:col-span-2">{children}</div>
      </MotionSection>
    </div>
  )
}
