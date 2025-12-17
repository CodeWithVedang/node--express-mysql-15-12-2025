import { test, expect } from '@playwright/test';

let userId: number;
let token: string;

test.beforeAll(async ({ request }) => {
  const res = await request.post(
    `${process.env.API_URL}/auth/login`,
    {
      data: {
        username: process.env.ADMIN_USER,
        password: process.env.ADMIN_PASS,
      },
    }
  );

  token = (await res.json()).token;
});

test('POST – create user', async ({ request }) => {
  const res = await request.post(
    `${process.env.API_URL}/users`,
    {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        username: 'api_user',
        password: '123',
        name: 'API User',
        role: 'user',
      },
    }
  );

  const body = await res.json();
  userId = body.id;

  expect(res.status()).toBe(201);
});

test('GET – fetch users', async ({ request }) => {
  const res = await request.get(
    `${process.env.API_URL}/users?page=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  expect(res.status()).toBe(200);
});

test('PUT – update user', async ({ request }) => {
  const res = await request.put(
    `${process.env.API_URL}/users/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: 'Updated API User' },
    }
  );

  expect(res.status()).toBe(200);
});

test('DELETE – remove user', async ({ request }) => {
  const res = await request.delete(
    `${process.env.API_URL}/users/${userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  expect(res.status()).toBe(200);
});
