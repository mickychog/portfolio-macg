# Portfolio MACG

Portafolio profesional bilingüe de Miguel Angel Choque Garcia, orientado a desarrollo Full Stack, Cloud & DevOps e ingeniería electrónica. Presenta proyectos, experiencia, formación, certificaciones, habilidades, charlas y un formulario de contacto.

El contenido profesional se mantiene en TypeScript: el proyecto no utiliza base de datos ni panel administrativo. Esto reduce la superficie de ataque, el mantenimiento y los recursos necesarios para desplegarlo.

## Tecnología

- Vinext, React 19 y TypeScript estricto
- Tailwind CSS 4 y CSS personalizado
- Cloudflare Workers como runtime de producción
- Zod para validar el formulario de contacto
- Resend y Cloudflare Turnstile como integraciones opcionales
- React Icons para iconos de GitHub, LinkedIn, Gmail y WhatsApp

## Desarrollo local

Requisitos: Node.js 22.13 o superior y npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

## Guía para actualizar el contenido

La fuente principal es `lib/portfolio-data.ts`. Allí se encuentran `copy`, `projects`, `experiences`, `education`, `certificates`, `skillGroups`, `contributions`, `approach` y `talkTopics`.

### Modificar un texto existente

Busca el campo dentro de `copy.es` y actualiza también su equivalente en `copy.en`:

```ts
// Español
intro: "Nueva presentación profesional...",

// Inglés
intro: "New professional introduction...",
```

### Añadir un proyecto bilingüe

Agrega un objeto al arreglo `projects`. Los campos que se muestran al visitante utilizan `{ es, en }`:

```ts
{
  name: "Nombre del proyecto",
  type: "Full Stack",
  role: {
    es: "Desarrollador Full Stack · Organización",
    en: "Full Stack Developer · Organization",
  },
  description: {
    es: "Descripción en español.",
    en: "Description in English.",
  },
  result: {
    es: "Resultado o métrica obtenida",
    en: "Outcome or measured result",
  },
  stack: ["React", "NestJS", "PostgreSQL"],
},
```

El valor de `type` debe coincidir con uno de los filtros existentes: `Backend`, `Full Stack`, `IA y datos` o `Cloud & DevOps`.

### Añadir un certificado

Los archivos se guardan en `public/certificates/`. En el código se referencian comenzando con `/certificates/`, nunca con `public/`.

Ejemplo con una imagen local optimizada:

```ts
{
  title: "Nombre del certificado",
  titleEn: "Certificate name",
  organization: "Entidad emisora",
  period: "Agosto 2026 · 40 horas",
  periodEn: "August 2026 · 40 hours",
  summary: "Descripción en español.",
  summaryEn: "Description in English.",
  tags: ["TypeScript", "Cloud"],
  category: "Full Stack",
  preview: {
    type: "image",
    src: "/certificates/nombre-certificado.webp",
  },
  credentialUrl: "https://sitio-oficial.com/credencial",
},
```

Para un PDF local, copia el documento en la misma carpeta y cambia la vista previa:

```ts
preview: {
  type: "pdf",
  src: "/certificates/nombre-certificado.pdf",
},
```

Para Google Drive, configura el archivo como público para cualquiera con el enlace y utiliza la URL `/preview`:

```ts
preview: {
  type: "embed",
  src: "https://drive.google.com/file/d/ID_DEL_ARCHIVO/preview",
},
```

Para Credly, Badgr u otro proveedor de badges, lo más estable es descargar la imagen del badge, guardarla en `public/certificates/`, usar `type: "image"` y colocar la página oficial en `credentialUrl`. Muchas plataformas bloquean su página dentro de un `iframe`, por lo que no conviene usar la URL pública como `embed` salvo que el proveedor confirme que lo permite.

Formatos recomendados: WebP o AVIF para imágenes y PDF optimizado para documentos. Usa nombres en minúsculas, sin espacios ni acentos, por ejemplo `aws-cloud-practitioner.webp`.

### Reglas bilingües

- En objetos con estructura `{ es, en }`, completa ambos valores.
- En certificados, español utiliza `title`, `period` y `summary`; inglés utiliza `titleEn`, `periodEn` y `summaryEn`.
- Si temporalmente falta la traducción inglesa de un certificado, el sitio muestra el texto español como respaldo.
- `organization`, nombres de tecnologías y nombres propios pueden permanecer iguales si no necesitan traducción.

### Verificar y publicar una actualización

```bash
npm run lint
npm test
git add .
git commit -m "content: update portfolio information"
git push origin main
```

No publiques si `lint`, la compilación o las pruebas presentan errores.

## Formulario de contacto

Variables disponibles en `.env.example`:

- `CONTACT_TO_EMAIL`: correo que recibirá los mensajes.
- `PORTFOLIO_FROM_EMAIL`: remitente verificado en Resend.
- `RESEND_API_KEY`: clave privada de Resend.
- `TURNSTILE_SECRET_KEY` y `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: protección opcional con Cloudflare Turnstile.

Si Resend no está configurado, la interfaz abre el cliente de correo del visitante como alternativa. El endpoint valida los datos con Zod, incluye un campo honeypot, limita intentos y admite Turnstile.

## Comandos

- `npm run dev`: servidor de desarrollo.
- `npm run build`: compilación optimizada de producción.
- `npm run start`: ejecución local de la compilación.
- `npm run lint`: revisión estática del código.
- `npm test`: compilación y pruebas del HTML renderizado.

## Despliegue

El proyecto queda preparado para OpenAI Sites y Cloudflare Workers. `.openai/hosting.json` solo conserva el identificador del proyecto; no existen bindings de base de datos ni almacenamiento.

Antes de publicar una versión:

1. Configura las variables de correo y Turnstile en el proveedor.
2. Ejecuta `npm run lint` y `npm test`.
3. Publica la compilación generada por Vinext.

Cloudflare Workers es la alternativa externa más directa para esta arquitectura. GitHub Pages requiere convertir el sitio a una exportación completamente estática y reemplazar el endpoint de contacto por un servicio externo o un enlace `mailto:`.
