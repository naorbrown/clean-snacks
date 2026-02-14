import { test, expect } from '@playwright/test';

test.describe('Content', () => {
  test('home page has hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Replace junk food');
  });

  test('home page has principles section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#principles')).toBeVisible();
    await expect(page.getByText('Know every ingredient')).toBeVisible();
  });

  test('home page has how it works section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('How it works')).toBeVisible();
    await expect(page.getByText('Pick an occasion')).toBeVisible();
  });

  test('home page shows category cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Browse by Occasion')).toBeVisible();
    await expect(page.getByText('Movie Night')).toBeVisible();
    await expect(page.getByText('Gym & Training')).toBeVisible();
  });

  test('categories page lists all categories', async ({ page }) => {
    await page.goto('/categories/');
    await expect(page.getByText('Movie Night')).toBeVisible();
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
    await expect(page.getByText('Our Principles')).toBeVisible();
  });

  test('footer has suggestion form', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toContainText('Got a suggestion');
  });
});
