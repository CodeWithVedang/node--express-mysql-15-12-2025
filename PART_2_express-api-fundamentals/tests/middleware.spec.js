import { test, expect } from "@playwright/test";

test("Custom middleware should log requests", async ({ request }) => {
  const res = await request.get("http://localhost:4000/");
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.message).toContain("Express.js Fundamentals");
});
