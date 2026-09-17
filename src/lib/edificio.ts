import edificio from '../data/edificio.json';

export const b = edificio.building;

/** Nombre corto de un nivel: 0 → "PB" */
export const etiquetaPiso = (piso: number) => (piso === 0 ? b.grid.ground_floor_label : String(piso));

/** Nombre en texto corrido: 0 → "planta baja", 4 → "piso 4" */
export const nombrePiso = (piso: number) => (piso === 0 ? 'planta baja' : `piso ${piso}`);

/** Une una lista en español: ["a", "b", "c"] → "a, b y c" */
export const unirLista = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;

/** Describe pisos para lectura: [0, 4, 8] → "planta baja y pisos 4 y 8" */
export function describirPisos(pisos: number[]) {
  const orden = [...pisos].sort((x, y) => x - y);
  const pb = orden[0] === 0;
  const resto = orden.filter((p) => p !== 0).map(String);
  const partes = [
    ...(pb ? ['planta baja'] : []),
    ...(resto.length ? [`${resto.length > 1 ? 'pisos' : 'piso'} ${unirLista(resto)}`] : []),
  ];
  return partes.join(' y ');
}

/** Niveles de arriba hacia abajo, con su fila en la ilustración */
export const niveles = [...b.levels]
  .sort((x, y) => y.floor - x.floor)
  .map((f, r) => ({ r, piso: f.floor, pasillo: f.type === 'corridor' }));

export const PISO_MIN = Math.min(...niveles.map((n) => n.piso));
export const PISO_MAX = Math.max(...niveles.map((n) => n.piso));
export const pisosPasillo = niveles.filter((n) => n.pasillo).map((n) => n.piso).sort((x, y) => x - y);
