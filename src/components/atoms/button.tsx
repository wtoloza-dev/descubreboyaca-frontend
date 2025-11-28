/**
 * Button Component (Atom)
 * 
 * Reusable basic button component.
 */

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * Reusable basic button
 * 
 * @example
 * <Button onClick={handleClick}>Click me</Button>
 */
export function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props}>
      {children}
    </button>
  );
}

