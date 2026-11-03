import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware({
  ...routing,
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  // Serve the default-language homepage at the bare domain without a browser
  // redirect. This also keeps the existing /bg and other language URLs intact.
  if (request.nextUrl.pathname === '/') {
    const destination = request.nextUrl.clone();
    destination.pathname = `/${routing.defaultLocale}`;

    const response = NextResponse.rewrite(destination);
    response.headers.set('x-next-intl-locale', routing.defaultLocale);
    response.cookies.set('NEXT_LOCALE', routing.defaultLocale, {
      path: '/',
      sameSite: 'lax'
    });
    return response;
  }

  return handleI18nRouting(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
