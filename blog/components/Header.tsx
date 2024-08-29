'use client'

import Link from 'next/link'
import Navbar from './navbar'
import MobileNav from './mobile-nav'
import ThemeSwitch from './theme-switch'
import LangSwitch from './lang-switch'
import SearchButton from './search-button'
import Logo from '@/components/logo'
import { useParams } from 'next/navigation'

const Header = ({ data }) => {
  const { locale } = useParams()
  const { title, navLinks, logoUrl, locales, defaultLocale } = data

  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href={`/${locale}/`}>
          <div className="flex items-center justify-between">
            <Logo src={logoUrl} />
            <div className="hidden text-2xl font-semibold xl:block">{title}</div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-none sm:space-x-6">
        <Navbar navLinks={navLinks} locale={locale} />
        <SearchButton />
        <ThemeSwitch />
        <LangSwitch locales={locales} defaultLocale={defaultLocale} />
        <MobileNav navLinks={navLinks} locale={locale} />
      </div>
    </header>
  )
}

export default Header
