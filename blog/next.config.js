const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withMDX = require('@next/mdx')()

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withMDX, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      dirs: ['app', 'components', 'layouts', 'scripts', 'lib'],
    },
    images: {
      remotePatterns: [
        {
          hostname: '127.0.0.1',
          port: '1337',
        },
        {
          hostname: '138.3.218.25',
          port: '1337',
        },
        {
          hostname: 'api.wuqinyao.site',
        },
        {
          protocol: 'https',
          hostname: 'placehold.co',
        },
      ],
    },
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
  })
}
