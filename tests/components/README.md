# Component Tests

Isolated component tests using Testing Library.

## What to test here

- **Component rendering** - Does it render with given props?
- **User interactions** - Click, type, select
- **Conditional rendering** - Loading states, error states
- **Accessibility** - ARIA roles, labels

## Characteristics

- Test behavior, not implementation
- Query by role/label (like a user would)
- No snapshot tests

## Example

```typescript
// tests/components/atoms/button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/atoms/button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<Button loading>Click me</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## Tools

- **Vitest** - Test runner
- **@testing-library/react** - Component rendering
- **@testing-library/user-event** - User interaction simulation

