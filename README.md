# 🍀 Bloque 38 de amarillo a Verde

**Seguimiento público de obras de Residencias El Trébol — Bloques 38 y 39, Zona F, 23 de Enero (Caracas).**

TBloque 38 de amarillo a Verde es un sitio web estático donde se publican los diagnósticos, reparaciones y mejoras del edificio, con fotos del *antes* y el *después* y sus soportes en PDF. Su objetivo es documentar, de forma transparente para toda la comunidad, el camino desde la **etiqueta amarilla** (riesgo mitigado / habitable con condiciones) hasta la **etiqueta verde** (estructura segura / mantenimiento al día).

| | |
| --- | --- |
| **Stack** | [Astro 7](https://astro.build) · HTML estático, sin JavaScript en el navegador |
| **Hosting** | Cloudflare Pages — 0 $/mes, ancho de banda ilimitado, HTTPS automático |
| **Contenido** | Archivos Markdown (`.md`) y JSON versionados en Git |
| **Publicación** | `git push` → despliegue automático en segundos |

## Qué incluye

- **Portada** con una ilustración del edificio en perspectiva 3/4 al atardecer (generada desde datos, sin imágenes pesadas), la **hoja de ruta del proceso** hacia la recertificación, el **indicador de etiqueta** con barra de progreso y checklist público, y los últimos informes.
- **Informes** con estado (Diagnóstico, Planificado, En progreso, Completado), impacto en la etiqueta, zonas afectadas resaltadas sobre la ilustración, galería antes/después y documentos PDF.
- **Optimizado para datos móviles:** fotos convertidas a WebP en varios tamaños, carga diferida, caché de un año para recursos estáticos.

## Inicio rápido

Requisitos: **Node.js 22.12 o superior**.

```bash
npm install        # instala dependencias
npm run dev        # servidor local en http://localhost:4321
npm run build      # genera el sitio en dist/ y valida el contenido
npm run preview    # sirve dist/ para revisarlo antes de publicar
```

## Tareas frecuentes

| Quiero… | Edito… | Guía |
| --- | --- | --- |
| Publicar un informe nuevo | `src/content/reportes/*.md` | [Publicar un informe](docs/publicar-informe.md) |
| Agregar fotos del después | el `.md` del informe + `src/assets/reportes/` | [Publicar un informe](docs/publicar-informe.md#actualizar-un-informe-existente) |
| Marcar un requisito como cumplido | `src/data/etiqueta.json` | [Indicador de etiqueta](docs/etiqueta.md) |
| Avanzar una etapa del proceso | `src/data/proceso.json` | [Proceso hacia la etiqueta verde](docs/proceso.md) |
| Cambiar datos o colores del edificio | `src/data/edificio.json` | [Ilustración del edificio](docs/ilustracion.md) |
| Poner el sitio en línea | Cloudflare Pages | [Despliegue](docs/despliegue.md) |
| Entender cómo está construido | — | [Arquitectura](docs/arquitectura.md) |

## Estructura

```
trebol-verde/
├── src/
│   ├── content/reportes/        ← un archivo .md por informe
│   ├── assets/reportes/<id>/    ← fotos de cada informe (se optimizan en el build)
│   ├── data/
│   │   ├── etiqueta.json        ← estado, meta y checklist de la etiqueta
│   │   ├── proceso.json         ← etapas del proceso hacia la recertificación
│   │   └── edificio.json        ← niveles, torres, paleta e ilustración
│   ├── components/              ← Fachada, Lateral, IndicadorEtiqueta, Proceso, Galeria, TarjetaReporte
│   ├── layouts/Base.astro       ← cabecera, pie y metadatos
│   ├── pages/                   ← portada, listado y página de cada informe
│   ├── lib/                     ← constantes, utilidades de pisos y hash
│   ├── styles/global.css        ← variables de diseño y estilos base
│   └── content.config.ts        ← esquema que valida cada informe
├── public/
│   ├── pdfs/                    ← facturas y soportes (¡quedan públicos!)
│   ├── _headers                 ← reglas de caché para Cloudflare
│   └── favicon.svg
├── referencias/                 ← diseño original y fotos de referencia (no se publican)
└── docs/                        ← documentación
```

## Privacidad

Todo lo que esté en `public/` o se use en un informe **queda público e indexable**. Antes de publicar fotos o PDFs, tapa cédulas, teléfonos, números de cuenta, placas de vehículos, rostros y números de apartamento. Ver [Publicar un informe → Privacidad](docs/publicar-informe.md#privacidad).

## Documentación

- [Publicar un informe](docs/publicar-informe.md)
- [Indicador de etiqueta](docs/etiqueta.md)
- [Proceso hacia la etiqueta verde](docs/proceso.md)
- [Ilustración del edificio](docs/ilustracion.md)
- [Despliegue en Cloudflare Pages](docs/despliegue.md)
- [Arquitectura del proyecto](docs/arquitectura.md)
