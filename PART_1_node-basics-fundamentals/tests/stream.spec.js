import { test, expect } from "@playwright/test";
import { execSync } from "child_process";

test("Stream should read large file in chunks", async () => {
  const output = execSync("node streamExample.js").toString();

  expect(output).toContain("Received chunk");
  expect(output).toContain("Stream finished reading file.");
});
