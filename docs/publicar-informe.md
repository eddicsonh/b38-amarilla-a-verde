# Publicar un informe

Cada informe es un archivo Markdown en `src/content/reportes/`. El **nombre del archivo** define la URL:

```
src/content/reportes/2026-10-reparacion-bombas.md  →  /reportes/2026-10-reparacion-bombas/
```

> Recomendación: usa el formato `AAAA-MM-descripcion-corta`, en minúsculas, sin tildes ni espacios. Así los archivos quedan ordenados por fecha.

## Paso a paso

1. **Crea la carpeta de fotos** `src/assets/reportes/<id-del-informe>/` y copia allí las imágenes (`.jpg`, `.png` o `.webp`). No hace falta reducirlas: Astro las optimiza al compilar.
2. **Copia los PDF** (si hay) en `public/pdfs/`.
3. **Crea el archivo** `src/content/reportes/<id-del-informe>.md` con el encabezado y el contenido (ver plantilla).
4. **Revisa en local:** `npm run dev` y abre `http://localhost:4321`.
5. **Valida:** `npm run build`. Si algún campo está mal escrito, el build falla indicando el archivo y el campo.
6. **Publica:**
   ```bash
   git add .
   git commit -m "Informe: reparación del sistema de bombas"
   git push
   ```
   Cloudflare Pages despliega automáticamente.

## Plantilla

```markdown
---
title: "Reparación del sistema de bombas de agua"
date: 2026-10-01
area: "Servicios básicos"
status: "Completado"
impacto_etiqueta: "Mejora directa para la evaluación de seguridad habitacional"
resumen: "Sustitución de tuberías de impulsión y mantenimiento del tablero eléctrico."
zonas: ["servicios"]
pisos: [0]
fotos:
  antes:
    - src: "../../assets/reportes/2026-10-reparacion-bombas/antes-tuberia.jpg"
      pie: "Tubería de impulsión deteriorada"
  despues:
    - src: "../../assets/reportes/2026-10-reparacion-bombas/despues-tuberia.jpg"
      pie: "Tubería nueva instalada"
archivos_pdf: ["/pdfs/factura-bombas.pdf"]
---

## Resumen de la obra

Se realizó la sustitución de las tuberías de impulsión del tanque bajo y
mantenimiento preventivo al tablero eléctrico.

## Detalles

- Empresa o responsable: …
- Duración: …
```

## Referencia de campos

| Campo | Obligatorio | Tipo | Descripción |
| --- | --- | --- | --- |
| `title` | Sí | texto | Título del informe. |
| `date` | Sí | fecha `AAAA-MM-DD` | Fecha del informe o de finalización de la obra. Ordena los listados. |
| `area` | Sí | texto | Área temática libre: "Servicios básicos", "Estructura y circulaciones"… |
| `status` | Sí | uno de la lista | `Diagnóstico`, `Planificado`, `En progreso` o `Completado`. Define el color y el grupo en el listado. |
| `impacto_etiqueta` | Sí | texto | Cómo contribuye a la etiqueta verde. Se muestra destacado. |
| `resumen` | No | texto | Frase corta para las tarjetas y la descripción en buscadores. |
| `zonas` | No | lista | Zonas que se resaltan en la ilustración: `escaleras`, `columnas`, `pasillos`, `fachada`, `azotea`, `ascensores`, `servicios`. |
| `pisos` | No | lista de números | Niveles afectados: `0` = planta baja, `1` a `14` = pisos. Vacío = sin precisar (se resalta todo el alto). |
| `fotos.antes` | No | lista | Fotos del estado inicial. Cada una con `src` (ruta relativa al `.md`) y `pie` opcional. |
| `fotos.despues` | No | lista | Fotos del resultado. Si está vacía se muestra "se publicarán cuando la obra esté terminada". |
| `archivos_pdf` | No | lista de rutas | Rutas públicas que empiezan por `/pdfs/`. |

### Cómo se resaltan las zonas

| Zona | Qué se marca en la ilustración |
| --- | --- |
| `escaleras`, `ascensores` | Las dos torres (Bloque 38 y Bloque 39) |
| `pasillos` | Las galerías de PB, 4, 8 y 12 (o solo las indicadas en `pisos`) |
| `columnas` | Columnas de la fachada (esquemático) |
| `fachada` | Toda la cara principal |
| `azotea` | La cubierta |
| `servicios` | No se dibuja (se lista como etiqueta) |

Si indicas `pisos`, el resaltado se limita a esos niveles.

## Contenido del cuerpo

Debajo del encabezado se escribe Markdown normal: títulos `##` y `###`, listas, **negritas**, tablas y citas (`>`). Las citas se muestran como recuadro de aviso, útiles para notas "por completar".

## Actualizar un informe existente

Es el caso típico al terminar una obra:

1. Copia las fotos nuevas en la carpeta del informe.
2. Agrégalas en `fotos.despues`.
3. Cambia `status` (por ejemplo, de `En progreso` a `Completado`) y, si corresponde, la `date`.
4. Si la obra cumple un requisito de la etiqueta, márcalo en `src/data/etiqueta.json` (ver [Indicador de etiqueta](etiqueta.md)).
5. `npm run build` y `git push`.

Para **reemplazar una foto** conservando el enlace basta con sobrescribir el archivo con el mismo nombre.

## Privacidad

El sitio es público. Antes de subir material:

- Tapa **cédulas, teléfonos, números de cuenta y firmas** en facturas y presupuestos.
- Evita **rostros** reconocibles, **placas de vehículos** y **números de apartamento** en las fotos.
- Elimina metadatos de ubicación de las fotos si no quieres que se publiquen (Astro los descarta al convertir a WebP, pero los PDF los conservan).
- La carpeta `referencias/` no se publica en el sitio, pero sí queda en el repositorio: si el repositorio de GitHub es público, no guardes allí fotos con datos personales (o agrégala a `.gitignore`).

## Errores frecuentes

| Mensaje / síntoma | Causa | Solución |
| --- | --- | --- |
| `status: Invalid option` | Estado mal escrito (ej. `completado`) | Usa exactamente `Completado`, con mayúscula y tilde donde corresponda. |
| `pisos: Too big` / `Too small` | Piso fuera de rango | Usa `0` para planta baja y hasta `14`. |
| `Could not find requested image` | Ruta de foto incorrecta | La ruta es relativa al `.md`: `../../assets/reportes/<id>/foto.jpg`. |
| El PDF da 404 | Ruta sin `/pdfs/` o archivo no copiado | Verifica que esté en `public/pdfs/` y que la ruta empiece por `/pdfs/`. |
| El informe no aparece | Extensión distinta de `.md` | Renombra el archivo a `.md`. |
