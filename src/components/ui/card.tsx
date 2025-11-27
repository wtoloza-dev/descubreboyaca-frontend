/**
 * Card Component
 * 
 * Componente de tarjeta reutilizable para mostrar contenido.
 */

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Tarjeta reutilizable para agrupar contenido
 * 
 * @example
 * <Card variant="elevated" padding="md">
 *   <h2>Título</h2>
 *   <p>Contenido de la tarjeta</p>
 * </Card>
 */
export function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
}: CardProps) {
  // Estilos base
  const baseStyles = 'rounded-lg bg-white dark:bg-gray-800';

  // Variantes
  const variants = {
    default: 'border border-gray-200 dark:border-gray-700',
    bordered: 'border-2 border-gray-300 dark:border-gray-600',
    elevated: 'shadow-lg',
  };

  // Padding
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const cardClasses = `${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`;

  return <div className={cardClasses}>{children}</div>;
}

/**
 * Componentes auxiliares para la Card
 */
export function CardHeader({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 dark:text-gray-100 ${className}`}>
      {children}
    </h3>
  );
}

export function CardContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-gray-700 dark:text-gray-300 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mt-4 flex items-center justify-end gap-2 ${className}`}>
      {children}
    </div>
  );
}

