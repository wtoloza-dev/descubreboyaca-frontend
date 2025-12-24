/**
 * Session Provider
 *
 * 🎓 LESSON: Client-side Session Access
 *
 * Server Components can use auth() directly.
 * Client Components need a Provider to access session.
 *
 * This wraps next-auth's SessionProvider for the app.
 */

'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}

