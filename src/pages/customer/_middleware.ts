import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl

  const session = await getToken({ req, secret: process.env.JWT_SECRET})
  if (!session) return NextResponse.rewrite(`${origin}/login`)

  return NextResponse.next()
}