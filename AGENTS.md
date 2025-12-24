# Agent Instructions

This document provides guidelines for AI agents (Cursor, Copilot, Claude, etc.) working on this codebase.

## Project Overview

**Descubre Boyacá** - A Next.js application for discovering restaurants and attractions in Boyacá, Colombia.

## Technology Stack

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** SCSS with BEM naming convention
- **State Management:** Zustand (client-side)
- **Data Fetching:** SWR (client), native fetch (server)
- **Linting:** ESLint + Biome

## Architecture

### Container/Presentation Pattern

This project follows the **Container/Presentation** pattern:

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **Containers** | `src/app/**/page.tsx` | Data fetching, routing, state coordination |
| **Presentations** | `src/views/` | UI rendering, receives data via props |
| **Components** | `src/components/` | Reusable UI elements (atoms, molecules, organisms) |

#### Server Components (Containers)

- Located in `src/app/**/page.tsx`
- Fetch data on the server using native `fetch`
- Pass data as props to client components
- No `'use client'` directive

```typescript
// src/app/restaurants/page.tsx (Server Component)
export default async function RestaurantsPage() {
  const data = await fetch(url);
  return <RestaurantsView initialData={data} />;
}
```

#### Client Components (Presentations)

- Located in `src/views/`
- Use `'use client'` directive
- Handle user interactions
- Use hooks (useState, useEffect, Zustand, SWR)

```typescript
// src/views/Restaurants/index.tsx (Client Component)
'use client';
export const RestaurantsView = ({ initialData }) => {
  // Interactive logic here
};
```

### File Structure

```
src/
├── app/              # Next.js App Router (containers)
├── views/            # Page-level presentations
├── components/       # Reusable UI components
│   ├── atoms/        # Basic elements (Button, Input)
│   ├── molecules/    # Composite elements (Card, SearchBar)
│   ├── organisms/    # Complex sections (Header, Footer)
│   ├── layouts/      # Layout wrappers
│   └── templates/    # Page templates
├── hooks/            # Custom React hooks
├── providers/        # React context providers
├── services/         # API services and operations
├── store/            # Zustand stores
├── types/            # TypeScript type definitions
├── config/           # Environment configuration
├── assets/           # Static assets
└── styles/           # Global styles
```

## Coding Standards

### Language

- **All code documentation must be in English**
- Comments, docstrings, README files: English
- Variable and function names: English
- UI text and labels: Spanish (user-facing)

### TypeScript

- Use explicit type annotations
- Prefer interfaces over types for object shapes
- Use generics when appropriate
- No `any` type unless absolutely necessary

### Component Guidelines

```typescript
/**
 * Component description.
 */
interface ComponentProps {
  /** Prop description */
  propName: string;
}

export const Component = ({ propName }: ComponentProps) => {
  return <div>{propName}</div>;
};
```

### SCSS / BEM

Follow BEM naming convention:

```scss
.block {
  &__element {
    // Element styles
  }

  &--modifier {
    // Modifier styles
  }
}
```

### Imports

Use the `@/` alias for absolute imports:

```typescript
import { Component } from '@/components';
import { useGET } from '@/hooks';
import { config } from '@/config';
```

## Data Fetching

### Server-Side (Recommended for initial load)

```typescript
// In page.tsx (Server Component)
const data = await fetch(url, {
  next: { revalidate: 60 }, // Cache for 60 seconds
});
```

### Client-Side (For dynamic updates)

```typescript
// In views or components (Client Component)
import { useGET } from '@/hooks';

const { data, loading, error } = useGET<DataType>('/api/endpoint');
```

## Runbooks

Operational procedures are documented in `docs/runbooks/`. When asked to perform maintenance tasks, check for relevant runbooks:

- `docs/runbooks/update-dependencies.md` - Update npm packages

## Best Practices

1. **Keep components small and focused** - Single responsibility principle
2. **Prefer composition over inheritance**
3. **Use semantic HTML elements**
4. **Handle loading and error states**
5. **Write self-documenting code** - Clear names over comments
6. **Don't over-engineer** - Solve the current problem, not hypothetical futures
7. **Reuse existing abstractions** - Check existing code before creating new utilities

## Common Tasks

### Adding a new page

1. Create `src/app/[route]/page.tsx` (Server Component)
2. Create `src/views/[PageName]/index.tsx` (Client Component)
3. Create `src/views/[PageName]/styles.scss` (BEM styles)
4. Add loading state: `src/app/[route]/loading.tsx`

### Adding a new component

1. Determine atomic level (atom/molecule/organism)
2. Create in `src/components/[level]/[component-name].tsx`
3. Export from `src/components/[level]/index.ts`
4. Export from `src/components/index.ts`

### Adding a new API endpoint integration

1. Add types in `src/types/`
2. Use `fetch` in Server Components or `useGET` in Client Components
3. Handle loading/error states in the view

