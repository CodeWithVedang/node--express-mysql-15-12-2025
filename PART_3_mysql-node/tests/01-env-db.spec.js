import { test, expect } from '@playwright/test';

test.describe('Environment & DB Configuration', () => {

  test('Environment variables should be loaded', () => {
    expect(process.env.DB_HOST).toBeTruthy();
    expect(process.env.DB_USER).toBeTruthy();
    expect(process.env.DB_NAME).toBeTruthy();
    expect(process.env.JWT_SECRET).toBeTruthy();
  });

  test('Server should be reachable', async ({ request }) => {
    const res = await request.get('/');
    expect(res.status()).toBeLessThan(500);
  });

});
