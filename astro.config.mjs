import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://scriptcraftai.github.io',
  base: '/astrocontent',
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  build: {
    assets: 'assets'
  },
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Ignore TypeScript warnings in client scripts
          if (warning.code === 'UNRESOLVED_IMPORT') return;
          warn(warning);
        }
      }
    }
  }
});
