import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle legacy /porto path if needed, but since we have the page it will work.
  // This middleware ensures SEO and legacy links stay healthy.
  if (pathname === '/porto') {
    return NextResponse.rewrite(new URL('/projects', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/porto'],
}
