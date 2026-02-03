import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

const protectedRoutes = ['/dashboard', '/expenses', '/incomes', '/admin'];
const adminRoutes = ['/admin'];
const publicRoutes = ['/login', '/signup', '/api/auth'];

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route)) || path === '/';
    const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));
    const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

    // 1. Decrypt the session token
    const cookie = req.cookies.get('session')?.value;
    const session = cookie ? await verifyToken(cookie) : null;

    // 2. Redirect to /login if not authenticated on a protected route
    if (isProtectedRoute && !session && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // 3. Redirect to /dashboard (or /) if authenticated and verifying login page
    if (isPublicRoute && session && path === '/login') {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    // 4. Check Admin Role for admin routes
    if (isAdminRoute && session?.role !== 'Admin') {
        // Redirect to Access Denied or Dashboard
        // For now, redirect to dashboard with access denied query param? Or a dedicated page.
        return NextResponse.redirect(new URL('/access-denied', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
