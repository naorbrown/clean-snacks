import { test, expect } from '@playwright/test';

test.describe('Visual', () => {
  test('dark theme renders correctly', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('no horizontal overflow on home page', async ({ page }) => {
    await page.goto('/');
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test('cards are visible on home page', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('a[class*="rounded-xl"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('recipe page has two-column layout on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    // Navigate to first recipe
    await page.goto('/recipes/');
    const firstLink = page.locator('a[href*="/recipes/"]').first();
    if (await firstLink.isVisible()) {
      await firstLink.click();
      // Check for sidebar
      const aside = page.locator('aside');
      await expect(aside).toBeVisible();
    }
  });

  test('footer renders', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Clean Snacks');
  });
});
