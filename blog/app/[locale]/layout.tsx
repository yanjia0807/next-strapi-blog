import 'css/tailwind.css'

import { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import TranslationsProvider from '@/components/translations-provider'
import { ThemeProviders } from '@/components/theme-providers'
import { KBarSearchProvider } from '@/components/kbar-search-provider'
import { dir } from 'i18next'
import TwSizeIndicator from '@/components/tw-size-indicator'
import SectionContainer from '@/components/section-container'
import { queryGlobalConfigData, queryI18nConfig, queryI18nResources } from '@/lib/strapi/global'
import { queryStrapiMedia } from '@/lib/strapi/utils'
import 'moment/locale/zh-cn'
import 'moment/locale/ja'

export async function generateStaticParams() {
  const { locales } = await queryI18nConfig()
  return locales.map((locale) => ({
    locale,
  }))
}

export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  const {
    url: siteUrl,
    title,
    description,
    author,
    repository,
    shareImages,
    keywords,
  } = await queryGlobalConfigData(locale)
  const images = shareImages.data.map((item) => ({
    url: queryStrapiMedia(item.url),
  }))
  const keywordsList = keywords.split(',')
  const metadata = {
    metadataBase: new URL(siteUrl),
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    authors: [
      {
        name: author,
        url: repository,
      },
    ],
    robots: 'index, follow',
    alternates: {
      canonical: siteUrl,
      languages: {
        [locale]: `${locale}`,
      },
      types: {
        'application/rss+xml': `${siteUrl}/${locale}/feed.xml`,
      },
    },
    openGraph: {
      type: 'website',
      url: siteUrl,
      title,
      description,
      siteName: title,
      images,
    },
    keywords: keywordsList,
  }
  return metadata
}

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export default async function RootLayout({
  children,
  modal,
  params: { locale },
}: {
  children: React.ReactNode
  modal: React.ReactNode
  params: any
}) {
  const ns = ['common']
  const { locales, defaultLocale } = await queryI18nConfig()
  const resources = await queryI18nResources(locale, ns)

  const {
    title,
    navbar: { links: navLinks },
    socialbar: { links: socialLinks },
    logo,
    author,
    repository,
  } = await queryGlobalConfigData(locale)
  const logoUrl = queryStrapiMedia(logo.url)
  const headerData = {
    title,
    navLinks,
    logoUrl,
    locales,
    defaultLocale,
  }

  const footerData = {
    author,
    repository,
    socialLinks,
  }

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950  dark:text-white">
        <ThemeProviders>
          <TwSizeIndicator />
          <TranslationsProvider
            locale={locale}
            ns={ns}
            locales={locales}
            defaultLocale={defaultLocale}
            resources={resources}
          >
            <KBarSearchProvider locale={locale}>
              <SectionContainer>
                <div className="flex h-screen flex-col justify-between font-sans">
                  <Header data={headerData} />
                  <main className="mb-auto">{children}</main>
                  <Footer data={footerData} />
                </div>
                {modal}
              </SectionContainer>
            </KBarSearchProvider>
          </TranslationsProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
