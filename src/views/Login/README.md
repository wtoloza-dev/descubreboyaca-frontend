# Login View

Complete login view with form, social authentication, and error handling.

## 📁 Structure

```
views/Login/
├── index.tsx                  ← Main view component (orchestrator)
├── styles.scss                ← View-level styles (layout, card)
└── components/
    ├── LoginForm/
    │   ├── index.tsx          ← Email/password form
    │   └── styles.scss        ← Form-specific styles
    └── SocialLogin/
        ├── index.tsx          ← Social auth buttons
        └── styles.scss        ← Social login styles
```

## 🎯 Architecture: Views vs Pages vs Components

### **app/** (Routing Layer)
```typescript
// app/login/page.tsx
// ONLY handles routing
import { LoginView } from '@/views/Login';

export default function LoginPage() {
  return <LoginView />;
}
```

**Responsibility:**
- ✅ Route definition (`/login`)
- ✅ Next.js metadata (SEO, head tags)
- ✅ Layout composition
- ❌ NO business logic
- ❌ NO state management
- ❌ NO components

---

### **views/** (Business Logic Layer)
```typescript
// views/Login/index.tsx
// Contains state, logic, orchestration
export const LoginView = () => {
  const { login } = useAuthStore();
  
  const handleSubmit = async (email, password) => {
    // Business logic here
  };
  
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      <SocialLogin />
    </div>
  );
};
```

**Responsibility:**
- ✅ Business logic
- ✅ State management (hooks, stores)
- ✅ API calls orchestration
- ✅ View-specific components
- ✅ Layout composition
- ❌ NOT shared across app

---

### **views/Login/components/** (View-Specific Components)
```typescript
// views/Login/components/LoginForm/index.tsx
// Used ONLY in Login view
export const LoginForm = ({ onSubmit, isLoading, error }) => {
  const [email, setEmail] = useState('');
  // ...
};
```

**Responsibility:**
- ✅ Used ONLY in this view
- ✅ View-specific logic
- ✅ Not reusable elsewhere
- ❌ NOT in src/components/

---

### **src/components/** (Shared Atomic Design)
```typescript
// src/components/atoms/Button/
// Reusable across entire app
export const Button = ({ children, variant, ...props }) => {
  return <button className={`btn btn--${variant}`} {...props}>
    {children}
  </button>;
};
```

**Responsibility:**
- ✅ Shared across app
- ✅ Generic/reusable
- ✅ Atomic design (atoms, molecules, organisms)
- ✅ Design system components
- ❌ NO view-specific logic

---

## 🤔 Why This Architecture?

### Problem: Mixing Concerns
```typescript
// ❌ BAD: Everything in page.tsx
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  
  // 200 lines of logic here...
  
  return (
    <div>
      {/* 300 lines of JSX here... */}
    </div>
  );
}
```

**Problems:**
- ❌ Hard to test (need Next.js router)
- ❌ Can't reuse (tied to route)
- ❌ Mixed responsibilities
- ❌ Large files

### Solution: Separation

```typescript
// ✅ GOOD: app/login/page.tsx (Routing)
export default function LoginPage() {
  return <LoginView />;
}

// ✅ GOOD: views/Login/index.tsx (Logic)
export const LoginView = () => {
  // All logic here
  return <LoginForm />;
};

// ✅ GOOD: views/Login/components/LoginForm (UI)
export const LoginForm = ({ onSubmit }) => {
  // Form logic
  return <form>...</form>;
};
```

**Benefits:**
- ✅ Easy to test (no routing needed)
- ✅ Reusable (could show in modal)
- ✅ Clear responsibilities
- ✅ Small, focused files

---

## 📚 Component Hierarchy

```
Page (app/login/page.tsx)
  └─ LoginView (views/Login/index.tsx)         ← Orchestrates
      ├─ LoginForm (views/Login/components/)   ← View-specific
      │   └─ Input (src/components/atoms/)     ← Shared (future)
      └─ SocialLogin (views/Login/components/) ← View-specific
          └─ Button (src/components/atoms/)    ← Shared (future)
```

