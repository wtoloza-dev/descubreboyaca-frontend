/**
 * Home Page
 * 
 * Página principal de Descubre Boyacá.
 * Demuestra el uso de componentes, hooks y stores.
 */

'use client';

import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useAuthStore } from '@/store';
import { useMediaQuery } from '@/hooks';

export default function Home() {
  const { isAuthenticated, user, login } = useAuthStore();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleDemoLogin = async () => {
    try {
      await login('demo@descubreboyaca.com', 'password');
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Bienvenido a{' '}
            <span className="text-blue-600">Descubre Boyacá</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Tu guía completa para explorar los mejores destinos, eventos y
            gastronomía de Boyacá.
          </p>

          {/* Estado de autenticación */}
          <div className="mt-8">
            {isAuthenticated && user ? (
              <div className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Sesión iniciada como {user.name}
              </div>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleDemoLogin}
              >
                Iniciar Sesión Demo
              </Button>
            )}
          </div>

          {/* Indicador responsive */}
          <p className="mt-4 text-sm text-gray-500">
            Dispositivo: {isMobile ? '📱 Móvil' : '💻 Desktop'}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card variant="elevated" padding="md">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <span className="text-2xl">🏞️</span>
              </div>
              <CardTitle>Destinos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Descubre paisajes increíbles, pueblos coloniales y lugares
                históricos.
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Explorar
              </Button>
            </CardContent>
          </Card>

          <Card variant="elevated" padding="md">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                <span className="text-2xl">🎉</span>
              </div>
              <CardTitle>Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Festivales, ferias y eventos culturales durante todo el año.
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Ver Eventos
              </Button>
            </CardContent>
          </Card>

          <Card variant="elevated" padding="md">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900">
                <span className="text-2xl">🍽️</span>
              </div>
              <CardTitle>Gastronomía</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Saborea la deliciosa comida típica boyacense.
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Ver Platos
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Demo Section */}
        <div className="mt-16 rounded-lg bg-blue-50 p-8 dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            🏗️ Arquitectura Implementada
          </h2>
          <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>✅ <strong>Zustand</strong> para estado global (auth, UI)</p>
            <p>✅ <strong>Custom Hooks</strong> (useMediaQuery, useLocalStorage, useDebounce)</p>
            <p>✅ <strong>Componentes UI</strong> reutilizables (Button, Card)</p>
            <p>✅ <strong>Layout Components</strong> (Header, Footer)</p>
            <p>✅ <strong>Path Aliases</strong> configurados (@/components, @/hooks, @/store)</p>
            <p>✅ <strong>TypeScript</strong> con tipos estrictos</p>
          </div>
          <div className="mt-6">
            <Button variant="secondary" size="sm">
              Ver Documentación →
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
