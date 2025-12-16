import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("POST /api/users should create new user", async ({ request }) => {
  const avatarPath = path.join(__dirname, "test-avatar.png");

  const res = await request.post("/api/users", {
    multipart: {
      name: "PlaywrightUser",
      role: "tester",
      avatar: fs.createReadStream(avatarPath)
    }
  });

  expect(res.status()).toBe(201);

  const body = await res.json();

  expect(body.success).toBe(true);
  expect(body.data.name).toBe("PlaywrightUser");
});
