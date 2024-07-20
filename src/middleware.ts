// ./src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/prismicio';

const staticDirectories = ['/images', '/sounds', '/api'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow all requests to the public folder to pass through unmodified
  const isStaticAssetRequest = staticDirectories.some(dir => pathname.startsWith(dir));
  if (isStaticAssetRequest) {
    return NextResponse.next();
  }

  const client = createClient();
  const repository = await client.getRepository();

  const locales = repository.languages.map((lang: {id: string}) => lang.id);
  const defaultLocale = locales[0];

  const pathnameIsMissingLocale = locales.every(
    (locale : string) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect to default locale if there is no supported locale prefix
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
	// Don’t change the URL of Next.js assets starting with _next
  matcher: ['/((?!_next).*)'],
};