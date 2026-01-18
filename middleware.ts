import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host');

  // 1. Redirect www to non-www
  if (host && host.startsWith('www.')) {
    const nonWwwHost = host.slice(4);
    const newUrl = new URL(request.url);
    newUrl.host = nonWwwHost;
    return NextResponse.redirect(newUrl.toString(), 301);
  }

  // 2. Redirect http to https (Next.js/Vercel handles this mostly, but good for local/other environments)
  const xForwardedProto = request.headers.get('x-forwarded-proto');
  if (xForwardedProto === 'http' && process.env.NODE_ENV === 'production') {
    const newUrl = new URL(request.url);
    newUrl.protocol = 'https:';
    return NextResponse.redirect(newUrl.toString(), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
