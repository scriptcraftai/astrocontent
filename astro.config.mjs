import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/your-repo-name',
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  build: {
    assets: 'assets'
  }
});
