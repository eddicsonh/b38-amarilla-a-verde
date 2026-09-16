export const ESTADOS = ['Diagnóstico', 'Planificado', 'En progreso', 'Completado'] as const;
export type Estado = (typeof ESTADOS)[number];

export const ZONAS = [
  'escaleras',
  'columnas',
  'pasillos',
  'fachada',
  'azotea',
  'ascensores',
  'servicios',
] as const;
export type Zona = (typeof ZONAS)[number];

export const ZONA_ETIQUETA: Record<Zona, string> = {
  escaleras: 'Escaleras',
  columnas: 'Columnas',
  pasillos: 'Pasillos',
  fachada: 'Fachada',
  azotea: 'Azotea',
  ascensores: 'Ascensores',
  servicios: 'Servicios',
};

/** Color de cada estado (tomado de la paleta de la fachada) */
export const ESTADO_COLOR: Record<Estado, string> = {
  Diagnóstico: '#C4405E',
  Planificado: '#3B6FB6',
  'En progreso': '#E8B04A',
  Completado: '#3A9A5E',
};

export const formatoFecha = (d: Date) =>
  d.toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
