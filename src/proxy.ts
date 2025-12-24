/**
 * Next.js Proxy (formerly Middleware)
 *
 * 🎓 LESSON: What is Proxy?
 *
 * Proxy runs BEFORE every request reaches your pages.
 * It's the perfect place to check authentication.
 *
 * Flow:
 * 1. User requests /dashboard
 * 2. Proxy runs first
 * 3. Proxy checks: is user authenticated?
 * 4. If no → redirect to /login
 * 5. If yes → continue to /dashboard
 *
 * This runs on the EDGE (Vercel) or Node.js server.
 * It's very fast because it runs before rendering.
 *
 * Note: Renamed from middleware.ts in Next.js 16+
 */

import { NextResponse } from 'next/server';
import { auth } from '@/auth';

/**
 * Routes that require authentication
 */
const protectedRoutes = ['/dashboard', '/profile', '/settings'];

/**
 * Routes that should redirect to home if already authenticated
 */
const authRoutes = ['/login', '/register'];

export default auth((request) => {
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth;

  /**
   * 🎓 LESSON: Route Protection Logic
   *
   * 1. Protected route + not logged in → redirect to login
   * 2. Auth route + logged in → redirect to home (don't show login to logged users)
   * 3. Otherwise → continue
   */

  const isProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => nextUrl.pathname.startsWith(route));

  // Not logged in trying to access protected route
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', nextUrl.origin);
    // Save where they wanted to go (for redirect after login)
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Logged in trying to access auth routes (login/register)
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/', nextUrl.origin));
  }

  // Continue to the requested page
  return NextResponse.next();
});

/**
 * 🎓 LESSON: Matcher Config
 *
 * Defines which routes the proxy runs on.
 * We exclude static files and API routes (except auth).
 *
 * Without this, proxy would run on EVERY request
 * including images, CSS, etc. (wasteful).
 */
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
