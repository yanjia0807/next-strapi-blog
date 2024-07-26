import FeatureCard from '@/components/FeatureCard'
import DisplaySection from '@/components/DisplaySection'

function FeaturesLayout({ locale, displaySection, posts, pagination }) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {displaySection && <DisplaySection content={displaySection} />}
      <div className="container py-12">
        <FeatureCard pagination={pagination} posts={posts} locale={locale} />
      </div>
    </div>
  )
}

export default FeaturesLayout
