# 🏗️ Project Architecture - Descubre Boyacá

## 🎯 About the Project

**Descubre Boyacá** is a platform to find what to do in Boyacá: activities, events and places. It helps people (locals and visitors) plan and discover experiences beyond typical tourist routes.

---

## 📁 Project Structure

```
src/
├── app/                    # Routes and pages (Next.js App Router)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (/)
│
├── components/            # Components using Atomic Design
│   ├── atoms/            # Basic indivisible components
│   │   ├── button.tsx
│   │   └── index.ts
│   ├── molecules/        # Simple combinations of atoms
│   │   ├── card.tsx
│   │   └── index.ts
│   ├── organisms/        # Complex components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── index.ts
│   ├── templates/        # Page structures
│   │   └── index.ts
│   ├── pages/            # Complete page components
│   │   └── index.ts
│   └── index.ts          # Central export
│
├── hooks/                # Custom React Hooks
│   ├── use-media-query.ts
│   ├── use-local-storage.ts
│   ├── use-debounce.ts
│   └── index.ts
│
├── store/                # Global state (Zustand)
│   ├── auth-store.ts
│   ├── ui-store.ts
│   └── index.ts
│
├── services/             # Services and API calls
│   ├── api.service.ts
│   └── index.ts
│
├── assets/               # Static assets (images, icons, fonts)
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   ├── videos/
│   ├── index.ts
│   └── README.md
│
└── styles/               # SCSS styles
    ├── globals.scss
    └── variables.scss
```

---

## ⚛️ Atomic Design

The project uses **Atomic Design** to organize components:

### **Atoms**
Basic and indivisible components. They are the smallest building blocks.

**Examples:**
- `Button` - Basic button
- `Input` - Text field
- `Label` - Text label
- `Icon` - Icons

```typescript
import { Button } from '@/components/atoms';
// or import directly from barrel export
import { Button } from '@/components';
```

### **Molecules**
Simple combinations of atoms that form functional components.

**Examples:**
- `Card` - Card with header, content, footer
- `SearchBar` - Input + Button
- `FormField` - Label + Input + Error message

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/molecules';
// or from barrel export
import { Card, CardHeader, CardTitle, CardContent } from '@/components';
```

### **Organisms**
Complex components formed by molecules and atoms.

**Examples:**
- `Header` - Main navigation
- `Footer` - Page footer
- `Navigation` - Navigation menu
- `EventCard` - Complete event card

```typescript
import { Header, Footer } from '@/components/organisms';
// or from barrel export
import { Header, Footer } from '@/components';
```

### **Templates**
Page structures that define layout by combining organisms.

**Examples:**
- `MainTemplate` - Main template with header and footer
- `DashboardTemplate` - Dashboard template

```typescript
import { MainTemplate } from '@/components/templates';
```

### **Pages**
Specific instances of templates with real content. Complete page components ready to use.

**Examples:**
- `HomePage` - Complete home page
- `EventsPage` - Complete events page

```typescript
import { HomePage } from '@/components/pages';
```

**Note:** In Next.js, pages are also in `app/`, but complex page components can be here for better organization.

---

## 🎯 Key Concepts

### **Path Aliases**

The project uses path aliases for clean imports:

```typescript
// ❌ Avoid
import { Button } from '../../../components/ui/button';

