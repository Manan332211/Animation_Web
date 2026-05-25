/**
 * ═══════════════════════════════════════════════════════════════
 *  SITE CONFIGURATION
 *  All core content is fully configurable from this single file.
 * ═══════════════════════════════════════════════════════════════
 */

const SITE_CONFIG = {

  // ─── Brand ──────────────────────────────────────────────────
  brand: {
    name: "FRŪT",
    tagline: "Pure Nature. Zero Compromise.",
  },

  // ─── Default Theme ──────────────────────────────────────────
  // "dark" or "light"
  defaultMode: "dark",

  // ─── Navigation Links ───────────────────────────────────────
  nav: [
    { label: "Home",        target: "#hero" },
    { label: "About",       target: "#about" },
    { label: "Ingredients", target: "#ingredients" },
    { label: "Experience",  target: "#experience" },
  ],

  // ─── Social Links ──────────────────────────────────────────
  social: [
    {
      name: "X",
      url: "https://x.com",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`
    },
    {
      name: "Facebook",
      url: "https://facebook.com",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
    },
  ],

  // ─── Drink Variants ─────────────────────────────────────────
  // Each variant defines its own name, description, accent color,
  // frame sequence path, and total frame count.
  variants: [
    {
      id: "passion",
      name: "Passion Fruit",
      subtitle: "Tropical Intensity",
      description: "Sun-ripened passion fruit, cold-pressed and bottled at peak flavor. A burst of tropical paradise in every sip — bold, tangy, and unapologetically real.",
      themeColor: "#C74B7A",
      themeColorRGB: "199, 75, 122",
      mode: null,                         // null = use global default
      framePath: "products/passion/",
      frameCount: 240,
      framePattern: "frame_{index}_delay-0.033s.png",  // {index} → 000, 001, ...
    },
    // ── Add more variants below ──
    // {
    //   id: "mango",
    //   name: "Mango Bliss",
    //   subtitle: "Golden Tropics",
    //   description: "...",
    //   themeColor: "#E8A838",
    //   themeColorRGB: "232, 168, 56",
    //   mode: null,
    //   framePath: "products/mango/",
    //   frameCount: 240,
    //   framePattern: "frame_{index}_delay-0.033s.png",
    // },
  ],

  // ─── Section Content ────────────────────────────────────────
  sections: {

    about: {
      preTitle: "Our Story",
      title: "Crafted by Nature,\nPerfected by Passion",
      paragraphs: [
        "At FRŪT, we believe the best drinks come from the purest sources. Every bottle starts with hand-selected fruits, grown in soil untouched by shortcuts.",
        "No concentrates. No artificial sweeteners. No compromises. Just nature, distilled into liquid form — the way it was always meant to be.",
      ],
    },

    ingredients: {
      preTitle: "What's Inside",
      title: "Nothing to Hide",
      items: [
        {
          icon: "🍈",
          name: "Fresh Passion Fruit",
          detail: "Hand-picked at peak ripeness from volcanic soil farms.",
        },
        {
          icon: "💧",
          name: "Spring Water",
          detail: "Naturally filtered through ancient mineral-rich rock.",
        },
        {
          icon: "🍯",
          name: "Raw Honey",
          detail: "Ethically sourced wildflower honey for subtle sweetness.",
        },
        {
          icon: "🌿",
          name: "Natural Extracts",
          detail: "Cold-pressed botanicals for depth and complexity.",
        },
      ],
    },

    experience: {
      preTitle: "The Experience",
      title: "Feel the\nDifference",
      quote: "One sip and you'll taste what real fruit is supposed to taste like.",
      cta: {
        label: "Shop Now",
        url: "#",
      },
    },
  },

  // ─── Footer ─────────────────────────────────────────────────
  footer: {
    copyright: `© ${new Date().getFullYear()} FRŪT. All rights reserved.`,
    links: [
      { label: "Privacy Policy", url: "#" },
      { label: "Terms of Service", url: "#" },
      { label: "Contact", url: "#" },
    ],
  },

  // ─── Performance ────────────────────────────────────────────
  performance: {
    frameSkip: 1,           // 1 = use every frame, 2 = every other frame, etc.
    preloadBatchSize: 15,   // frames loaded per batch
    heroScrollMultiplier: 4, // hero section height = viewport × this value
  },
};
