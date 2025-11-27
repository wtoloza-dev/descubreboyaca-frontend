# 🏗️ Arquitectura del Proyecto - Descubre Boyacá

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Rutas y páginas (Next.js App Router)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (/)
│   └── globals.css        # Estilos globales
│
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes UI básicos
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── index.ts
│   ├── layout/           # Componentes de layout
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── index.ts
│   └── features/         # Componentes por feature (futuro)
│
├── hooks/                # Custom React Hooks
│   ├── use-media-query.ts
│   ├── use-local-storage.ts
│   ├── use-debounce.ts
│   └── index.ts
│
└── store/                # Estado global (Zustand)
    ├── auth-store.ts
    ├── ui-store.ts
    └── index.ts
```

---

## 🎯 Conceptos Clave

### **Path Aliases**

El proyecto usa path aliases para imports limpios:

```typescript
// ❌ Evitar
import { Button } from '../../../components/ui/button';

// ✅ Usar
import { Button } from '@/components/ui';
```

**Aliases configurados:**
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/store/*` → `./src/store/*`

---

## 🗃️ Estado Global (Zustand)

### **Uso de Stores**

```typescript
import { useAuthStore } from '@/store';

function MyComponent() {
  // Obtener estado y acciones
  const { user, isAuthenticated, login, logout } = useAuthStore();

  // Selector específico (mejor performance)
  const user = useAuthStore(state => state.user);

  return (
    <div>
      {isAuthenticated ? `Hola ${user.name}` : 'No autenticado'}
    </div>
  );
}
```

### **Stores disponibles:**

1. **`useAuthStore`** - Autenticación
   - Estado: `user`, `isAuthenticated`, `isLoading`
   - Acciones: `login()`, `logout()`, `setUser()`
   - Persistencia: localStorage

2. **`useUIStore`** - Estado UI
   - Estado: `sidebarOpen`, `theme`, `modalOpen`
   - Acciones: `toggleSidebar()`, `setTheme()`, `openModal()`

---

## 🪝 Custom Hooks

### **useMediaQuery**
Detecta media queries de forma reactiva.

```typescript
import { useMediaQuery } from '@/hooks';

const isMobile = useMediaQuery('(max-width: 768px)');
const isDesktop = useMediaQuery('(min-width: 1024px)');
```

### **useLocalStorage**
Sincroniza estado con localStorage.

```typescript
import { useLocalStorage } from '@/hooks';

const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
```

### **useDebounce**
Aplica debounce a valores (útil para búsquedas).

```typescript
import { useDebounce } from '@/hooks';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);
```

---

## 🎨 Componentes UI

### **Button**

```typescript
import { Button } from '@/components/ui';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>

<Button variant="outline" isLoading={loading}>
  Loading...
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean

### **Card**

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card variant="elevated" padding="md">
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Contenido de la tarjeta
  </CardContent>
</Card>
```

---

## 📱 Componentes de Layout

### **Header**
Navegación principal con autenticación integrada.

```typescript
import { Header } from '@/components/layout';

<Header /> // Muestra automáticamente estado de auth
```

### **Footer**
Pie de página con enlaces y copyright.

```typescript
import { Footer } from '@/components/layout';

<Footer />
```

---

## 📋 Convenciones de Código

### **Archivos**
- Componentes: PascalCase (`Button.tsx`, `UserCard.tsx`)
- Hooks: camelCase con prefijo 'use' (`useAuth.ts`)
- Stores: kebab-case con sufijo '-store' (`auth-store.ts`)
- Utilities: kebab-case (`format-date.ts`)

### **Exportaciones**
- Usar archivos `index.ts` para exportaciones limpias
- Exportar tipos junto con componentes

```typescript
// components/ui/index.ts
export { Button } from './button';
export type { ButtonProps } from './button';
```

### **Componentes**
- Usar TypeScript con tipos explícitos
- Documentar con JSDoc
- Props interface con sufijo 'Props'

```typescript
/**
 * Descripción del componente
 */
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ variant, onClick }: ButtonProps) {
  // ...
}
```

---

## 🚀 Próximos Pasos

### **Estructura futura a agregar:**

```
src/
├── lib/                  # Utilidades y helpers
│   ├── utils/
│   ├── constants/
│   └── helpers/
│
├── services/            # API calls
│   └── api/
│
├── types/               # TypeScript types
│   └── models/
│
└── actions/             # Server Actions
```

---

## 📚 Recursos

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

