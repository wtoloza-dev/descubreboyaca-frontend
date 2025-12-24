/**
 * Login View
 *
 * Main login page view component.
 * Handles user authentication with email and password.
 *
 * 🎓 LESSON: Auth.js Integration
 *
 * Previously used Zustand store for auth.
 * Now uses Auth.js signIn() function.
 *
 * signIn() handles:
 * - Calling the authorize() function in auth.ts
 * - Setting the httpOnly cookie
 * - Redirecting after success
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { SocialLogin } from './components/SocialLogin';
import './styles.scss';

/**
 * Login View Component
 *
 * Manages login state and orchestrates child components.
 */
export const LoginView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for loading and error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get callback URL from query params (set by proxy when redirecting)
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  /**
   * Handle form submission
   *
   * 🎓 LESSON: signIn() function
   *
   * signIn('credentials', { ... }) calls our Credentials provider.
   * - redirect: false → Don't auto-redirect, we handle it
   * - Returns { ok, error } so we can show errors
   *
   * @param email - User's email
   * @param password - User's password
   */
  const handleSubmit = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false, // Don't redirect automatically
      });

      if (result?.error) {
        // Auth failed
        setError('Email o contraseña incorrectos');
        setIsLoading(false);
        return;
      }

      // Success! Redirect to callback URL or home
      router.push(callbackUrl);
      router.refresh(); // Refresh to update session state
    } catch {
      setError('Error al iniciar sesión. Intenta de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-view">
      <div className="login-view__card">
        {/* Header */}
        <div className="login-view__header">
          <h1 className="login-view__title">Bienvenido</h1>
          <p className="login-view__subtitle">Inicia sesión en Descubre Boyacá</p>
        </div>

        {/* Login Form */}
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />

        {/* Social Login Options */}
        <SocialLogin />

        {/* Footer */}
        <div className="login-view__footer">
          <p className="login-view__footer-text">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="login-view__register-link">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
