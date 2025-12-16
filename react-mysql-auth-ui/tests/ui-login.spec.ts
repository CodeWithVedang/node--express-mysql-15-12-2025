import { test, expect } from '@playwright/test';

test('Login success redirects to dashboard', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('/');
  await expect(page.getByText('Welcome to Dashboard')).toBeVisible();

  const token = await page.evaluate(() => localStorage.getItem('token'));
  expect(token).toBeTruthy();
});

test('Invalid login shows error toast', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Username').fill('wrong');
  await page.getByPlaceholder('Password').fill('wrong');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid login')).toBeVisible();
});
