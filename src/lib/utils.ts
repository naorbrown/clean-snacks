/**
 * Prefix a path with the configured Astro base path.
 */
export function url(path: string): string {
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
  return `${base}${path}`;
}

/**
 * Format an ISO 8601 duration string (e.g., "PT15M") to human-readable form.
 */
export function formatDuration(iso: string): string {
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

/**
 * Category metadata — must stay in sync with src/data/categories.yaml.
 */
const categories: Record<string, { name: string; description: string; icon: string; order: number }> = {
  'movie-night':       { name: 'Movie Night',          description: 'Popcorn, chocolate, chips & dips for watching at home',                            icon: '🍿', order: 1 },
  'gym-training':      { name: 'Gym & Training',       description: 'Pre/post workout fuel, protein bars, electrolyte drinks',                          icon: '💪', order: 2 },
  'work-study':        { name: 'Work & Study',         description: 'Desk-friendly energy bites, trail mix, focus drinks',                              icon: '📚', order: 3 },
  'road-trip':         { name: 'Road Trip & Commute',  description: 'Portable bars, wraps, and travel-ready snacks',                                    icon: '🚗', order: 4 },
  'game-day':          { name: 'Game Day & Social',    description: 'Dips, finger foods, and party platters',                                           icon: '🏈', order: 5 },
  'morning-daily':     { name: 'Morning & Daily',      description: 'Granola, smoothies, overnight oats, breakfast bars',                               icon: '🌅', order: 6 },
  'late-night':        { name: 'Late Night',           description: 'Satisfying midnight snacks that won\'t wreck your sleep',                           icon: '🌙', order: 7 },
  'baby-toddler':      { name: 'Baby & Toddler',      description: 'Soft, safe first foods and finger snacks for little ones',                          icon: '👶', order: 8 },
  'kids':              { name: 'Kids (5-12)',          description: 'School lunch snacks, after-school bites, and fun treats',                           icon: '🧒', order: 9 },
  'teens':             { name: 'Teens',                description: 'High-energy snacks for growing appetites and busy schedules',                       icon: '🎒', order: 10 },
  'mens-fuel':         { name: "Men's Fuel",           description: 'High-protein, mineral-dense snacks for strength and recovery',                      icon: '🏋️', order: 11 },
  'womens-wellness':   { name: "Women's Wellness",     description: 'Iron-rich, hormone-supportive snacks for every stage',                              icon: '🌸', order: 12 },
  'elderly-gentle':    { name: 'Elderly & Gentle',     description: 'Soft, nutrient-dense, easy-to-prepare snacks',                                     icon: '🤍', order: 13 },
  'candy-sweets':      { name: 'Candy & Sweets',       description: 'Homemade gummies, chocolate, fruit leather, and treats without refined sugar',      icon: '🍬', order: 14 },
  'drinks-smoothies':  { name: 'Drinks & Smoothies',   description: 'Clean sodas, electrolytes, lattes, smoothies, and hydration drinks',                icon: '🥤', order: 15 },
  'baked-treats':      { name: 'Baked Treats',          description: 'Cookies, brownies, pastries, donuts, and fried dough — bakery favorites made clean', icon: '🍪', order: 16 },
};

/**
 * Get the category display name from a slug.
 */
export function categoryLabel(slug: string): string {
  return categories[slug]?.name ?? slug;
}

/**
 * Get the emoji icon for a category.
 */
export function getCategoryIcon(slug: string): string {
  return categories[slug]?.icon ?? '📋';
}

/**
 * Get all categories sorted by order.
 */
export function getCategories(): Array<{ slug: string; name: string; description: string; icon: string; order: number }> {
  return Object.entries(categories)
    .map(([slug, info]) => ({ slug, ...info }))
    .sort((a, b) => a.order - b.order);
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
