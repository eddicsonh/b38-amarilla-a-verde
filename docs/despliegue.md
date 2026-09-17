# Despliegue en Cloudflare Pages

El sitio es 100 % estático: `npm run build` genera la carpeta `dist/` y Cloudflare Pages la sirve. No hay servidor ni base de datos.

## 1. Subir el repositorio a GitHub

```bash
# crea un repositorio vacío en GitHub llamado trebol-verde y luego:
git remote add origin git@github.com:<tu-usuario>/trebol-verde.git
git push -u origin main
```

> Si el repositorio es **público**, revisa antes que `referencias/` no contenga fotos con datos personales.

## 2. Crear el proyecto en Cloudflare

1. Entra a **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**.
2. Autoriza GitHub y elige el repositorio `trebol-verde`.
3. Configura el build:

   | Opción | Valor |
   | --- | --- |
   | Production branch | `main` |
   | Framework preset | `Astro` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

4. **Save and Deploy.** En uno o dos minutos el sitio queda en `https://<proyecto>.pages.dev`.

La versión de Node se toma del archivo `.node-version` (`22`). Astro 7 requiere Node 22.12 o superior.

## 3. Configurar la URL del sitio (opcional)

Cuando conozcas la URL definitiva, colócala en `astro.config.mjs` para que los metadatos usen direcciones absolutas:

```js
export default defineConfig({
  site: 'https://trebol-verde.pages.dev',
  output: 'static',
  trailingSlash: 'ignore',
});
```

## 4. Dominio propio (opcional)

En el proyecto de Pages: **Custom domains → Set up a custom domain**. Si el dominio ya está en Cloudflare, el DNS y el certificado se configuran solos.

## Flujo de publicación

```
editar .md / .json  →  npm run build (validar)  →  git push  →  Cloudflare compila y publica
```

- Cada `push` a `main` genera un despliegue de producción.
- Los `push` a otras ramas generan **despliegues de vista previa** con URL propia, útiles para revisar un informe antes de publicarlo.
- Si un build falla (por ejemplo, un campo inválido), Cloudflare **mantiene publicada la versión anterior**. El error se ve en *Deployments → View build log*.
- Para volver atrás: *Deployments →* elegir un despliegue anterior *→ Rollback*.

## Caché

`public/_headers` define:

| Ruta | Caché |
| --- | --- |
| `/_astro/*` (CSS, fuentes, imágenes optimizadas) | 1 año, inmutable (los nombres llevan hash) |
| `/pdfs/*` | 1 día |

Las páginas HTML usan la caché por defecto de Cloudflare, así que los cambios se ven tras cada despliegue.

## Límites del plan gratuito

El plan gratuito de Cloudflare Pages sobra para este sitio: ancho de banda ilimitado, 500 builds al mes y archivos de hasta 25 MB cada uno. Si un PDF supera ese tamaño, comprímelo antes de subirlo.
