import { test, expect } from "@playwright/test";
import { execSync } from "child_process";

test("Buffer example should output correct values", async () => {
  const output = execSync("node bufferexample.js").toString();

  expect(output).toContain("BUFFER EXAMPLE");
  expect(output).toContain("Hello Vedang");
  expect(output).toContain("Byte length:");
});
