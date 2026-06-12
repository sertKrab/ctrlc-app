import { test, expect, fillLoginForm, setupApiMocks } from './fixtures/auth.fixture';

test('TC-AUTH-01: Valid login redirects to /dashboard', async ({ page }) => {
  await setupApiMocks(page);
  await page.goto('/login');
  await fillLoginForm(page);
  await page.getByRole('button', { name: /login|เข้าสู่ระบบ/i }).click();
  await expect(page).toHaveURL(/\/dashboard/);
});

test('TC-AUTH-02: Logout redirects to /login', async ({ authenticatedPage: page }) => {
  await page.getByRole('button', { name: /logout|ออกจากระบบ|topbar\.logout/i }).click();
  await expect(page).toHaveURL(/\/login/);
});

test('TC-AUTH-10: Unauthenticated user visiting /dashboard redirects to /login', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
});
