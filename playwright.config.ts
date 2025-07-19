import { defineConfig, devices } from '@playwright/test';

const PORT = 5000;

export default defineConfig({
  testDir: './tests',
  // fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  globalTimeout: 10 * 60 * 1000, // 10 minutes
  timeout: 10 * 1000, // 10 seconds

  projects: [
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'] },
    },
  ],
  webServer: {
    command: `pnpm run dev --port ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
