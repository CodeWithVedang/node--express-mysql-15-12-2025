import { test, expect } from "@playwright/test";

test("GET /api/users/999 should trigger error handler", async ({ request }) => {
  const res = await request.get("http://localhost:4000/api/users/999");
  const body = await res.json();

  expect(res.status()).toBe(404);
  expect(body.success).toBe(false);
  expect(body.message).toBe("User not found");
});
