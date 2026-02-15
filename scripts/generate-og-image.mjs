import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1F1C1A"/>
      <stop offset="100%" stop-color="#2C2927"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- Subtle honey accent glow -->
  <circle cx="600" cy="180" r="280" fill="#D4A847" opacity="0.04"/>

  <!-- Popcorn icon -->
  <g transform="translate(556, 80) scale(2.75)">
    <path d="M9 15l2 13h10l2-13" stroke="#E8C96E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="12" cy="11" r="3.5" stroke="#E8C96E" stroke-width="2" fill="none"/>
    <circle cx="20" cy="11" r="3.5" stroke="#E8C96E" stroke-width="2" fill="none"/>
    <circle cx="16" cy="6" r="3.5" stroke="#E8C96E" stroke-width="2" fill="none"/>
  </g>

  <!-- Tagline -->
  <text x="600" y="320" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="700" fill="#E8E3DE">
    Skip the label.
  </text>
  <text x="600" y="385" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="700" fill="#E8C96E">
    Make the snack.
  </text>

  <!-- Description -->
  <text x="600" y="450" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="#E8E3DE" opacity="0.6">
    Whole-food recipes · Short ingredient lists · No refined sugar
  </text>

  <!-- Brand name -->
  <text x="600" y="560" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" letter-spacing="3" fill="#E8E3DE" opacity="0.35">
    CLEAN SNACKS
  </text>

  <!-- Bottom accent line -->
  <rect x="480" y="580" width="240" height="2" rx="1" fill="#D4A847" opacity="0.3"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
console.log('Generated public/og-image.png (1200x630)');
