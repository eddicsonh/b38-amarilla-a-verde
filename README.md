# Bloque 38 · Informes del edificio

Sitio estático con los informes de avances y reparaciones del **Superbloque 38 (Zona F, 23 de Enero)** para documentar el paso de **etiqueta amarilla → etiqueta verde**.

- **Stack:** [Astro](https://astro.build) (HTML estático, sin JavaScript en el navegador)
- **Hosting:** Cloudflare Pages (0 $/mes, SSL automático)
- **Actualización:** editas archivos `.md` / `.json`, haces `git push` y Cloudflare publica solo.

## Estructura

```
src/
├── content/reportes/          ← un .md por informe
├── assets/reportes/<informe>/ ← fotos antes/después (se optimizan a WebP)
├── data/
│   ├── etiqueta.json          ← checklist y barra de progreso de la portada
│   └── edificio.json          ← datos de la ilustración (pisos, colores, núcleos)
├── components/                ← Fachada, Lateral, IndicadorEtiqueta, Galeria…
├── layouts/  pages/  styles/  lib/
public/pdfs/                   ← facturas y soportes (¡quedan públicos!)
referencias/diseno-original/   ← canvas e imágenes originales de la fachada
```

## Comandos

| Comando           | Acción                             |
| ----------------- | ---------------------------------- |
| `npm install`     | Instala dependencias               |
| `npm run dev`     | Servidor local en `localhost:4321` |
| `npm run build`   | Genera el sitio en `dist/`         |
| `npm run preview` | Sirve `dist/` para revisarlo       |

## Publicar un informe

1. Crea `src/content/reportes/AAAA-MM-nombre.md` (el nombre del archivo es la URL):

   ```yaml
   ---
   title: "Reparación del sistema de bombas de agua"
   date: 2026-10-01
   area: "Servicios básicos"
   status: "Completado"      # Diagnóstico | Planificado | En progreso | Completado
   impacto_etiqueta: "Mejora directa para la evaluación de seguridad habitacional"
   resumen: "Texto corto para la tarjeta."          # opcional
   zonas: ["servicios"]      # escaleras | columnas | pasillos | fachada | azotea | ascensores | servicios
   pisos: []                 # ej. [2, 6] — se resaltan en la ilustración
   fotos:
     antes:
       - src: "../../assets/reportes/AAAA-MM-nombre/antes-1.jpg"
         pie: "Tubería antes del cambio"
     despues: []
   archivos_pdf: ["/pdfs/factura-bombas.pdf"]
   ---

   ## Resumen de la obra
   Texto del informe en Markdown…
   ```

2. Copia las fotos en `src/assets/reportes/AAAA-MM-nombre/` y los PDF en `public/pdfs/`.
3. `npm run build` para validar (si un campo está mal, el build falla con el error).
4. `git add . && git commit -m "Informe: …" && git push`.

**Antes de subir PDFs o fotos**, tapa datos personales (cédulas, teléfonos, cuentas, rostros, números de apartamento).

## Actualizar la etiqueta

En `src/data/etiqueta.json` cambia `"cumplido": false` → `true`. Opcionalmente pon en `"reporte"` el nombre del informe (sin `.md`) para enlazarlo. El porcentaje se calcula solo.

## Despliegue en Cloudflare Pages

1. Sube el repositorio a GitHub.
2. Cloudflare Dashboard → Workers & Pages → *Create* → *Pages* → *Connect to Git*.
3. Framework preset: **Astro** · Build command: `npm run build` · Output: `dist`.
4. La versión de Node se toma de `.node-version`.
