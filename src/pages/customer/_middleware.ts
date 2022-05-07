import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const { origin } = req.nextUrl;
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
  if (!session) return NextResponse.rewrite(`${origin}/login`);

  return NextResponse.next();
}