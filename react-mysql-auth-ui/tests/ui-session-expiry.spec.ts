import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('User is auto-logged out after token expiry', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // confirm session started
  await expect(page.getByText(/Session expires in/i)).toBeVisible();

  // wait for expiry window
  await page.waitForTimeout(65000);

  // ✅ ASSERTION 1: token is gone (this is the REAL guarantee)
  const token = await page.evaluate(() => localStorage.getItem('token'));
  expect(token).toBeNull();

  // ✅ ASSERTION 2: protected content is no longer accessible
  await page.goto('/users');
  await expect(page).toHaveURL(/login/);
});
