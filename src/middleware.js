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

    if (!lastCheck || currentTime - lastCheck > 3600000) {
        isAuthenticated = await checkUser(headers)
        if (isAuthenticated) {
            response.cookies.set('last-auth-check', currentTime.toString())
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
