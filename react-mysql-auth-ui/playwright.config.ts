// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/test2',

  timeout: 30 * 1000,

  retries: 0,

  reporter: [
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: 'http://localhost:5173',

    headless: true,

    // ✅ ALWAYS capture video
    video: 'on',

    // ✅ ALWAYS capture screenshot
    screenshot: 'on',

    // ✅ ALWAYS record trace
    trace: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    }
  ],
});
