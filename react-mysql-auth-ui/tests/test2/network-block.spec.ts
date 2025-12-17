import { test } from '@playwright/test';

test('Block analytics requests', async ({ page }) => {
  await page.route('**/analytics**', route => route.abort());

  await page.goto('/');
});
