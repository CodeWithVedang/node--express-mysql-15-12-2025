import { test, expect } from "@playwright/test";

const BASE = "http://localhost:4000";

test("GET / should return welcome message", async ({ request }) => {
  const res = await request.get(`${BASE}/`);
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain("Welcome to Node.js Fundamentals!");
});

test("POST /write should write file", async ({ request }) => {
  const res = await request.post(`${BASE}/write`);
  expect(res.status()).toBe(200);
  expect(await res.text()).toBe("File written successfully!");
});

test("GET /read should read the file", async ({ request }) => {
  const res = await request.get("http://localhost:4000/read");
  expect(res.status()).toBe(200);
  const text = await res.text();
- expect(text).toContain("hello vedang");
});


test("GET unknown route should return 404", async ({ request }) => {
  const res = await request.get(`${BASE}/wrongpath`);
  expect(res.status()).toBe(404);
});
