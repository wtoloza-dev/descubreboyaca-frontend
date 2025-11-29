# Authentication Module

Professional-grade authentication module with granular architecture optimized for maintainability, testing, and AI-assisted development.

## 📁 Structure

```
services/auth/
├── types/
│   └── auth.types.ts          ← All TypeScript interfaces
├── constants/
│   └── auth.constants.ts      ← Configuration, endpoints, messages
├── operations/
│   ├── login.operation.ts     ← Login functionality
│   ├── register.operation.ts  ← User registration
│   ├── token.operation.ts     ← Token refresh & validation
│   └── user.operation.ts      ← User data operations
├── utils/
│   └── token-storage.utils.ts ← localStorage management
└── index.ts                    ← Barrel export (public API)
```

## 🎯 Design Philosophy

### Why "operations/" instead of "services/"?

- ✅ **Clear naming**: Not redundant with parent `services/` folder
- ✅ **Semantic**: Operations are discrete actions (login, register, refresh)
- ✅ **Common pattern**: Used in enterprise architectures (CQRS, Domain-Driven Design)
- ✅ **AI-friendly**: Clear semantic meaning for vector embeddings

### Single Responsibility Principle

Each file has ONE job:

| File | Responsibility |
|------|----------------|
| `login.operation.ts` | ONLY handles login |
| `register.operation.ts` | ONLY handles registration |
| `token.operation.ts` | ONLY handles token operations |
| `user.operation.ts` | ONLY handles user data |
| `token-storage.utils.ts` | ONLY handles localStorage |

**Benefits:**
- Easy to find code ("Where is login?" → `login.operation.ts`)
- Easy to test in isolation
- Easy to extend without breaking other code
- Small files = better AI understanding

## 🚀 Usage

### 1. Login Flow

```typescript
import { login, storeTokens } from '@/services/auth';

try {
  const response = await login('user@example.com', 'password123');
  storeTokens(response.access_token, response.refresh_token);
  console.log('Logged in as:', response.user.email);
} catch (error) {
  console.error('Login failed:', error.message);
}
```

### 2. Get Current User

```typescript
import { getCurrentUser, getAccessToken } from '@/services/auth';

const token = getAccessToken();
if (token) {
  const { user } = await getCurrentUser(token);
  console.log('Current user:', user.email);
}
```

### 3. Register New User

```typescript
import { register } from '@/services/auth';

const response = await register(
  'newuser@example.com',
  'SecurePassword123!',
  'John Doe'
);
console.log('User created:', response.user.email);
```

### 4. Refresh Token

```typescript
import { refreshAccessToken, getRefreshToken, storeTokens } from '@/services/auth';

const refreshToken = getRefreshToken();
const { access_token } = await refreshAccessToken(refreshToken!);
storeTokens(access_token, refreshToken!);
```

### 5. Check Token Expiration

```typescript
import { isTokenExpired, getAccessToken } from '@/services/auth';

const token = getAccessToken();
if (token && isTokenExpired(token)) {
  // Need to refresh token
}
```

## 📦 Exports

### Types (TypeScript only, zero runtime cost)

```typescript
import type {
  UserResponse,
  LoginResponse,
  RegisterResponse,
  CurrentUserResponse,
} from '@/services/auth';
```

### Operations (Main functionality)

```typescript
import {
  login,              // Authenticate user
  register,           // Create new account
  getCurrentUser,     // Get user data
  refreshAccessToken, // Refresh token
  parseToken,         // Parse JWT
  isTokenExpired,     // Check expiration
} from '@/services/auth';
```

### Utilities (Helper functions)

```typescript
import {
  storeTokens,     // Save tokens
  getAccessToken,  // Retrieve access token
  getRefreshToken, // Retrieve refresh token
  clearTokens,     // Delete tokens
  hasTokens,       // Check if tokens exist
} from '@/services/auth';
```

### Constants (Configuration)

```typescript
import {
  API_URL,
  AUTH_ENDPOINTS,
  STORAGE_KEYS,
  HTTP_HEADERS,
  AUTH_ERROR_MESSAGES,
} from '@/services/auth';
```

## 🧪 Testing

Each operation can be tested independently:

```typescript
// Mock fetch for testing login
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ access_token: 'token', user: {...} }),
  })
);

const response = await login('test@example.com', 'password');
expect(response.access_token).toBe('token');
```

## 🎓 Key Concepts Demonstrated

### 1. Barrel Exports
- Single import point: `@/services/auth`
- Internal structure can change without breaking imports
- Clean, organized public API

### 2. Separation of Concerns
- **Types**: Data structures
- **Constants**: Configuration
- **Operations**: Business logic
- **Utils**: Helpers

### 3. Functional Programming
- Pure functions (no side effects except API calls)
- Easy to compose and test
- Predictable behavior

### 4. Error Handling
- Consistent error messages
- Network error detection
- User-friendly Spanish messages

### 5. TypeScript Best Practices
- Strict typing
- `export type` for types-only exports
- `as const` for immutable constants
- Comprehensive JSDoc comments

## 🤖 AI-Optimized Architecture

This structure is optimized for AI-assisted development:

### Small, Focused Files
- Each file < 150 lines
- Fits in AI context windows
- Clear, semantic meaning

### Rich Documentation
- JSDoc comments for every function
- Usage examples
- Clear explanations

### Semantic Naming
- `login.operation.ts` clearly indicates purpose
- `token-storage.utils.ts` clearly indicates helpers
- Better for vector embeddings and semantic search

### Predictable Patterns
- Consistent file naming: `*.operation.ts`, `*.utils.ts`
- Consistent function signatures
- AI can predict and suggest code more accurately

## 🔒 Security Considerations

### Current Implementation
- ⚠️ Tokens stored in `localStorage` (vulnerable to XSS)
- ✅ HTTPS required in production
- ✅ Token validation on server
- ✅ Refresh token rotation support

### Production Recommendations
1. **Use httpOnly cookies** instead of localStorage
2. **Implement CSRF protection**
3. **Add rate limiting** on login attempts
4. **Implement token rotation** on refresh
5. **Add security headers** (CSP, etc.)

## 📈 Scaling Strategies

### When to Split Further

Split `token.operation.ts` when you add:
- OAuth providers (Google, Facebook, Apple)
- Two-factor authentication
- Magic link authentication
- Biometric authentication

### Example Future Structure

```
operations/
├── auth/
│   ├── email-password.operation.ts
│   ├── google-oauth.operation.ts
│   ├── two-factor.operation.ts
│   └── magic-link.operation.ts
├── token/
│   ├── refresh.operation.ts
│   ├── validate.operation.ts
│   └── rotate.operation.ts
└── user/
    ├── profile.operation.ts
    ├── preferences.operation.ts
    └── permissions.operation.ts
```

## 🎉 What You Learned

By implementing this structure, you've learned:

1. ✅ **Single Responsibility Principle** - One file, one job
2. ✅ **Separation of Concerns** - Types, logic, utils separated
3. ✅ **Barrel Exports** - Clean public API
4. ✅ **Functional Programming** - Pure, composable functions
5. ✅ **TypeScript Best Practices** - Strict typing, JSDoc
6. ✅ **Error Handling** - Consistent, user-friendly
7. ✅ **AI-Optimized Architecture** - Small files, rich docs
8. ✅ **Professional Organization** - Scalable, maintainable

---

**Next Steps:** What's the next feature you want to build? 🚀

