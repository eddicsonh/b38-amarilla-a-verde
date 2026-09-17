# Arquitectura

## Principios

1. **Estático y liviano.** Todo se resuelve al compilar. El navegador recibe HTML, CSS, una fuente y fotos optimizadas; no hay JavaScript.
2. **Contenido como archivos.** Los informes y datos viven en Markdown/JSON dentro del repositorio: el historial de Git es el historial del edificio.
3. **Un solo mantenedor.** Publicar no requiere panel de administración ni cuentas: editar, compilar, `git push`.
4. **Validación temprana.** Un esquema revisa cada informe; si algo está mal, el build falla antes de publicar.

## Flujo de datos

```
src/content/reportes/*.md ──► content.config.ts (esquema) ──┐
src/assets/reportes/**     ──► astro:assets (WebP)          ├──► páginas ──► dist/ ──► Cloudflare Pages
src/data/etiqueta.json     ──► IndicadorEtiqueta            │
src/data/edificio.json     ──► lib/edificio.ts ──► Fachada ─┘
```

## Rutas

| URL | Archivo | Contenido |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Escena del edificio, datos clave, indicador de etiqueta, sección "El edificio", últimos 3 informes. |
| `/reportes/` | `src/pages/reportes/index.astro` | Todos los informes agrupados por estado. |
| `/reportes/<id>/` | `src/pages/reportes/[id].astro` | Informe: cabecera, escena con zonas resaltadas, impacto, contenido, galería antes/después, PDFs. |

## Módulos

### `src/content.config.ts`
Define la colección `reportes` (cargador `glob` sobre `src/content/reportes/**/*.md`) y su esquema con Zod. El rango de `pisos` se obtiene de `edificio.json`, de modo que no hay que tocar el esquema si cambian los niveles.

### `src/lib/`
| Archivo | Contenido |
| --- | --- |
| `constantes.ts` | Estados, zonas, etiquetas legibles, colores por estado y formato de fecha (`es-VE`). |
| `edificio.ts` | Acceso a `edificio.json`: `niveles`, `pisosPasillo`, rango de pisos, `etiquetaPiso()` (0 → "PB"), `describirPisos()` ("planta baja y pisos 4, 8 y 12"). |
| `hash.ts` | Pseudoaleatorio determinista para la distribución de colores de la ilustración. |

### `src/components/`
| Componente | Uso |
| --- | --- |
| `Fachada.astro` | Escena 3/4 del edificio con resaltado opcional. Ver [Ilustración](ilustracion.md). |
| `Lateral.astro` | Vista lateral esquemática para la portada. |
| `IndicadorEtiqueta.astro` | Tarjetas amarilla/verde, barra de progreso y checklist. |
| `TarjetaReporte.astro` | Tarjeta de informe (portada y listado). |
| `Galeria.astro` | Galería antes/después; cada foto enlaza a una versión grande (1600 px, WebP). |

### `src/layouts/Base.astro`
Estructura HTML común: metadatos (título, descripción, Open Graph), cabecera fija con navegación y pie.

### `src/styles/global.css`
Variables de diseño (`--noche`, `--papel`, `--amarillo`, `--verde`…), tipografía y utilidades (`.contenedor`, `.seccion`, `.antetitulo`).

## Diseño

- **Tipografía:** Archivo Variable (autoalojada con `@fontsource-variable`), usando el eje de ancho para titulares condensados.
- **Colores:** base oscura "noche" para encabezados, fondo "papel" cálido para lectura; acentos tomados de la fachada real. Cada estado de informe tiene su color.
- **Responsive:** diseño fluido con `clamp()`; en móvil la escena se recorta centrada y las rejillas pasan a una columna.
- **Accesibilidad:** textos alternativos en fotos, `<title>` en SVG, `role="progressbar"` en la barra, estados de foco visibles y respeto a `prefers-reduced-motion`.

## Rendimiento

| Recurso | Estrategia |
| --- | --- |
| Fotos | Convertidas a WebP en 2–3 anchos con `srcset`, `loading="lazy"`. |
| Ilustración | SVG en línea; la portada completa pesa ≈ 13 KB comprimida. |
| Fuente | Un solo archivo variable (subconjunto latino). |
| Caché | Recursos con hash cacheados 1 año (`public/_headers`). |

## Dependencias

| Paquete | Motivo |
| --- | --- |
| `astro` | Generador del sitio, colecciones de contenido y optimización de imágenes (usa `sharp`). |
| `@fontsource-variable/archivo` | Fuente autoalojada. |

## Posibles mejoras

- Línea de tiempo de obras por fecha.
- Filtro de informes por zona o piso.
- Feed RSS para seguir las publicaciones.
- Imagen Open Graph generada a partir de la escena para compartir en redes.
