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
  'chill-social':       { name: 'Chill & Social',       description: 'Movie night, game day, and late-night munchies — snacks for hanging out',               icon: '🍿', order: 1 },
  'active-fuel':        { name: 'Active Fuel',           description: 'Pre/post workout fuel, protein bars, and high-energy snacks',                           icon: '💪', order: 2 },
  'on-the-go':          { name: 'On the Go',             description: 'Desk snacks, commute-ready bars, and travel-friendly bites',                            icon: '🚀', order: 3 },
  'morning-daily':      { name: 'Morning & Daily',       description: 'Granola, smoothies, overnight oats, breakfast bars',                                    icon: '🌅', order: 4 },
  'kids-family':        { name: 'Kids & Family',         description: 'Baby-safe first foods, school lunch snacks, and fun family treats',                      icon: '👨‍👩‍👧‍👦', order: 5 },
  'teens':              { name: 'Teens',                  description: 'High-energy snacks for growing appetites and busy schedules',                           icon: '🎒', order: 6 },
  'gentle-nourishing':  { name: 'Gentle & Nourishing',   description: 'Hormone-supportive, easy-to-prepare, nutrient-dense snacks',                            icon: '🌸', order: 7 },
  'candy-sweets':       { name: 'Candy & Sweets',        description: 'Homemade gummies, chocolate, fruit leather, and treats without refined sugar',           icon: '🍬', order: 8 },
  'drinks-smoothies':   { name: 'Drinks & Smoothies',    description: 'Clean sodas, electrolytes, lattes, smoothies, and hydration drinks',                     icon: '🥤', order: 9 },
  'baked-treats':       { name: 'Baked Treats',           description: 'Cookies, brownies, pastries, donuts, and fried dough — bakery favorites made clean',    icon: '🍪', order: 10 },
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
