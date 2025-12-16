import { test, expect } from "@playwright/test";
import fs from "fs";

test("WriteFile and ReadFile should work", async () => {
  // Write using server API function
  await import("../fileOps.js").then(async (mod) => {
    await mod.writeFile("hello vedang");
  });

  // Read file content
  const data = fs.readFileSync("sample.txt", "utf-8");

  expect(data).toBe("hello vedang");
});
