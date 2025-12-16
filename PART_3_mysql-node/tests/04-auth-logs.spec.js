import { test, expect } from '@playwright/test';

let token;

test.beforeAll(async ({ request }) => {
  const res = await request.post('/api/auth/login', {
    data: { username: 'admin', password: 'admin123' }
  });
  token = (await res.json()).token;
});

test('Fetch login logs (admin)', async ({ request }) => {
  const res = await request.get('/api/auth/logs', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.success).toBe(true);
  expect(Array.isArray(body.data)).toBe(true);
});
