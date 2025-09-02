// src/paths.ts

// Astro injects BASE_URL automatically depending on deployment (e.g. GitHub Pages repo name)
const BASE_URL = import.meta.env.BASE_URL;

// Build helper to safely join paths with BASE_URL
const withBase = (path: string) => `${BASE_URL.replace(/\/$/, '')}${path}`;

export const PATHS = {
  home: withBase('/'),
  blog: withBase('/blog'),
  tools: withBase('/tools'),
};
