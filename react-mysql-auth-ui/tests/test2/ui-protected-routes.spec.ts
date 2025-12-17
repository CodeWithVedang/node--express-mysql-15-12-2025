import { test, expect } from '@playwright/test';

test('Unauthenticated user redirected to login', async ({ page }) => {
  await page.goto('/users');
  await expect(page).toHaveURL(/login/);
});
