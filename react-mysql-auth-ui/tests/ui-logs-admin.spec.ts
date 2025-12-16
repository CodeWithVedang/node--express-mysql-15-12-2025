import { test, expect } from '@playwright/test';

test('Admin can view login logs', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // ✅ wait for sidebar link (means role === admin)
  await expect(page.getByText('Login Logs')).toBeVisible();

  // now navigate
  await page.getByText('Login Logs').click();

  await expect(
    page.getByRole('heading', { name: 'Login Logs' })
  ).toBeVisible();

  await expect(page.locator('table')).toBeVisible();
});
