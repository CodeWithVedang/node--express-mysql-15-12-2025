import { test, expect } from '@playwright/test';

test.describe('Auth – Login', () => {

  test('Login with valid credentials', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: {
        username: 'admin',
        password: 'admin123'
      }
    });

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.token).toBeTruthy();
    expect(body.user.username).toBe('admin');
  });

  test('Login with invalid credentials', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: {
        username: 'wrong',
        password: 'wrong'
      }
    });

    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe('Invalid login');
  });

});
