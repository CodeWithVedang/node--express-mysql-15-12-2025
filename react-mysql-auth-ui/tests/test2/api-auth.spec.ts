import { test, expect } from '@playwright/test';

test('Login API returns token', async ({ request }) => {
  const res = await request.post(
    'http://localhost:5000/api/auth/login',
    {
      data: {
        username: 'admin',
        password: 'admin123',
      },
    }
  );

  const body = await res.json();

  expect(res.status()).toBe(200);
  expect(body.token).toBeTruthy();
});
