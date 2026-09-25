// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
