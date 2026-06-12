import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export const TEST_USER = {
  email: 'somchai.admin',
  password: 'SecurePass123',
};

const MOCK_USER = {
  id: 'usr-001',
  username: 'somchai.admin',
  email: 'somchai@example.com',
  displayName: 'สมชาย มั่นคง',
  role: 'admin',
};

const MOCK_TOKENS = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  expiresIn: 3600,
};

async function setupApiMocks(page: Page) {
  const ts = () => new Date().toISOString();

  await page.route('**/api/auth/login', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: { user: MOCK_USER, tokens: MOCK_TOKENS },
        timestamp: ts(),
      }),
    }),
  );

  await page.route('**/api/auth/logout', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, data: null, timestamp: ts() }),
    }),
  );

  await page.route('**/api/auth/profile', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, data: MOCK_USER, timestamp: ts() }),
    }),
  );
}

export async function fillLoginForm(page: Page) {
  await page.getByPlaceholder('กรอกอีเมลของคุณ').fill(TEST_USER.email);
  await page.getByPlaceholder('กรอกรหัสผ่าน').fill(TEST_USER.password);
}

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await setupApiMocks(page);
    await page.goto('/login');
    await fillLoginForm(page);
    await page.getByRole('button', { name: /login|เข้าสู่ระบบ/i }).click();
    await page.waitForURL('**/dashboard');
    await use(page);
  },
});

export { expect, setupApiMocks };
