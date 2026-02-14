import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('header has navigation links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav.getByText('Recipes')).toBeVisible();
    await expect(nav.getByText('Categories')).toBeVisible();
    await expect(nav.getByText('About')).toBeVisible();
  });

  test('recipes page loads', async ({ page }) => {
    await page.goto('/recipes/');
    await expect(page.locator('h1')).toContainText('All Recipes');
  });

  test('categories page loads', async ({ page }) => {
    await page.goto('/categories/');
    await expect(page.locator('h1')).toContainText('Categories');
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.locator('h1')).toContainText('Why Clean Snacks');
  });

  test('category page loads', async ({ page }) => {
    await page.goto('/categories/chill-social/');
    await expect(page.locator('h1')).toContainText('Chill & Social');
  });

  test('logo links to home', async ({ page }) => {
    await page.goto('/recipes/');
    await page.locator('header a[href*="/"]').first().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('search button exists', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#search-open')).toBeVisible();
  });

  test('skip to content link works', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('a[href="#main-content"]');
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
  });
});
