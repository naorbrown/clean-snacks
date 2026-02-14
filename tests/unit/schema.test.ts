import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';

const categoryEnum = z.enum([
  'chill-social',
  'active-fuel',
  'on-the-go',
  'morning-daily',
  'kids-family',
  'teens',
  'gentle-nourishing',
  'candy-sweets',
  'drinks-smoothies',
  'baked-treats',
]);

const recipeSchema = z.object({
  title: z.string().max(80),
  description: z.string().max(160),
  category: categoryEnum,
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  prepTime: z.string(),
  totalTime: z.string(),
  yield: z.string(),
  servings: z.number().optional(),
  storageLife: z.string().optional(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string(),
      notes: z.string().optional(),
    })
  ),
  tags: z.array(z.string()).default([]),
  relatedRecipes: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
});

describe('Recipe Schema', () => {
  const validRecipe = {
    title: 'Air-Popped Popcorn with Nutritional Yeast',
    description: 'A crispy, savory popcorn topped with nutritional yeast and sea salt',
    category: 'chill-social',
    difficulty: 'beginner',
    prepTime: 'PT5M',
    totalTime: 'PT10M',
    yield: '8 cups',
    servings: 2,
    storageLife: '3-5 days in airtight container',
    ingredients: [
      { name: 'Popcorn kernels', amount: '1/3 cup' },
      { name: 'Coconut oil', amount: '1 tbsp' },
      { name: 'Nutritional yeast', amount: '2 tbsp' },
      { name: 'Sea salt', amount: '1/2 tsp' },
    ],
    tags: ['beginner-friendly', 'chill-social'],
    relatedRecipes: [],
    featured: true,
    draft: false,
    publishDate: '2026-02-14',
  };

  it('validates a correct recipe', () => {
    const result = recipeSchema.safeParse(validRecipe);
    expect(result.success).toBe(true);
  });

  it('rejects title over 80 characters', () => {
    const result = recipeSchema.safeParse({
      ...validRecipe,
      title: 'A'.repeat(81),
    });
    expect(result.success).toBe(false);
  });

  it('rejects description over 160 characters', () => {
    const result = recipeSchema.safeParse({
      ...validRecipe,
      description: 'A'.repeat(161),
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid category', () => {
    const result = recipeSchema.safeParse({
      ...validRecipe,
      category: 'invalid-category',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid difficulty', () => {
    const result = recipeSchema.safeParse({
      ...validRecipe,
      difficulty: 'expert',
    });
    expect(result.success).toBe(false);
  });

  it('accepts recipe without optional fields', () => {
    const minimal = {
      title: 'Test Recipe',
      description: 'A test recipe',
      category: 'chill-social',
      difficulty: 'beginner',
      prepTime: 'PT5M',
      totalTime: 'PT10M',
      yield: '1 cup',
      ingredients: [{ name: 'Water', amount: '1 cup' }],
      publishDate: '2026-02-14',
    };
    const result = recipeSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  it('validates all 10 categories', () => {
    const cats = [
      'chill-social', 'active-fuel', 'on-the-go', 'morning-daily', 'kids-family',
      'teens', 'gentle-nourishing', 'candy-sweets', 'drinks-smoothies', 'baked-treats',
    ];
    for (const cat of cats) {
      const result = recipeSchema.safeParse({ ...validRecipe, category: cat });
      expect(result.success).toBe(true);
    }
  });

  it('coerces date strings to Date objects', () => {
    const result = recipeSchema.parse(validRecipe);
    expect(result.publishDate).toBeInstanceOf(Date);
  });

  it('validates ingredients array structure', () => {
    const result = recipeSchema.safeParse({
      ...validRecipe,
      ingredients: [{ name: 'Test', amount: '1 cup', notes: 'optional note' }],
    });
    expect(result.success).toBe(true);
  });

  it('rejects ingredients without required fields', () => {
    const result = recipeSchema.safeParse({
      ...validRecipe,
      ingredients: [{ name: 'Test' }], // missing amount
    });
    expect(result.success).toBe(false);
  });
});
