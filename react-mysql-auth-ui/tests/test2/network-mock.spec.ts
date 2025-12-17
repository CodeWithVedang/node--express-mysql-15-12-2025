import { test, expect } from '@playwright/test';

test('Mock users API response', async ({ page }) => {
  await page.route('**/users*', route => {
    route.fulfill({
      json: {
        data: [
          { id: 1, name: 'Mock User', role: 'user', status: 'active' }
        ],
        totalPages: 1
      }
    });
  });

  await page.goto('/login');
  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'Users' }).click();

  await expect(page.getByText('Mock User')).toBeVisible();
});
