# Tests

This directory contains all tests for the application.

## Structure

```
tests/
├── unit/           # Unit tests for pure functions and utilities
├── components/     # Component tests with Testing Library
├── integration/    # Integration tests for flows between components
└── e2e/            # End-to-end tests with Playwright
```

## Philosophy

- **No snapshot tests** - They provide low value and high noise
- **Test behavior, not implementation** - Test what the user sees
- **E2E for critical paths** - Login, filters, navigation
- **Unit for logic** - Formatters, validators, hooks

## Running Tests

```bash
# Unit & Component tests
npm run test

# E2E tests
npm run test:e2e
```

## TODO

- [ ] Configure Vitest for unit/component tests
- [ ] Configure Playwright for E2E tests
- [ ] Add tests for critical user flows

