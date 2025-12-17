import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests/test2',

  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: process.env.BASE_URL,
    video: 'on',
    screenshot: 'on',
    trace: 'on',
  },
});
