import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import type { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'resqme-secret-key';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;

    // Protect dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        try {
            verify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/', request.url));
            console.log(error);
        }
    }

    // Check for mobile devices
    const userAgent = request.headers.get('user-agent') || '';
    const isMobile = /Mobile|Android|iPhone/i.test(userAgent);

    if (isMobile && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/desktop-only', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*']
}