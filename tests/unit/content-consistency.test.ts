import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const CONTENT_DIR = join(process.cwd(), 'src/content/recipes');
const VALID_CATEGORIES = [
  'movie-night', 'gym-training', 'work-study', 'road-trip', 'game-day',
  'morning-daily', 'late-night', 'baby-toddler', 'kids', 'teens',
  'mens-fuel', 'womens-wellness', 'elderly-gentle', 'candy-sweets', 'drinks-smoothies',
];

function getRecipeFiles(): { path: string; dir: string; file: string }[] {
  const files: { path: string; dir: string; file: string }[] = [];
  if (!existsSync(CONTENT_DIR)) return files;

  for (const dir of readdirSync(CONTENT_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const dirPath = join(CONTENT_DIR, dir.name);
    for (const file of readdirSync(dirPath)) {
      if (file.endsWith('.mdx')) {
        files.push({ path: join(dirPath, file), dir: dir.name, file });
      }
    }
  }
  return files;
}

function extractFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0 && !line.startsWith(' ') && !line.startsWith('-')) {
      const key = line.substring(0, colonIdx).trim();
      const value = line.substring(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
      fm[key] = value;
    }
  }
  return fm;
}

describe('Content Consistency', () => {
  const recipes = getRecipeFiles();

  it('has recipe files', () => {
    expect(recipes.length).toBeGreaterThan(0);
  });

  it('all recipe directories are valid categories', () => {
    const dirs = [...new Set(recipes.map((r) => r.dir))];
    for (const dir of dirs) {
      expect(VALID_CATEGORIES).toContain(dir);
    }
  });

  it('all recipe files have frontmatter', () => {
    for (const recipe of recipes) {
      const content = readFileSync(recipe.path, 'utf-8');
      expect(content.startsWith('---'), `${recipe.file} missing frontmatter`).toBe(true);
      expect(content.includes('\n---'), `${recipe.file} missing frontmatter closing`).toBe(true);
    }
  });

  it('all recipes have required frontmatter fields', () => {
    const requiredFields = ['title', 'description', 'category', 'difficulty', 'prepTime', 'totalTime', 'yield'];
    for (const recipe of recipes) {
      const content = readFileSync(recipe.path, 'utf-8');
      const fm = extractFrontmatter(content);
      for (const field of requiredFields) {
        expect(fm[field], `${recipe.file} missing ${field}`).toBeDefined();
      }
    }
  });

  it('recipe category matches directory', () => {
    for (const recipe of recipes) {
      const content = readFileSync(recipe.path, 'utf-8');
      const fm = extractFrontmatter(content);
      expect(fm.category, `${recipe.file}: category "${fm.category}" doesn't match dir "${recipe.dir}"`).toBe(recipe.dir);
    }
  });

  it('all recipe files use .mdx extension', () => {
    for (const recipe of recipes) {
      expect(recipe.file.endsWith('.mdx'), `${recipe.file} should have .mdx extension`).toBe(true);
    }
  });

  it('all recipes have Steps section', () => {
    for (const recipe of recipes) {
      const content = readFileSync(recipe.path, 'utf-8');
      expect(content.includes('## Steps'), `${recipe.file} missing ## Steps section`).toBe(true);
    }
  });

  it('no recipe titles exceed 80 characters', () => {
    for (const recipe of recipes) {
      const content = readFileSync(recipe.path, 'utf-8');
      const fm = extractFrontmatter(content);
      if (fm.title) {
        expect(fm.title.length, `${recipe.file} title too long: "${fm.title}"`).toBeLessThanOrEqual(80);
      }
    }
  });
});
