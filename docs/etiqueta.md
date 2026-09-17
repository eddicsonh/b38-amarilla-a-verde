# Indicador de etiqueta

La portada muestra el camino del edificio desde la **etiqueta amarilla** hasta la **etiqueta verde**: dos tarjetas (estado actual y meta), una barra de progreso y el checklist público de requisitos.

Todo sale de `src/data/etiqueta.json`.

## Estructura del archivo

```json
{
  "estado_actual": {
    "etiqueta": "Amarilla",
    "descripcion": "Riesgo mitigado / Habitable con condiciones"
  },
  "meta": {
    "etiqueta": "Verde",
    "descripcion": "Estructura segura / Mantenimiento al día"
  },
  "requisitos": [
    {
      "texto": "Impermeabilización de azotea",
      "cumplido": true,
      "reporte": null
    }
  ]
}
```

| Campo | Descripción |
| --- | --- |
| `estado_actual.etiqueta` / `descripcion` | Texto de la tarjeta amarilla. |
| `meta.etiqueta` / `descripcion` | Texto de la tarjeta verde. |
| `requisitos[].texto` | Requisito tal como se muestra en el checklist. |
| `requisitos[].cumplido` | `true` = listo (casilla verde), `false` = pendiente. |
| `requisitos[].reporte` | `null` o el id de un informe (nombre del `.md` sin extensión). Si se indica, el requisito enlaza a ese informe. |

## Cómo se calcula el progreso

```
porcentaje = requisitos cumplidos / total de requisitos × 100   (redondeado)
```

Con 2 de 4 cumplidos la barra marca **50 %**. Las divisiones de la barra corresponden a cada requisito. No hay que editar el porcentaje a mano.

## Tareas habituales

**Marcar un requisito como cumplido** — cambia `"cumplido": false` por `true` y, idealmente, enlaza el informe que lo documenta:

```json
{
  "texto": "Certificación de tuberías de gas",
  "cumplido": true,
  "reporte": "2026-11-certificacion-gas"
}
```

**Agregar un requisito** — añade un objeto nuevo a la lista `requisitos`. El orden del archivo es el orden en pantalla.

**Cambiar de etiqueta** — cuando el edificio obtenga la etiqueta verde, actualiza `estado_actual` con el nuevo estado.

> Buena práctica: marca un requisito como cumplido solo cuando exista un informe con estado `Completado` que lo respalde.
