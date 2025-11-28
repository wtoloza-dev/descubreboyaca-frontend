/**
 * Global Error Handler
 * 
 * Catches and handles errors that occur in any page.
 * Must be a Client Component.
 */

'use client'

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console (could be sent to error tracking service)
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          ¡Oops! Algo salió mal
        </h2>
        <p className="text-gray-600 mb-6">
          Lo sentimos, ha ocurrido un error inesperado. Por favor intenta de nuevo.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}