// ✅ Use
import { Button } from '@/components';
```

**Configured aliases:**
- `@/*` → `./src/*`
- `@/components` → `./src/components`
- `@/hooks` → `./src/hooks`
- `@/store` → `./src/store`
- `@/services` → `./src/services`
- `@/assets` → `./src/assets`
- `@/styles` → `./src/styles`

**Importing components:**
```typescript
// Import from specific category
import { Button } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { Header } from '@/components/organisms';

// Or import from main barrel export
import { Button, Card, Header } from '@/components';
```

---

## 🗃️ Global State (Zustand)

### **Using Stores**

```typescript
import { useAuthStore } from '@/store';

function MyComponent() {
  // Get state and actions
  const { user, isAuthenticated, login, logout } = useAuthStore();

  // Specific selector (better performance)
  const user = useAuthStore(state => state.user);

  return (
    <div>
      {isAuthenticated ? `Hello ${user.name}` : 'Not authenticated'}
    </div>
  );
}
```

### **Available stores:**

1. **`useAuthStore`** - Authentication
   - State: `user`, `isAuthenticated`
   - Actions: `login()`, `logout()`

2. **`useUIStore`** - UI State
   - State: `sidebarOpen`
   - Actions: `toggleSidebar()`

---

## 🪝 Custom Hooks

### **useMediaQuery**
Detects media queries reactively.

```typescript
import { useMediaQuery } from '@/hooks';

const isMobile = useMediaQuery('(max-width: 768px)');
const isDesktop = useMediaQuery('(min-width: 1024px)');
```

### **useLocalStorage**
Syncs state with localStorage.

```typescript
import { useLocalStorage } from '@/hooks';

const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### **useDebounce**
Applies debounce to values (useful for searches).

```typescript
import { useDebounce } from '@/hooks';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);
```

---

## 🎨 Component Usage Examples

### **Atoms - Button**

```typescript
import { Button } from '@/components';

<Button onClick={handleClick}>
  Click me
</Button>
```

### **Molecules - Card**

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content
  </CardContent>
</Card>
```

### **Organisms - Header and Footer**

```typescript
import { Header, Footer } from '@/components';

<>
  <Header />
  <main>Content</main>
  <Footer />
</>
```

---

## 🎨 Styles with SCSS

The project uses SCSS (Sass) for styles:

```scss
// src/styles/variables.scss
$primary: #3b82f6;
$spacing-md: 1rem;

// src/styles/globals.scss
@import './variables';

.button {
  color: $primary;
  padding: $spacing-md;
}
```

**Main files:**
- `globals.scss` - Application global styles
- `variables.scss` - Variables for colors, spacing, breakpoints

---

## 📦 Assets

Static resources of the project organized by type.

```
assets/
├── images/    # Images (.jpg, .png, .webp)
├── icons/     # Icons (.svg, .ico)
├── fonts/     # Custom fonts
└── videos/    # Videos
```

### **Using Assets**

```typescript
// Import from index.ts (recommended)
import { LogoImage, IconHome } from '@/assets';

// Or import directly
import LogoImage from '@/assets/images/logo.png';

// Use with Next.js Image
import Image from 'next/image';
import HeroImage from '@/assets/images/hero.webp';

<Image src={HeroImage} alt="Hero" width={1200} height={600} />
```

**Difference with `/public`:**
- **`/src/assets`** → Assets imported in components
- **`/public`** → Assets with direct public URL (favicon, robots.txt)

---

## 📋 Code Conventions

### **Files**
- Components: PascalCase (`Button.tsx`, `UserCard.tsx`)
- Hooks: camelCase with 'use' prefix (`useAuth.ts`)
- Stores: kebab-case with '-store' suffix (`auth-store.ts`)
- Utilities: kebab-case (`format-date.ts`)

### **Exports**
- Use `index.ts` files for clean exports
- Export types along with components

```typescript
// components/atoms/index.ts
export { Button } from './button';
export type { ButtonProps } from './button';
```

### **Components**
- Use TypeScript with explicit types
- Document with JSDoc
- Props interface with 'Props' suffix

```typescript
/**
 * Component description
 */
export interface ButtonProps {
  onClick?: () => void;
}

export function Button({ onClick }: ButtonProps) {
  // ...
}
```

---

## 🚀 Next Steps

### **Future structure to add:**

```
src/
├── lib/                  # Utilities and helpers
│   ├── utils/
│   ├── constants/
│   └── helpers/
│
├── types/               # TypeScript types
│   └── models/
│
└── actions/             # Server Actions
```

---

## 📚 Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [Sass/SCSS](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)
