# 🏞️ Descubre Boyacá - Frontend

Platform to find things to do in Boyacá: activities, events and places.

Helps people plan and discover experiences in Boyacá, beyond typical tourist routes.

Built with **Next.js 16**, **React 19**, **TypeScript**, **SCSS** and **Zustand**.

---

## 💡 Concept

**Descubre Boyacá** is a platform to find what to do in Boyacá:
- **Activities** - What you can do in different places
- **Events** - What's happening and when
- **Places** - Where to go beyond the obvious

Not just for tourists, also for locals who want to discover more of their region.

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 20+
- npm or yarn

### **Installation**

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/              # Routes and pages (Next.js App Router)
├── components/       # Components with Atomic Design
│   ├── atoms/       # Basic components (Button, Input)
│   ├── molecules/   # Simple combinations (Card, SearchBar)
│   ├── organisms/   # Complex components (Header, Footer)
│   ├── templates/   # Page structures
│   └── pages/       # Complete page components
├── hooks/           # Custom React Hooks
├── store/           # Global state (Zustand)
├── services/        # Services and API calls
├── assets/          # Static assets (images, icons, fonts)
└── styles/          # SCSS styles
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

---

## 🎨 Technologies

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styles**: [SCSS (Sass)](https://sass-lang.com/) + [Tailwind CSS 4](https://tailwindcss.com/)
- **State**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Lint**: ESLint

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Development server

# Production
npm run build        # Build for production
npm run start        # Run production build

# Code quality
npm run lint         # Run ESLint
```

---

## 📦 Implemented Architecture

### ✅ **Atomic Design**
Components organized following Atomic Design methodology:
- **Atoms** → Basic components (Button, Input)
- **Molecules** → Simple combinations (Card, SearchBar)
- **Organisms** → Complex components (Header, Footer)
- **Templates** → Page structures
- **Pages** → Complete page components

### ✅ **Path Aliases**
```typescript
import { Button } from '@/components';      // Barrel export
import { Button } from '@/components/atoms'; // Specific
import { useAuthStore } from '@/store';
import { useDebounce } from '@/hooks';
```

### ✅ **Global State (Zustand)**
- `useAuthStore` - Authentication
- `useUIStore` - UI State

### ✅ **Custom Hooks**
- `useMediaQuery` - Reactive media queries
- `useLocalStorage` - localStorage persistence
- `useDebounce` - Value debouncing

### ✅ **SCSS Styles**
- Global variables (colors, spacing, breakpoints)
- Global styles with Sass

### ✅ **Assets**
- Organized folder for images, icons, fonts and videos
- Centralized export for easy importing
- Clear separation between `/assets` (imported) and `/public` (public URL)

---

## 📖 Usage Guide

### **Creating a New Component**

1. Create file in appropriate folder:
```bash
src/components/atoms/MyComponent.tsx
```

2. Use TypeScript and documentation:
```typescript
/**
 * My Component
 * 
 * Component description
 */

export interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <div onClick={onClick}>
      <h2>{title}</h2>
    </div>
  );
}
```

3. Export from index:
```typescript
// src/components/atoms/index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

### **Creating a Custom Hook**

```typescript
// src/hooks/useCustomHook.ts
'use client';

import { useState } from 'react';

export function useCustomHook() {
  const [value, setValue] = useState('');
  
  // Your logic here
  
  return { value, setValue };
}
```

### **Creating a Store (Zustand)**

```typescript
// src/store/my-store.ts
import { create } from 'zustand';

interface MyState {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

---

## 🎯 Upcoming Features

- [ ] Activities and places catalog
- [ ] Events calendar
- [ ] Search and filter system
- [ ] Backend API integration
- [ ] Interactive map
- [ ] Planning system
- [ ] User profiles

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Project Architecture](./ARCHITECTURE.md)

---

## 👨‍💻 Development

### **Code Conventions**
- Components: PascalCase (`Button.tsx`)
- Hooks: camelCase with 'use' prefix (`useAuth.ts`)
- Stores: kebab-case with '-store' suffix (`auth-store.ts`)
- Use strict TypeScript
- Document with JSDoc

### **Import Structure**
```typescript
// 1. External imports
import { useState } from 'react';
import Link from 'next/link';

// 2. Internal imports (with path aliases)
import { Button } from '@/components';
import { useAuth } from '@/hooks';

// 3. Relative imports
import './styles.css';
```

---

## 📄 License

MIT

---

## 🤝 Contributing

Contributions are welcome. Please:
1. Fork the project
2. Create a branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
