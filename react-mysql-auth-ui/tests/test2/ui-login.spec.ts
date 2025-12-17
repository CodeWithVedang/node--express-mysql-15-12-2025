import { test, expect } from '@playwright/test';

test('Login success redirects to dashboard', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Welcome to Dashboard')).toBeVisible();
});
