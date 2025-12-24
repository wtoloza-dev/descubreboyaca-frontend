# Integration Tests

Tests for flows that span multiple components.

## What to test here

- **Form submissions** - Complete form flow with validation
- **Data fetching** - Component + hook + API mock
- **State management** - Component + Zustand store
- **Navigation flows** - Multiple pages/views interaction

## Characteristics

- Multiple components working together
- May include mocked API responses
- Closer to real user scenarios than component tests

## Example

```typescript
// tests/integration/login-flow.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginView } from '@/views/Login';

// Mock the auth service
vi.mock('@/services/auth', () => ({
  login: vi.fn(),
}));

describe('Login Flow', () => {
  it('shows error message on invalid credentials', async () => {
    const { login } = await import('@/services/auth');
    login.mockRejectedValue(new Error('Invalid credentials'));

    render(<LoginView />);

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpassword');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('redirects on successful login', async () => {
    const { login } = await import('@/services/auth');
    login.mockResolvedValue({ token: 'abc123' });

    render(<LoginView />);

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'correctpassword');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/home');
    });
  });
});
```

## Tools

- **Vitest** - Test runner
- **@testing-library/react** - Component rendering
- **MSW (Mock Service Worker)** - API mocking (optional)

