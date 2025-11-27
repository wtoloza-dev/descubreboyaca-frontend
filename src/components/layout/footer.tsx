/**
 * Footer Component
 * 
 * Componente de pie de página de la aplicación.
 */

import Link from 'next/link';

/**
 * Footer principal del sitio
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sobre Nosotros */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Sobre Nosotros
            </h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Descubre Boyacá es tu guía para explorar los mejores destinos,
              eventos y gastronomía de Boyacá.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Explorar
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/destinos"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400"
                >
                  Destinos
                </Link>
              </li>
              <li>
                <Link
                  href="/eventos"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400"
                >
                  Eventos
                </Link>
              </li>
              <li>
                <Link
                  href="/gastronomia"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400"
                >
                  Gastronomía
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/privacidad"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400"
                >
                  Términos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-gray-600 dark:text-gray-400">
                Email: info@descubreboyaca.com
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                Tel: +57 123 456 7890
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Descubre Boyacá. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

