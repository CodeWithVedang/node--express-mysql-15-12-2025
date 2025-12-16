import { test, expect } from '@playwright/test';

let token;

test.beforeAll(async ({ request }) => {
  const res = await request.post('/api/auth/login', {
    data: { username: 'admin', password: 'admin123' }
  });
  token = (await res.json()).token;
});

test.describe('Auth – Logout & Expiry', () => {

  test('Manual logout with valid token', async ({ request }) => {
    const res = await request.post('/api/auth/logout', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.message).toContain('Logged out');
  });

  test('Access protected route without token', async ({ request }) => {
    const res = await request.get('/api/users');
    expect(res.status()).toBe(401);
  });

});
