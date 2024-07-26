import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

function Navbar({ navLinks, locale }) {
  const pathname = usePathname()
  const currentLocation =
    pathname.split('/')[1] === locale ? pathname.split('/')[2] || '' : pathname.split('/')[1]

  return (
    <>
      {navLinks.map((navLink) => {
        const navItemUrl = navLink.url.split('?')[0].split('/')[1]
        const actived = currentLocation === navItemUrl

        return (
          <Link
            key={navLink.url}
            href={`/${locale}${navLink.url}`}
            className="flex transform-gpu items-center space-x-1 transition-transform duration-300"
          >
            <div
              className={`hidden font-medium ${
                actived
                  ? 'text-heading-500'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              } relative rounded-md px-2 py-1 font-medium transition-colors sm:block`}
            >
              <span className="relative z-10">{navLink.text}</span>
              {actived && (
                <motion.span
                  layoutId="tab"
                  transition={{ type: 'spring', duration: 0.4 }}
                  className="absolute inset-0 z-0 rounded-md bg-gray-100 dark:bg-gray-600"
                ></motion.span>
              )}
            </div>
          </Link>
        )
      })}
    </>
  )
}

export default Navbar
