import Link from 'next/link'
import SocialIcon from '@/components/social-icons'

export default function Footer({ data }) {
  const { author, repository, socialLinks } = data
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          {socialLinks.map(({ kind, url }) => (
            <SocialIcon key={url} kind={kind} href={url} size={6} />
          ))}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href={repository} target="_blank">
            {author}
          </Link>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog" target="_blank">
            tailwind-nextjs-starter-blog
          </Link>
        </div>
      </div>
    </footer>
  )
}
