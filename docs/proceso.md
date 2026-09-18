# Proceso hacia la etiqueta verde

La portada muestra, antes del checklist técnico, las **etapas del proceso** para llegar a la recertificación: desde conseguir al personal técnico hasta la verificación final. Es la hoja de ruta administrativa; el [Indicador de etiqueta](etiqueta.md) es el checklist técnico de reparaciones.

Todo sale de `src/data/proceso.json`.

## Estructura del archivo

```json
{
  "fases": [
    {
      "titulo": "Inspección técnica del edificio",
      "descripcion": "Visita e inspección de fachada, azotea, tanques de agua, escaleras y columnas por piso.",
      "estado": "completado",
      "fecha": "2026-09-10",
      "reporte": "2026-09-informe-inicial-danos"
    }
  ]
}
```

| Campo | Descripción |
| --- | --- |
| `titulo` | Nombre corto de la etapa. |
| `descripcion` | Una o dos frases explicando qué implica. |
| `estado` | `"completado"`, `"en_curso"` o `"pendiente"`. Define el color del punto en la línea de tiempo. |
| `fecha` | `null` o una fecha `"AAAA-MM-DD"`. Se muestra junto a la etapa cuando existe. |
| `reporte` | `null` o el id de un informe (nombre del `.md` sin extensión). Si se indica, la etapa enlaza a ese informe. |

El orden del arreglo `fases` es el orden en pantalla.

## Tareas habituales

**Avanzar una etapa** — cambia su `estado` de `"pendiente"` a `"en_curso"`, y de `"en_curso"` a `"completado"` cuando termine. Agrega la `fecha` en que se completó y, si aplica, el `reporte` que la documenta.

**Agregar una etapa** — añade un objeto nuevo a `fases` en la posición donde debe aparecer.

> A diferencia de los `requisitos` de `etiqueta.json` (binarios: cumplido o no), las fases del proceso pueden estar `"en_curso"` porque representan trabajo administrativo u obras que toman tiempo, no una sola reparación puntual.
