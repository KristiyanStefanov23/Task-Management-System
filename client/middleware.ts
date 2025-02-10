import { NextRequest, NextResponse } from 'next/server'

const authRoutes = ['/register', '/login']

const checkTokenAndRedirectToLogin = (req: NextRequest) => {
	if (!req.cookies.get('refresh-token'))
		return NextResponse.redirect(new URL('/login', req.url))
}

const checkTokenAndForbidFurtherAuthentication = (req: NextRequest) => {
	if (req.cookies.get('refresh-token'))
		return NextResponse.redirect(new URL('/dashboard', req.url))
}

export async function middleware(req: NextRequest) {
	if (req.url.includes('/api')) return NextResponse.next()

	const { pathname } = new URL(req.nextUrl)

	if (!authRoutes.some((path) => pathname.startsWith(path)))
		return checkTokenAndRedirectToLogin(req)

	return checkTokenAndForbidFurtherAuthentication(req)
}

export const config = { matcher: '/((?!.*\\.).*)' }
