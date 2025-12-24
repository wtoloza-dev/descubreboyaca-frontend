# End-to-End Tests

Real browser tests with Playwright.

## What to test here

- **Critical user journeys** - Login, registration, checkout
- **Navigation** - Routes, redirects, deep links
- **Real API integration** - Against staging/test environment
- **Cross-browser compatibility** - Chrome, Firefox, Safari

## Characteristics

- Tests the real application in a real browser
- Slowest but highest confidence
- Should cover business-critical paths

## Example

```typescript
// tests/e2e/restaurants.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Restaurants Page', () => {
  test('displays list of restaurants', async ({ page }) => {
    await page.goto('/restaurants');

    await expect(page.locator('h1')).toContainText('Restaurants');
    await expect(page.locator('.restaurants__card')).toHaveCount.greaterThan(0);
  });

  test('filters restaurants by city', async ({ page }) => {
    await page.goto('/restaurants');

    await page.selectOption('#city-select', 'Tunja');

    await expect(page).toHaveURL(/city=Tunja/);
    // All visible restaurants should be from Tunja
  });

  test('navigates to restaurant detail', async ({ page }) => {
    await page.goto('/restaurants');

    await page.locator('.restaurants__card').first().click();

    await expect(page).toHaveURL(/\/restaurants\/[a-zA-Z0-9]+/);
    await expect(page.locator('.restaurant-detail__title')).toBeVisible();
  });
});
```

## Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI (debug mode)
npm run test:e2e:ui

# Run specific test file
npx playwright test restaurants.spec.ts
```

## Tools

- **Playwright** - Browser automation (recommended over Cypress/Selenium)

