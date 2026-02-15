import { test, expect } from '@playwright/test';

const BASE = '/clean-snacks';

test.describe('Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('mobile menu button is visible', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('#mobile-menu-open')).toBeVisible();
  });

  test('desktop nav is hidden on mobile', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeHidden();
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.locator('#mobile-menu-open').click();
    const menu = page.locator('#mobile-menu');
    await expect(menu).toBeVisible();
    await page.locator('#mobile-menu-close').click();
    await expect(menu).toBeHidden();
  });

  test('mobile menu has navigation links', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.locator('#mobile-menu-open').click();
    const menuNav = page.locator('#mobile-menu nav');
    await expect(menuNav.getByText('Recipes')).toBeVisible();
    await expect(menuNav.getByText('Categories')).toBeVisible();
    await expect(menuNav.getByText('About')).toBeVisible();
  });

  test('mobile search button works', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('#search-open-mobile')).toBeVisible();
  });

  test('hero section is responsive', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    const box = await h1.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.width).toBeLessThanOrEqual(375);
  });
});