---

## 🎓 When to Put Component Where?

### Decision Tree

```
Is this component used in multiple views?
├─ YES → Put in src/components/ (Atomic Design)
│        Examples: Button, Input, Card, Modal
│
└─ NO → Is it specific to one view?
         ├─ YES → Put in views/[ViewName]/components/
         │        Examples: LoginForm, SocialLogin
         │
         └─ NO → Is it orchestrating multiple components?
                  └─ YES → Put in views/[ViewName]/index.tsx
                           Examples: LoginView, DashboardView
```

### Examples

| Component | Location | Why? |
|-----------|----------|------|
| `LoginForm` | `views/Login/components/` | Only used in Login |
| `SocialLogin` | `views/Login/components/` | Only used in Login |
| `Button` | `src/components/atoms/` | Used everywhere |
| `Input` | `src/components/atoms/` | Used everywhere |
| `LoginView` | `views/Login/index.tsx` | Orchestrates login |
| `Modal` | `src/components/molecules/` | Used in many places |

---

## 🔄 Data Flow

```
1. User fills form
   └─ LoginForm (local state: email, password)

2. User submits
   └─ LoginForm calls onSubmit(email, password)
       └─ LoginView receives event

3. LoginView orchestrates
   └─ Calls useAuthStore().login(email, password)
       └─ Store calls login operation from services/auth
           └─ API call to backend

4. On success
   └─ Store updates global state
       └─ All components re-render
           └─ LoginView redirects to home
```

---

## 🎨 Styling Architecture

### View Styles (styles.scss)
- Container layout
- Card styling
- General spacing

### Component Styles (components/*/styles.scss)
- Component-specific styles
- Not shared across app
- Scoped to component

### Global Styles (src/styles/)
- Design tokens (colors, spacing)
- Typography
- Utilities

---

## ✅ Best Practices

### DO ✅

```typescript
// views/Login/index.tsx
export const LoginView = () => {
  // ✅ State management
  const { login } = useAuthStore();
  
  // ✅ Event handlers
  const handleSubmit = async (email, password) => {
    await login(email, password);
  };
  
  // ✅ Composition
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};
```

### DON'T ❌

```typescript
// app/login/page.tsx
export default function LoginPage() {
  // ❌ DON'T put state in pages
  const [email, setEmail] = useState('');
  
  // ❌ DON'T put logic in pages
  const handleSubmit = () => { ... };
  
  // ❌ DON'T inline components in pages
  return <div><form>...</form></div>;
}
```

---

## 🧪 Testing Strategy

### Test View
```typescript
// views/Login/__tests__/LoginView.test.tsx
import { render, screen } from '@testing-library/react';
import { LoginView } from '../index';

test('renders login form', () => {
  render(<LoginView />);
  expect(screen.getByText('Bienvenido')).toBeInTheDocument();
});
```

### Test Components
```typescript
// views/Login/components/LoginForm/__tests__/LoginForm.test.tsx
test('submits form with email and password', async () => {
  const onSubmit = jest.fn();
  render(<LoginForm onSubmit={onSubmit} />);
  
  // Fill and submit
  // Assert onSubmit called with correct data
});
```

---

## 🚀 Summary

| Layer | Location | Purpose | Example |
|-------|----------|---------|---------|
| **Routing** | `app/` | Route definition | `app/login/page.tsx` |
| **Views** | `views/` | Business logic | `views/Login/index.tsx` |
| **View Components** | `views/*/components/` | View-specific UI | `views/Login/components/LoginForm/` |
| **Shared Components** | `src/components/` | Reusable UI | `src/components/atoms/Button/` |
| **Services** | `src/services/` | API calls | `services/auth/operations/` |
| **Stores** | `src/store/` | Global state | `store/auth-store.ts` |

**Key Principle:** Each layer has ONE clear responsibility! 🎯

---

Ready to test? Start the dev server and navigate to `/login`! 🚀

