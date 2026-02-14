# Clean Snacks

Skip the label. Make the snack. — 175+ whole-food snack recipes using 5 ingredients or fewer, organized by occasion.

**Live site:** [naorbrown.github.io/the-clean-snacks](https://naorbrown.github.io/the-clean-snacks)

## What is this?

Clean Snacks is a recipe site organized by **when** you snack — movie night, gym, work, road trips, and more. Every recipe uses real, whole-food ingredients (typically 5 or fewer), with no refined sugar, no seed oils, and no artificial anything.

### 10 Categories

| Occasion-Based | Demographic | Type |
|---|---|---|
| Chill & Social | Kids & Family | Candy & Sweets |
| Active Fuel | Teens | Drinks & Smoothies |
| On the Go | Gentle & Nourishing | Baked Treats |
| Morning & Daily | | |

## Tech Stack

- **[Astro](https://astro.build)** v5 — static site generator
- **[Tailwind CSS](https://tailwindcss.com)** v4 — utility-first CSS
- **[MDX](https://mdxjs.com)** — recipes as content collections
- **[Pagefind](https://pagefind.app)** — static search
- **[Vitest](https://vitest.dev)** — unit tests
- **[Playwright](https://playwright.dev)** — end-to-end tests
- **GitHub Pages** — hosting via GitHub Actions

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Testing

```bash
# Unit tests
pnpm test

# E2E tests (requires build first)
pnpm build && pnpm test:e2e
```

## Adding a Recipe

1. Create a new `.mdx` file in `src/content/recipes/<category>/`
2. Add frontmatter following this template:

```yaml
---
title: "Recipe Title"
description: "Short description under 160 chars"
category: chill-social
difficulty: beginner
prepTime: PT10M
totalTime: PT15M
yield: "2 cups"
servings: 4
storageLife: "5-7 days refrigerated"
ingredients:
  - name: "Ingredient"
    amount: "1 cup"
    notes: "optional"
tags: [tag1, tag2]
featured: false
draft: false
publishDate: 2026-02-14
---
```

3. Write steps, tips, and explanations in the body
4. Run `pnpm build` to verify

## Project Structure

```
src/
  components/     # Astro components (Header, Footer, cards, etc.)
  content/recipes/ # MDX recipe files organized by category
  data/           # Site and category configuration (YAML)
  layouts/        # Page and recipe layouts
  lib/            # Utilities and SEO schema helpers
  pages/          # Astro pages (routes)
  styles/         # Global CSS and print styles
tests/
  unit/           # Vitest unit tests
  e2e/            # Playwright E2E tests
```

## Principles

- **Every ingredient earns its place** — if you can't find it at a grocery store, it doesn't belong
- **Five ingredients or fewer** — simple recipes get made, complicated ones get bookmarked
- **No refined sugar** — dates, raw honey, and maple syrup instead
- **Fuel, not filler** — nuts, seeds, cacao, coconut — real food your body knows what to do with

## License

MIT
