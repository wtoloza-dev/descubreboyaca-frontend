/**
 * Card Component (Molecule)
 *
 * Reusable card component for displaying content.
 * It's a molecule because it's composed of multiple elements (Header, Title, Content, Footer).
 */

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
}

/**
 * Basic card for grouping content
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>Content</CardContent>
 * </Card>
 */
export function Card({ children }: CardProps) {
  return <div>{children}</div>;
}

/**
 * Helper components for Card
 */
export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3>{children}</h3>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
