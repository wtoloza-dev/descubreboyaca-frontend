/**
 * Login Form Component
 *
 * Form component specific to the Login view.
 * Handles email and password input with validation.
 *
 * Why in views/Login/components/?
 * - ONLY used in Login view
 * - Not reusable across the app
 * - Contains login-specific logic
 * - If another view needs a form, it gets its own
 */

'use client';

import { useState, FormEvent } from 'react';
import './styles.scss';

interface LoginFormProps {
  /** Callback when form is submitted */
  onSubmit: (email: string, password: string) => Promise<void>;
  /** Whether login operation is in progress */
  isLoading: boolean;
  /** Error message to display */
  error: string | null;
}

/**
 * Login Form Component
 *
 * Renders email and password inputs with submit button.
 * Manages local form state and validation.
 *
 * @param props - Component props
 * @returns JSX.Element - Login form
 */
export const LoginForm = ({ onSubmit, isLoading, error }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Handle form submission
   *
   * @param e - Form event
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {/* Error Alert */}
      {error && (
        <div className="login-form__error" role="alert">
          <svg
            className="login-form__error-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Email Input */}
      <div className="login-form__field">
        <label htmlFor="email" className="login-form__label">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="tu@email.com"
          className="login-form__input"
          disabled={isLoading}
        />
      </div>

      {/* Password Input */}
      <div className="login-form__field">
        <label htmlFor="password" className="login-form__label">
          Contraseña
        </label>
        <div className="login-form__password-wrapper">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="login-form__input"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="login-form__toggle-password"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            disabled={isLoading}
          >
            {showPassword ? (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Forgot Password Link */}
      <div className="login-form__actions">
        <a href="/forgot-password" className="login-form__forgot-link">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isLoading} className="login-form__submit">
        {isLoading ? (
          <>
            <svg className="login-form__spinner" viewBox="0 0 24 24">
              <circle
                className="login-form__spinner-circle"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
            </svg>
            Iniciando sesión...
          </>
        ) : (
          'Iniciar sesión'
        )}
      </button>
    </form>
  );
};
