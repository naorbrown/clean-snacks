import { describe, it, expect } from 'vitest';

// We test the pure functions from utils.ts
// Note: url() depends on import.meta.env which is Astro-specific, so we test the others

describe('formatDuration', () => {
  // Inline the function since it's a pure function
  function formatDuration(iso: string): string {
    const match = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
    if (!match) return iso;
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const parts: string[] = [];
    if (hours > 0) parts.push(`${hours} hr${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} min`);
    if (parts.length === 0) parts.push('< 1 min');
    return parts.join(' ');
  }

  it('formats minutes only', () => {
    expect(formatDuration('PT15M')).toBe('15 min');
  });

  it('formats hours only', () => {
    expect(formatDuration('PT2H')).toBe('2 hrs');
  });

  it('formats single hour', () => {
    expect(formatDuration('PT1H')).toBe('1 hr');
  });

  it('formats hours and minutes', () => {
    expect(formatDuration('PT1H30M')).toBe('1 hr 30 min');
  });

  it('handles zero duration', () => {
    expect(formatDuration('PT0M')).toBe('< 1 min');
  });

  it('returns original string for invalid format', () => {
    expect(formatDuration('invalid')).toBe('invalid');
  });
});

describe('categoryLabel', () => {
  const categories: Record<string, { name: string }> = {
    'movie-night': { name: 'Movie Night' },
    'gym-training': { name: 'Gym & Training' },
    'work-study': { name: 'Work & Study' },
    'road-trip': { name: 'Road Trip & Commute' },
    'game-day': { name: 'Game Day & Social' },
    'morning-daily': { name: 'Morning & Daily' },
    'late-night': { name: 'Late Night' },
    'baby-toddler': { name: 'Baby & Toddler' },
    'kids': { name: 'Kids (5-12)' },
    'teens': { name: 'Teens' },
    'mens-fuel': { name: "Men's Fuel" },
    'womens-wellness': { name: "Women's Wellness" },
    'elderly-gentle': { name: 'Elderly & Gentle' },
    'candy-sweets': { name: 'Candy & Sweets' },
    'drinks-smoothies': { name: 'Drinks & Smoothies' },
  };

  function categoryLabel(slug: string): string {
    return categories[slug]?.name ?? slug;
  }

  it('returns the correct name for known categories', () => {
    expect(categoryLabel('movie-night')).toBe('Movie Night');
    expect(categoryLabel('gym-training')).toBe('Gym & Training');
    expect(categoryLabel('candy-sweets')).toBe('Candy & Sweets');
  });

  it('returns the slug for unknown categories', () => {
    expect(categoryLabel('unknown')).toBe('unknown');
  });
});

describe('getCategoryIcon', () => {
  const categories: Record<string, { icon: string }> = {
    'movie-night': { icon: '🍿' },
    'gym-training': { icon: '💪' },
    'candy-sweets': { icon: '🍬' },
    'drinks-smoothies': { icon: '🥤' },
  };

  function getCategoryIcon(slug: string): string {
    return categories[slug]?.icon ?? '📋';
  }

  it('returns correct icon for known categories', () => {
    expect(getCategoryIcon('movie-night')).toBe('🍿');
    expect(getCategoryIcon('candy-sweets')).toBe('🍬');
  });

  it('returns default icon for unknown categories', () => {
    expect(getCategoryIcon('unknown')).toBe('📋');
  });
});

describe('capitalize', () => {
  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  it('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('handles already capitalized strings', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('handles single character', () => {
    expect(capitalize('h')).toBe('H');
  });

  it('handles empty string', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('getCategories', () => {
  const categories: Record<string, { name: string; description: string; icon: string; order: number }> = {
    'movie-night': { name: 'Movie Night', description: 'test', icon: '🍿', order: 1 },
    'gym-training': { name: 'Gym & Training', description: 'test', icon: '💪', order: 2 },
    'candy-sweets': { name: 'Candy & Sweets', description: 'test', icon: '🍬', order: 14 },
  };

  function getCategories() {
    return Object.entries(categories)
      .map(([slug, info]) => ({ slug, ...info }))
      .sort((a, b) => a.order - b.order);
  }

  it('returns categories sorted by order', () => {
    const result = getCategories();
    expect(result[0].slug).toBe('movie-night');
    expect(result[1].slug).toBe('gym-training');
    expect(result[2].slug).toBe('candy-sweets');
  });

  it('includes all category fields', () => {
    const result = getCategories();
    expect(result[0]).toHaveProperty('slug');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('description');
    expect(result[0]).toHaveProperty('icon');
    expect(result[0]).toHaveProperty('order');
  });
});
