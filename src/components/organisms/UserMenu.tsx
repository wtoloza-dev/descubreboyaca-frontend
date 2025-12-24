/**
 * User Menu Component
 *
 * 🎓 LESSON: Using session in Client Component
 *
 * Client Components use useSession() hook.
 * The session is provided by SessionProvider in layout.
 */

'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export function UserMenu() {
  /**
   * 🎓 LESSON: useSession() hook
   *
   * Returns:
   * - data: Session object (null if not logged in)
   * - status: 'loading' | 'authenticated' | 'unauthenticated'
   */
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="user-menu__loading">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <Link href="/login" className="user-menu__login-btn">
        Iniciar sesión
      </Link>
    );
  }

  return (
    <div className="user-menu">
      <span className="user-menu__name">{session?.user?.name}</span>
      <button onClick={() => signOut({ callbackUrl: '/' })} className="user-menu__logout-btn">
        Cerrar sesión
      </button>
    </div>
  );
}
