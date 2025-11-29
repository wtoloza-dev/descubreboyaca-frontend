/**
 * Login View
 *
 * Main login page view component.
 * Handles user authentication with email and password.
 *
 * Architecture:
 * - This is a VIEW, not a page
 * - Contains logic and state management
 * - Uses view-specific components from ./components/
 * - Rendered by app/login/page.tsx (routing layer)
 */

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { LoginForm } from './components/LoginForm';
import { SocialLogin } from './components/SocialLogin';
import './styles.scss';

/**
 * Login View Component
 *
 * Manages login state and orchestrates child components.
 *
 * @returns JSX.Element - Login view with form and social login options
 */
export const LoginView = () => {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  /**
   * Handle form submission
   *
   * @param email - User's email
   * @param password - User's password
   */
  const handleSubmit = async (email: string, password: string) => {
    clearError();

    try {
      await login(email, password);
      // Redirect to home page on successful login
      router.push('/');
    } catch (error) {
      // Error is handled by the store and displayed in form
      console.error('Login error:', error);
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
