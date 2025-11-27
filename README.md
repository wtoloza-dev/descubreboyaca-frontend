# 🏞️ Descubre Boyacá - Frontend

Plataforma web para explorar destinos, eventos y gastronomía de Boyacá, Colombia.

Construido con **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS** y **Zustand**.

---

## 🚀 Inicio Rápido

### **Prerrequisitos**
- Node.js 20+
- npm o yarn

### **Instalación**

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del Proyecto

```
src/
├── app/              # Rutas y páginas (Next.js App Router)
├── components/       # Componentes reutilizables
│   ├── ui/          # Componentes UI básicos (Button, Card)
│   └── layout/      # Header, Footer
├── hooks/           # Custom React Hooks
├── store/           # Estado global (Zustand)
└── ...
```

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para documentación detallada.

---

## 🎨 Tecnologías

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Estado**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Lint**: ESLint

---

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Producción
npm run build        # Compilar para producción
npm run start        # Ejecutar build de producción

# Calidad de código
npm run lint         # Ejecutar ESLint
```

---

## 📦 Características Implementadas

### ✅ **Arquitectura Moderna**
- Estructura de carpetas escalable
- Separación clara de responsabilidades (components, hooks, store)
- Path aliases configurados (`@/components`, `@/hooks`, `@/store`)

### ✅ **Estado Global (Zustand)**
```typescript
import { useAuthStore } from '@/store';

const { user, login, logout } = useAuthStore();
```

Stores disponibles:
- `useAuthStore` - Autenticación (con persistencia)
- `useUIStore` - Estado de UI (sidebar, modales, tema)

### ✅ **Custom Hooks**
```typescript
import { useMediaQuery, useLocalStorage, useDebounce } from '@/hooks';

const isMobile = useMediaQuery('(max-width: 768px)');
const [theme, setTheme] = useLocalStorage('theme', 'light');
const debouncedSearch = useDebounce(searchTerm, 500);
```

### ✅ **Componentes UI Reutilizables**
```typescript
import { Button, Card } from '@/components/ui';

<Button variant="primary" size="md">Click</Button>
<Card variant="elevated" padding="md">...</Card>
```

### ✅ **Layout Components**
- `Header` - Navegación con autenticación
- `Footer` - Pie de página con enlaces

---

## 📖 Guía de Uso

### **Crear un Nuevo Componente**

1. Crear el archivo en la carpeta apropiada:
```bash
src/components/features/MiComponente.tsx
```

2. Usar TypeScript y documentación:
```typescript
/**
 * Mi Componente
 * 
 * Descripción del componente
 */

export interface MiComponenteProps {
  title: string;
  onClick?: () => void;
}

export function MiComponente({ title, onClick }: MiComponenteProps) {
  return (
    <div onClick={onClick}>
      <h2>{title}</h2>
    </div>
  );
}
```

3. Exportar desde el index:
```typescript
// src/components/features/index.ts
export { MiComponente } from './MiComponente';
export type { MiComponenteProps } from './MiComponente';
```

### **Crear un Custom Hook**

```typescript
// src/hooks/useCustomHook.ts
'use client';

import { useState, useEffect } from 'react';

export function useCustomHook() {
  const [value, setValue] = useState('');
  
  // Tu lógica aquí
  
  return { value, setValue };
}
```

### **Crear un Store (Zustand)**

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

## 🎯 Próximas Features

- [ ] Sistema de rutas para destinos
- [ ] Integración con API backend
- [ ] Galería de imágenes
- [ ] Mapa interactivo
- [ ] Sistema de búsqueda
- [ ] Filtros avanzados
- [ ] Modo oscuro automático

---

## 📚 Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Zustand](https://zustand-demo.pmnd.rs/)
- [Documentación de Tailwind](https://tailwindcss.com/docs)
- [Arquitectura del Proyecto](./ARCHITECTURE.md)

---

## 👨‍💻 Desarrollo

### **Convenciones de Código**
- Componentes: PascalCase (`Button.tsx`)
- Hooks: camelCase con prefijo 'use' (`useAuth.ts`)
- Stores: kebab-case con sufijo '-store' (`auth-store.ts`)
- Usar TypeScript estricto
- Documentar con JSDoc

### **Estructura de Imports**
```typescript
// 1. Imports externos
import { useState } from 'react';
import Link from 'next/link';

// 2. Imports internos (con path aliases)
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';

// 3. Imports relativos
import './styles.css';
```

---

## 📄 Licencia

MIT

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
