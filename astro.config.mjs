// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Cuando tengas el dominio de Cloudflare Pages, colócalo aquí
  // (ej. 'https://bloque38.pages.dev') para URLs absolutas y metadatos.
  // site: 'https://bloque38.pages.dev',
  output: 'static',
  trailingSlash: 'ignore',
});
