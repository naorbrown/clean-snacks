import { test, expect } from '@playwright/test';

const BASE = '/clean-snacks';

test.describe('Content', () => {
  test('home page has hero section', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('h1')).toContainText('Skip the label');
    await expect(page.locator('h1')).toContainText('Make the snack');
  });

  test('home page hero has subtitle', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.getByText('175+ recipes built from 5 real ingredients or fewer')).toBeVisible();
  });

  test('home page has principles section', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const principles = page.locator('#principles');
    await expect(principles).toBeVisible();
    await expect(principles.getByText('Every ingredient earns its place')).toBeVisible();
    await expect(principles.getByText('Five ingredients or fewer')).toBeVisible();
    await expect(principles.getByText('No refined sugar. Ever.')).toBeVisible();
    await expect(principles.getByText('Fuel, not filler')).toBeVisible();
  });

  test('home page has how it works section', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.getByText("Three steps. That's it.")).toBeVisible();
    await expect(page.getByText('Pick your moment')).toBeVisible();
    await expect(page.getByText('Read the ingredients')).toBeVisible();
    await expect(page.getByText('Make it in minutes')).toBeVisible();
  });

  test('home page shows category cards', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.getByText('Find your occasion')).toBeVisible();
    const main = page.locator('main');
    await expect(main.getByText('Chill & Social').first()).toBeVisible();
    await expect(main.getByText('Active Fuel').first()).toBeVisible();
  });

  test('categories page lists all categories', async ({ page }) => {
    await page.goto(`${BASE}/categories/`);
    const main = page.locator('main');
    await expect(main.getByText('Chill & Social')).toBeVisible();
    await expect(main.getByText('Candy & Sweets')).toBeVisible();
    await expect(main.getByText('Drinks & Smoothies')).toBeVisible();
  });

  test('recipe cards link to recipe pages', async ({ page }) => {
    await page.goto(`${BASE}/recipes/`);
    const firstCard = page.locator('main a[href*="/recipes/"]').first();
    await expect(firstCard).toBeVisible();
  });

  test('about page has content', async ({ page }) => {
    await page.goto(`${BASE}/about/`);
    await expect(page.getByText('What we stand for')).toBeVisible();
    await expect(page.getByText("What we're not")).toBeVisible();
  });

  test('about page has updated intro', async ({ page }) => {
    await page.goto(`${BASE}/about/`);
    await expect(page.locator('h1')).toContainText('Why Clean Snacks exists');
    await expect(page.getByText('what if you just made it yourself?')).toBeVisible();
  });

  test('footer has suggestion form', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('footer')).toContainText('Got a suggestion');
  });

  test('footer has brand tagline', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('footer')).toContainText('Five ingredients or fewer');
  });

  test('home page has meta description', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', /snack recipes/);
  });

  test('home page has OG tags', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'Clean Snacks');
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  });

  test('about page has meta description', async ({ page }) => {
    await page.goto(`${BASE}/about/`);
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', /Clean Snacks/);
  });
});
