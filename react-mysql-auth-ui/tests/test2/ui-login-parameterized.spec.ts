import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Re-create __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load JSON test data safely
const dataPath = path.join(__dirname, 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const cases = [
  users.admin,
  { username: 'wrong', password: 'wrong' }
];

for (const u of cases) {
  test(`Login attempt: ${u.username}`, async ({ page }) => {
    await page.goto('/login');

    await page.getByPlaceholder('Username').fill(u.username);
    await page.getByPlaceholder('Password').fill(u.password);
    await page.getByRole('button', { name: 'Login' }).click();

    if (u.username === users.admin.username) {
      await expect(page.getByText('Welcome to Dashboard')).toBeVisible();
    } else {
      await expect(page.getByText('Invalid login')).toBeVisible();
    }
  });
}
