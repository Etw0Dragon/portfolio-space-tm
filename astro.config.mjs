import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://Etw0Dragon.github.io',
  base: '/portfolio-space-tm',
  integrations: [tailwind(), react()],
});
