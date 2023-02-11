import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === request.nextUrl.pathname.toLowerCase())
    return NextResponse.next();

  return NextResponse.redirect(
    new URL(request.nextUrl.origin + request.nextUrl.pathname.toLowerCase()),
    301
  );
}
