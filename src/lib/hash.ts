/** Pseudoaleatorio determinista en [0, 1): la ilustración sale igual en cada build */
export function hash(a: number, b: number): number {
  let x = Math.imul(a + 1, 374761393) ^ Math.imul(b + 1, 668265263);
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}
