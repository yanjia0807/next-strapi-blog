import Link from 'next/link'

const Tag = ({ slug, text, className, count }: any) => {
  return (
    <Link
      href={`/posts?page=1&tagSlug=${slug}`}
      className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
    >
      {text.split(' ').join('-')}
      {count && <span className="text-sm font-semibold uppercase">{` (${count})`}</span>}
    </Link>
  )
}

export default Tag
