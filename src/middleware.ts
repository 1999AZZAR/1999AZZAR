import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  if (host.includes('azzar.netlify.app')) {
    const url = new URL(request.url)
    url.host = 'glassgallery.my.id'
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }

  const { pathname } = request.nextUrl

  if (pathname === '/porto') {
    return NextResponse.rewrite(new URL('/projects', request.url))
  }

  if (pathname.startsWith('/cv')) {
    const url = request.nextUrl.clone()
    const rest = pathname.replace(/^\/cv/, '') || '/'

    if (rest === '/' || rest === '') {
      url.pathname = '/cv/index.html'
    } else if (rest.endsWith('/')) {
      url.pathname = `/cv${rest}index.html`
    } else if (!rest.endsWith('.html')) {
      url.pathname = `/cv${rest}.html`
    } else {
      url.pathname = pathname
    }

    return NextResponse.rewrite(url)
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
