import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const categoryEnum = z.enum([
  'movie-night',
  'gym-training',
  'work-study',
  'road-trip',
  'game-day',
  'morning-daily',
  'late-night',
  'baby-toddler',
  'kids',
  'teens',
  'mens-fuel',
  'womens-wellness',
  'elderly-gentle',
  'candy-sweets',
  'drinks-smoothies',
]);

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/recipes' }),
  schema: z.object({
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
  }),
});

export const collections = { recipes };
