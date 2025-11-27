/**
 * Header Component
 * 
 * Componente de encabezado principal de la aplicación.
 */

'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store';

/**
 * Header principal del sitio
 */
export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-blue-600">
              Descubre Boyacá
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex lg:gap-x-8">
          <Link
            href="/destinos"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 dark:text-gray-100"
          >
            Destinos
          </Link>
          <Link
            href="/eventos"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 dark:text-gray-100"
          >
            Eventos
          </Link>
          <Link
            href="/gastronomia"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 dark:text-gray-100"
          >
            Gastronomía
          </Link>
        </div>

        {/* Auth Section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {isAuthenticated && user ? (
            <>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Hola, {user.name}
              </span>
              <button
                onClick={logout}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 dark:text-gray-100"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 dark:text-gray-100"
            >
              Iniciar sesión <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

