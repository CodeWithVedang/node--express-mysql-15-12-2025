import { test, expect } from '@playwright/test';

test('Admin can add user', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Welcome to Dashboard')).toBeVisible();

  await page.getByRole('link', { name: 'Users' }).click();
  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();

  // Open Add User modal
  await page.getByRole('button', { name: 'Add User' }).click();

  // ✅ Scope everything to the modal
  const modal = page.getByRole('dialog', { name: 'Add New User' });

  await modal.getByPlaceholder('Username').fill('pw_test2');
  await modal.getByPlaceholder('Password').fill('test123');
  await modal.getByPlaceholder('Name', { exact: true }).fill('PW User');
  await modal.getByPlaceholder('Role (admin/user)').fill('user');

  await modal.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('PW User')).toBeVisible();
});
