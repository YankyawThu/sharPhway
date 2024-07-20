import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
    const secret = process.env.NEXTAUTH_SECRET
    const authUser = await getToken({ req, secret })
    const url = req.nextUrl.clone()

    // Authentication
    if (!authUser && !url.pathname.startsWith('/auth')) {
        url.pathname = '/auth/signin'
        return NextResponse.redirect(url)
    }

    // Authorization for admin
    if (authUser?.role != 'admin' && url.pathname.startsWith('/admin')) {
        url.pathname = '/403'
        return NextResponse.redirect(url)
    }

    // Authorization for user
    if (authUser?.role != 'user' && url.pathname.startsWith('/user')) {
        url.pathname = '/403'
        return NextResponse.redirect(url)
    }
    
    // req.headers.set('Authorization', `Bearer ${token}`)
    return NextResponse.next()
}

// Allow the starting with these path
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/'],
}