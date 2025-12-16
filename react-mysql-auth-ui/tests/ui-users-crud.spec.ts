import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('/');
});

test('Create, edit, delete user via UI', async ({ page }) => {
  await page.goto('/users');

  // ➕ Add User
  await page.getByRole('button', { name: 'Add User' }).click();

  const addDialog = page.locator('[role="dialog"]').first();

  await addDialog.locator('input[placeholder="Username"]').fill('pw_user');
  await addDialog.locator('input[placeholder="Password"]').fill('1234');

  // 🔥 target 3rd input explicitly (Name)
  await addDialog.locator('input').nth(2).fill('Playwright User');

  await addDialog.locator('input[placeholder="Role (admin/user)"]').fill('user');
  await addDialog.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Playwright User')).toBeVisible();

  // ✏️ Edit
  await page.getByText('Playwright User').click();

  const editDialog = page.locator('[role="dialog"]').first();
  await editDialog.locator('input').nth(2).fill('Updated User');
  await editDialog.getByRole('button', { name: 'Update User' }).click();

  await expect(page.getByText('Updated User')).toBeVisible();

  // 🗑 Delete
  await page.getByText('Updated User').click({ button: 'right' });

  const deleteDialog = page.locator('[role="dialog"]').first();
  await deleteDialog.getByRole('button', { name: 'Delete' }).click();

  await expect(page.getByText('Updated User')).toHaveCount(0);
});
