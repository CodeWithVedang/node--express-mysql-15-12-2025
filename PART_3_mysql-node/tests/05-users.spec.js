import { test, expect } from '@playwright/test';

let token;
let createdUserId;

test.beforeAll(async ({ request }) => {
  const res = await request.post('/api/auth/login', {
    data: { username: 'admin', password: 'admin123' }
  });
  token = (await res.json()).token;
});

test.describe('Users API', () => {

  test('Get users list', async ({ request }) => {
    const res = await request.get('/api/users?page=1&limit=5', {
      headers: { Authorization: `Bearer ${token}` }
    });

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  });

  test('Create user', async ({ request }) => {
    const res = await request.post('/api/users', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        username: 'test_user_pw',
        password: '1234',
        name: 'Test User',
        role: 'user'
      }
    });

    expect(res.status()).toBe(201);

    const body = await res.json();
    createdUserId = body.data.id;
    expect(body.success).toBe(true);
  });

  test('Get user by ID', async ({ request }) => {
    const res = await request.get(`/api/users/${createdUserId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.id).toBe(createdUserId);
  });

  test('Delete user', async ({ request }) => {
    const res = await request.delete(`/api/users/${createdUserId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const body = await res.json();
    expect(body.success).toBe(true);
  });

});
