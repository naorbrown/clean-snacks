import { test, expect } from '@playwright/test';

const BASE = '/clean-snacks';

test.describe('Navigation', () => {
  test('home page loads', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('header has navigation links', async ({ page, viewport }) => {
    test.skip(!!viewport && viewport.width < 768, 'Desktop nav is hidden on mobile');
    await page.goto(`${BASE}/`);
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav.getByText('Recipes')).toBeVisible();
    await expect(nav.getByText('Categories')).toBeVisible();
    await expect(nav.getByText('About')).toBeVisible();
  });

  test('recipes page loads', async ({ page }) => {
    await page.goto(`${BASE}/recipes/`);
    await expect(page.locator('h1')).toContainText('All Recipes');
  });

  test('categories page loads', async ({ page }) => {
    await page.goto(`${BASE}/categories/`);
    await expect(page.locator('h1')).toContainText('Categories');
  });

  test('about page loads', async ({ page }) => {
    await page.goto(`${BASE}/about/`);
    await expect(page.locator('h1')).toContainText('Why Clean Snacks exists');
  });

  test('category page loads', async ({ page }) => {
    await page.goto(`${BASE}/categories/chill-social/`);
    await expect(page.locator('h1')).toContainText('Chill & Social');
  });

  test('logo links to home', async ({ page }) => {
    await page.goto(`${BASE}/recipes/`);
    await page.locator('header a[href*="/"]').first().click();
    await expect(page).toHaveURL(/\/clean-snacks\/$/);
  });

  test('search button exists', async ({ page, viewport }) => {
    test.skip(!!viewport && viewport.width < 640, 'Desktop search button is hidden on mobile');
    await page.goto(`${BASE}/`);
    await expect(page.locator('#search-open')).toBeVisible();
  });

  test('skip to content link works', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const skipLink = page.locator('a[href="#main-content"]');
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
  });
});
