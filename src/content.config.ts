import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { ESTADOS, ZONAS } from './lib/constantes';
import { PISO_MAX, PISO_MIN } from './lib/edificio';

const reportes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reportes' }),
  schema: ({ image }) => {
    const foto = z.object({
      src: image(),
      pie: z.string().optional(),
    });

    return z.object({
      title: z.string(),
      date: z.coerce.date(),
      area: z.string(),
      status: z.enum(ESTADOS),
      impacto_etiqueta: z.string(),
      resumen: z.string().optional(),
      // Zonas del edificio que se resaltan en la ilustración de la fachada
      zonas: z.array(z.enum(ZONAS)).default([]),
      // Pisos afectados: 0 = planta baja, 1–14. Vacío = no especificado
      pisos: z.array(z.number().int().min(PISO_MIN).max(PISO_MAX)).default([]),
      fotos: z
        .object({
          antes: z.array(foto).default([]),
          despues: z.array(foto).default([]),
        })
        .default({ antes: [], despues: [] }),
      archivos_pdf: z.array(z.string()).default([]),
    });
  },
});

export const collections = { reportes };
