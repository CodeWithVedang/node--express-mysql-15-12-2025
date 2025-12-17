import { test, expect } from '@playwright/test';

test('Login via API and open UI directly', async ({ page, request }) => {
  const res = await request.post(
    `${process.env.API_URL}/auth/login`,
    {
      data: {
        username: process.env.ADMIN_USER,
        password: process.env.ADMIN_PASS,
      },
    }
  );

  const token = (await res.json()).token;

  await page.addInitScript((t) => {
    localStorage.setItem('token', t);
    localStorage.setItem('role', 'admin');
  }, token);

  await page.goto('/');

  await expect(page.getByText('Welcome to Dashboard')).toBeVisible();
});
