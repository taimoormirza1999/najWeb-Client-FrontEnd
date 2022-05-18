import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { signIn } from 'next-auth/react';

export async function middleware(req) {
  const { origin } = req.nextUrl;
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
  if (!session) return NextResponse.rewrite(`${origin}/login`);
  if (session?.error === 'RefreshAccessTokenError') {
    signIn(); // Force sign in to refresh token
  }

  return NextResponse.next();
}
