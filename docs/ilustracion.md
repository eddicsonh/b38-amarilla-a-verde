# Ilustración del edificio

La escena de Residencias El Trébol que aparece en la portada y en cada informe **no es una imagen**: es un SVG generado al compilar por `src/components/Fachada.astro` a partir de `src/data/edificio.json`. Pesa pocos kilobytes, se ve nítida a cualquier tamaño y permite resaltar zonas y pisos con precisión.

Se inspira en las fotos de `referencias/fotos/` y en el diseño original de `referencias/diseno-original/`.

## Qué se dibuja

- **Losa principal** en perspectiva 3/4: fachada, lateral derecho y azotea.
- **15 niveles:** planta baja con pilotes + 14 pisos.
- **Pasillos** en PB, 4, 8 y 12: galería en sombra con baranda azul.
- **Paneles de color** (rosa, violeta, carmesí) bajo las ventanas, con rejas y algunas luces encendidas.
- **Dos torres de ascensores** de concreto que sobresalen de la fachada y del techo, rotuladas "38" y "39".
- **Estrella metálica** sobre la azotea, tanques de agua.
- **Entorno:** cielo de atardecer, el Ávila, otros superbloques, árboles y faroles.

## `src/data/edificio.json`

```json
{
  "building": {
    "name": "Bloques 38 y 39",
    "alias": "Residencias El Trébol",
    "location": "Zona F, 23 de Enero, Caracas, Venezuela",
    "architectural_style": "Modernista / Carlos Raúl Villanueva",
    "grid": {
      "total_columns": 32,
      "ground_floor_label": "PB",
      "elevator_cores": [
        { "column_index": 8, "label": "38" },
        { "column_index": 23, "label": "39" }
      ]
    },
    "levels": [
      { "floor": 14, "type": "apartments" },
      { "floor": 12, "type": "corridor" },
      { "floor": 0, "type": "corridor" }
    ],
    "palette": {
      "wall": "#F4EFE7",
      "panels": ["#E88BC7", "#7447C6", "#D02448", "#F3AAD6", "#5B34A8"],
      "corridor_parapet": "#2F80DF",
      "core_concrete": "#A9A49B"
    },
    "roof_star": { "position_column": 4 },
    "roof_tanks": [{ "column": 13, "width": 2 }]
  }
}
```

*(lista `levels` abreviada; el archivo real tiene los 15 niveles)*

| Campo | Efecto |
| --- | --- |
| `name`, `alias`, `location` | Textos del sitio: cabecera, títulos, pie, descripciones. |
| `grid.total_columns` | Número de módulos a lo largo de la fachada (incluye las torres). |
| `grid.ground_floor_label` | Cómo se rotula el nivel 0 ("PB"). |
| `grid.elevator_cores[]` | Posición (módulo) y rótulo de cada torre. |
| `levels[]` | Niveles del edificio. `floor: 0` es planta baja; `type` es `apartments` o `corridor`. También define el rango válido de `pisos` en los informes. |
| `palette.wall` | Color de la losa. |
| `palette.panels` | Colores de los paneles bajo las ventanas. |
| `palette.corridor_parapet` | Color de las barandas de los pasillos. |
| `palette.core_concrete` | Color de las torres. |
| `roof_star.position_column` | Módulo sobre el que se ubica la estrella. |
| `roof_tanks[]` | Tanques en la azotea: módulo inicial y ancho en módulos. |

La distribución de paneles de color y ventanas encendidas es **pseudoaleatoria pero determinista** (`src/lib/hash.ts`): el dibujo sale idéntico en cada build.

## Cómo funciona la perspectiva

Cada cara se dibuja en coordenadas planas y se proyecta con una matriz afín de SVG:

| Cara | Ejes locales | Matriz |
| --- | --- | --- |
| Fachada | `u` (a lo largo) × `y` (hacia abajo) | `mFrente()` |
| Lateral | `w` (profundidad) × `y` | `mLado(u)` |
| Azotea | `u` × `w` | `mTecho(y)` |

Los vectores de proyección son `EU = (1, 0.13)` y `EW = (0.6, -0.4)`. Como los resaltados usan las mismas matrices, siempre caen exactamente sobre pisos, pasillos y torres.

Constantes ajustables al inicio de `Fachada.astro`:

| Constante | Uso |
| --- | --- |
| `BW`, `FL`, `PB_H`, `D` | Ancho de módulo, alto de piso, alto de planta baja y profundidad de la losa. |
| `TOWER_OUT`, `TOWER_UP` | Cuánto sobresalen las torres hacia delante y por encima del techo. |
| `S`, `OX`, `OY` | Escala y posición del edificio dentro de la escena (1600 × 1000). |

## Propiedades del componente

```astro
<Fachada id="hero" />
<Fachada id="reporte" resaltar={{ zonas: ['pasillos'], pisos: [4, 8] }} mostrarPisos />
```

| Propiedad | Descripción |
| --- | --- |
| `id` | Prefijo único para los ids internos del SVG. Obligatorio distinto si hay dos ilustraciones en la misma página. |
| `resaltar` | `{ zonas, pisos }` con los mismos valores que el encabezado de un informe. |
| `mostrarPisos` | Muestra los rótulos PB, 1…14 junto a la fachada. |
| `class` | Clase CSS adicional. |

El SVG usa `preserveAspectRatio="xMidYMid slice"`: si se le fija una altura con CSS (como en móvil), se recorta centrado en el edificio.

## Vista lateral

`src/components/Lateral.astro` dibuja un esquema lateral (bloque + torre de escaleras) usado en la sección "El edificio" de la portada. Usa los mismos `levels` y `palette.panels`.

## Accesibilidad y animación

- Cada SVG tiene un `<title>` descriptivo para lectores de pantalla.
- El brillo de la estrella y el pulso de los resaltados se desactivan con `prefers-reduced-motion`.
