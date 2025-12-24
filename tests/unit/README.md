# Unit Tests

Unit tests for pure functions, utilities, and hooks.

## What to test here

- **Utility functions** - formatters, validators, parsers
- **Custom hooks** - useDebounce, useLocalStorage
- **Store logic** - Zustand actions and selectors
- **Pure business logic** - calculations, transformations

## Characteristics

- Fast (< 1ms per test)
- No DOM, no network, no side effects
- Input → Output verification

## Example

```typescript
// tests/unit/utils/format-price.test.ts
import { formatPrice } from '@/utils/format-price';

describe('formatPrice', () => {
  it('formats number with currency symbol', () => {
    expect(formatPrice(1000)).toBe('$1,000');
  });

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('$0');
  });

  it('handles decimals', () => {
    expect(formatPrice(99.99)).toBe('$99.99');
  });
});
```

## Tools

- **Vitest** - Test runner (faster than Jest, native ESM)

