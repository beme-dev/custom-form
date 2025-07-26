import { defineConfig, devices } from '@playwright/test';

const PORT = 5172;

export default defineConfig({
  testDir: './src/routes',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: 'html',
  testMatch: '**/*.@(e2e).?(c|m)[jt]s?(x)',
  maxFailures: process.env.CI ? 1 : 3,

  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'off',

    launchOptions: {
      slowMo: process.env.PLAYWRIGHT_SLOMO === 'true' ? 1500 : 0, // Slow down operations for debugging
    },
  },

  globalTimeout: 10 * 60 * 1000, // 10 minutes
  expect: {
    timeout: 10 * 1000, // 10 seconds
  },
  timeout: 10 * 1000, // 10 seconds

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Galaxy A55 landscape'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 15 Pro Max'] },
    },
    {
      use: { ...devices['iPad (gen 11)'] },
      name: 'iPad',
    },
  ],

  webServer: {
    command: `pnpm run dev --port ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
