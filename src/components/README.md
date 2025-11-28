# Components - Atomic Design

This folder contains all application components organized following the **Atomic Design** methodology.

## 📚 Structure

```
components/
├── atoms/        # Basic indivisible components
├── molecules/    # Simple combinations of atoms
├── organisms/    # Complex components
├── templates/    # Page structures
├── pages/        # Complete page components
└── index.ts      # Central barrel export
```

---

## ⚛️ Atomic Design Levels

### **1. Atoms**
The most basic building blocks. Components that cannot be divided further.

**Characteristics:**
- Indivisible
- Don't depend on other components
- Highly reusable
- Usually without complex logic

**Examples:**
- `Button` - Basic button
- `Input` - Text field
- `Label` - Label
- `Icon` - Icons
- `Text` - Styled text

**When to create an Atom:**
- It's the simplest possible component
- Used in multiple places
- Doesn't contain other components

---

### **2. Molecules**
Combinations of atoms that form simple functional components.

**Characteristics:**
- Combine 2+ atoms
- Have a specific simple function
- Reusable in different contexts

**Examples:**
- `Card` - Container with header, content, footer
- `SearchBar` - Input + Button
- `FormField` - Label + Input + Error message
- `MenuItem` - Icon + Text

**When to create a Molecule:**
- You need to combine several atoms
- The combination repeats in several places
- Has a clear and specific function

---

### **3. Organisms**
Complex components that combine molecules, atoms and business logic.

**Characteristics:**
- Self-sufficient components
- Can contain business logic
- Form distinct sections of the interface

**Examples:**
- `Header` - Main navigation with logo, menu, search
- `Footer` - Page footer with links and info
- `EventCard` - Complete event card
- `FilterPanel` - Filter panel with multiple controls

**When to create an Organism:**
- It's a complete section of the UI
- Combines multiple molecules/atoms
- Has business logic or state

---

### **4. Templates**
Page structures that define layout without specific content.

**Characteristics:**
- Define the general structure
- Combine organisms in a layout
- Don't contain real data (use props/slots)

**Examples:**
- `MainTemplate` - Header + Main + Footer
- `DashboardTemplate` - Sidebar + Content + TopBar
- `AuthTemplate` - Centered layout for login/registration

**When to create a Template:**
- You need to reuse a page layout
- Multiple pages share the same structure

---

### **5. Pages**
Specific instances of templates with content and real data.

**Characteristics:**
- Complete page components
- Use templates or combine organisms
- Contain specific data and page logic

**Examples:**
- `HomePage` - Complete home page
- `EventsPage` - Events page
- `ActivityDetailPage` - Activity detail

**Note:** In Next.js, main pages are in `app/`, but complex page components can be here for better organization and reusability.

---

## 📦 Importing

### Import from central barrel export (recommended)
```typescript
import { Button, Card, Header } from '@/components';
```

### Import from specific category
```typescript
import { Button } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { Header } from '@/components/organisms';
```

---

## ✍️ Conventions

### Naming
- **Files:** PascalCase (`Button.tsx`, `EventCard.tsx`)
- **Components:** PascalCase (`Button`, `SearchBar`)
- **Props:** PascalCase with `Props` suffix (`ButtonProps`)

### File structure
```typescript
/**
 * Component description
 */

import React from 'react';

// Types
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

// Component
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

### Exports
```typescript
// Export component and types
export { Button } from './button';
export type { ButtonProps } from './button';
```

---

## 🎯 Decision Guide

Not sure where to put a component? Use this guide:

```
Is it a styled basic HTML component?
  → Atom

Does it combine 2-3 atoms for a simple function?
  → Molecule

Is it a complete UI section with logic?
  → Organism

Does it define a page structure without data?
  → Template

Is it a complete page with specific data?
  → Page
```

---

## 📚 Resources

- [Atomic Design by Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
