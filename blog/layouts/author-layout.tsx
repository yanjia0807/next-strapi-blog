import Image from '@/components/image'
import DisplaySection from '@/components/display-section'
import MotionSection from '@/components/motion-section'
import { createTranslation } from '@/lib/i18n'

export default async function AuthorLayout({ children, content, locale }: any) {
  const { name, avatar, mobile, weixin, email, description, displaySection } = content
  const { t } = await createTranslation(locale, ['common'])

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <DisplaySection content={displaySection} />
      <MotionSection className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center space-x-2 pt-8">
          {avatar && (
            <Image
              src={avatar}
              alt="avatar"
              width={192}
              height={192}
              className="h-48 w-48 rounded-full"
            />
          )}
          <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
          {email && (
            <p className="text-gray-500 dark:text-gray-400">
              <span className="font-bold">{t('email')}: </span>
              {email}
            </p>
          )}
          {mobile && (
            <p className="text-gray-500 dark:text-gray-400">
              <span className="font-bold">{t('mobile')}: </span>
              {mobile}
            </p>
          )}
          {weixin && (
            <p className="text-gray-500 dark:text-gray-400">
              <span className="font-bold">{t('wechat')}: </span>
              {weixin}
            </p>
          )}
        </div>
        <div className="prose max-w-none py-8 dark:prose-invert xl:col-span-2">{children}</div>
      </MotionSection>
    </div>
  )
}
