import { test, expect } from '@playwright/test';

test.describe('Content', () => {
  test('home page has hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Skip the label');
  });

  test('home page has principles section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#principles')).toBeVisible();
    await expect(page.getByText('Every ingredient earns its place')).toBeVisible();
  });

  test('home page has how it works section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText("Three steps. That's it.")).toBeVisible();
    await expect(page.getByText('Pick your moment')).toBeVisible();
  });

  test('home page shows category cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Find your occasion')).toBeVisible();
    await expect(page.getByText('Chill & Social')).toBeVisible();
    await expect(page.getByText('Active Fuel')).toBeVisible();
  });

  test('categories page lists all categories', async ({ page }) => {
    await page.goto('/categories/');
    await expect(page.getByText('Chill & Social')).toBeVisible();
    await expect(page.getByText('Candy & Sweets')).toBeVisible();
    await expect(page.getByText('Drinks & Smoothies')).toBeVisible();
  });

  test('recipe cards link to recipe pages', async ({ page }) => {
    await page.goto('/recipes/');
    const firstCard = page.locator('a[href*="/recipes/"]').first();
    await expect(firstCard).toBeVisible();
  });

  test('about page has content', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.getByText('What we stand for')).toBeVisible();
  });

  test('footer has suggestion form', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toContainText('Got a suggestion');
  });
});
