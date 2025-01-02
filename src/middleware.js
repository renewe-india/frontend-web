import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import axios from '@/lib/axios'

const authPages = [
    '/login',
    '/register',
    '/onboarding',
    '/forgot-password',
    '/password-reset',
    '/verify-email',
]

async function checkUser(headers) {
    try {
        const response = await axios.get('/user', { headers })
        return response.status === 200
    } catch {
        return false
    }
}

export async function middleware(request) {
    const headers = {
        Referer: process.env.NEXT_PUBLIC_FRONTEND_URL,
        Cookie: cookies().toString(),
        'X-XSRF-TOKEN': cookies().get('XSRF-TOKEN')?.value,
    }
    const response = NextResponse.next()
    const pathname = request.nextUrl.pathname
    const lastCheck = cookies().get('last-auth-check')?.value
    const currentTime = Date.now()
    const isAuthPage = authPages.includes(pathname)

    let isAuthenticated = false
    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
    const url = new URL(frontendUrl)
    const domain = url.hostname

    if (!lastCheck || currentTime - lastCheck > 3600000) {
        isAuthenticated = await checkUser(headers)
        if (isAuthenticated) {
            response.cookies.set('last-auth-check', currentTime.toString(), {
                path: '/',
                domain,
                secure: process.env.NODE_ENV === 'production',
                httpOnly: false,
                maxAge: 3600,
            })
            if (isAuthPage) {
                return NextResponse.redirect(new URL('/', request.url))
            }
            return response
        }
        if (!isAuthPage && !isAuthenticated) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    } else {
        isAuthenticated = true
    }

    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return response
}

export const config = {
    matcher: [
        '/addresses',
        '/profile',
        '/contacts',
        '/verifications',
        '/password-update',
        '/signed-in-history',
        '/username-update',
        '/users/:path*',
        '/manage/:path*',
        '/addresses/:path*',
        '/businesses/:path*',
        '/associations/:path*',
        '/search/:path*',
        '/login',
        '/register',
        '/onboarding',
        '/forgot-password',
        '/password-reset',
        '/verify-email',
    ],
}
