// middleware.ts
import { chain } from '@/middlewares/chain'
import { withI18nMiddleware } from '@/middlewares/withI18nMiddleware'
import { withPostSlugMiddleware } from '@/middlewares/withPostSlugMiddleware'

export default chain([withI18nMiddleware, withPostSlugMiddleware])

export const config = {
  // Do not run the middleware on the following paths
  matcher: '/((?!lib|api|static|.*\\..*|_next).*)',
}
