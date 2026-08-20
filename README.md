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

La fuente principal es `lib/portfolio-data.ts`. Allí se encuentran `copy`, `heroTechnologies`, `projects`, `experiences`, `education`, `certificates`, `skillGroups`, `contributions`, `approach` y `talkTopics`.

Los siguientes ejemplos muestran la estructura exacta que acepta actualmente el sitio. Añade cada objeto dentro del arreglo correspondiente, separado por una coma.

### Modificar un texto existente

Busca el campo dentro de `copy.es` y actualiza también su equivalente en `copy.en`:

```ts
// Español
intro: "Nueva presentación profesional...",

// Inglés
intro: "New professional introduction...",
```

`copy.es` y `copy.en` también contienen la presentación, métricas, títulos de sección, formulario, botones, navegación, tooltips y footer. Por ejemplo, para cambiar una métrica del inicio modifica la misma posición en ambos idiomas:

```ts
// Dentro de copy.es
metrics: [
  ["3+", "productos desarrollados de punta a punta"],
],

// Dentro de copy.en
metrics: [
  ["3+", "products built end to end"],
],
```

Para añadir o quitar tecnologías pequeñas del hero, edita `heroTechnologies`:

```ts
export const heroTechnologies = [
  "TypeScript",
  "React",
  "NestJS",
  "PostgreSQL",
  "Docker",
  "AWS",
];
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

### Añadir experiencia

Agrega un objeto a `experiences`:

```ts
{
  period: { es: "Agosto 2026 — Actualidad", en: "August 2026 — Present" },
  company: "Nombre de la empresa",
  role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
  category: "Full Stack",
  description: {
    es: "Responsabilidad principal y resultado conseguido.",
    en: "Main responsibility and achieved outcome.",
  },
},
```

### Añadir formación académica

Agrega un objeto a `education`:

```ts
{
  degree: {
    es: "Diplomado en Arquitectura de Software",
    en: "Diploma in Software Architecture",
  },
  institution: "Nombre de la institución",
  period: "2026",
  status: { es: "Completado", en: "Completed" },
},
```

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

### Añadir un grupo de Stack & Skills

Agrega un objeto a `skillGroups`:

```ts
{
  icon: "cloud",
  title: { es: "Plataformas cloud", en: "Cloud platforms" },
  lead: {
    es: "Servicios desplegables, observables y seguros.",
    en: "Deployable, observable and secure services.",
  },
  items: ["AWS", "Azure", "Cloudflare", "Docker", "Terraform", "CI/CD"],
},
```

Los iconos disponibles son `frontend`, `backend`, `data`, `cloud`, `quality`, `systems`, `fullstack`, `architecture`, `ai`, `performance`, `discover`, `design`, `build`, `validate`, `measure`, `projects`, `education`, `certificate`, `tools` y `teamwork`. Si se usa otro nombre, la interfaz muestra el icono de código como respaldo. Para registrar un icono nuevo, impórtalo y añádelo al objeto `cardIcons` en `app/components/Portfolio.tsx`.

### Añadir algo que aportas al equipo

Agrega un objeto a `contributions`:

```ts
{
  icon: "teamwork",
  title: { es: "Colaboración clara", en: "Clear collaboration" },
  text: {
    es: "Comunico decisiones, riesgos y avances de forma concreta.",
    en: "I communicate decisions, risks and progress clearly.",
  },
},
```

### Añadir un paso a Mi enfoque

Agrega un objeto a `approach`. Mantén `n` consecutivo porque se muestra dentro de la tarjeta:

```ts
{
  n: "06",
  icon: "teamwork",
  es: "Compartir lo aprendido",
  en: "Share what was learned",
  text: {
    es: "Documentar decisiones para que el equipo pueda reutilizarlas.",
    en: "Document decisions so the team can reuse them.",
  },
},
```

### Añadir una charla o tema de charla

Agrega un objeto a `talkTopics`:

```ts
{
  icon: "cloud",
  title: {
    es: "Despliegues confiables para proyectos pequeños",
    en: "Reliable deployments for small projects",
  },
  text: {
    es: "Demo práctica con CI/CD, observabilidad y rollback.",
    en: "Practical demo covering CI/CD, observability and rollback.",
  },
},
```

Actualmente estas tarjetas representan temas propuestos y muestran el estado “Próximamente”. Cuando exista una charla publicada, conviene ampliar el tipo con fecha, evento y URL del video o diapositivas, y mostrar esos campos en `app/components/Portfolio.tsx`.

### Cambiar enlaces de contacto y redes

El correo, teléfono, mensaje de WhatsApp, GitHub y LinkedIn están en `app/components/Portfolio.tsx`. Busca `whatsappUrl`, `mailto:`, `github.com` y `linkedin.com` y reemplaza todas las apariciones. En un enlace de WhatsApp usa el teléfono con código de país y sin `+`, espacios ni guiones:

```ts
const whatsappUrl =
  "https://wa.me/59170000000?text=Hola%20Miguel%2C%20vi%20tu%20portafolio.";
```

### Cambiar imágenes y archivos públicos

Todo archivo dentro de `public/` se publica desde la raíz del sitio. Por ejemplo, `public/images/profile.webp` se utiliza en el código como `/images/profile.webp`; nunca se escribe `public/` dentro de la URL.

#### Fotografía principal del hero

La tarjeta principal ya apunta a esta ruta fija:

```text
public/images/profile.webp
```

Solo debes crear o reemplazar ese archivo conservando exactamente el nombre `profile.webp`. No es necesario modificar TypeScript. Mientras el archivo no exista o no pueda cargarse, la tarjeta mostrará las iniciales `MC` como respaldo.

Recomendaciones para la fotografía:

- Formato WebP.
- Orientación vertical, preferiblemente proporción 4:5.
- Tamaño recomendado: `1200 × 1500 px`.
- Peso recomendado: menos de 500 KB.
- Encuadre desde el pecho, con el rostro centrado y espacio alrededor de la cabeza.
- Fondo sencillo y buen contraste con azul oscuro.

La imagen utiliza `object-fit: cover`. Si necesitas subir o bajar el encuadre, cambia `object-position: center 18%` en `.portrait-photo-image`, dentro de `app/globals.css`.

#### Imagen para compartir el sitio

`public/og.png` es la imagen que aparece al compartir el enlace en LinkedIn, WhatsApp, X, Slack y otras plataformas. La versión actual utiliza la identidad visual azul del sitio y comunica `Full Stack Developer · Cloud · DevOps · IA`.

Si la reemplazas, utiliza una proporción cercana a `1.91:1`, texto grande y márgenes seguros. Un tamaño estándar es `1200 × 630 px`. Si cambias sus dimensiones, actualiza también `width` y `height` dentro de `app/layout.tsx`.

#### Certificados, CV y favicon

- Certificados y badges: `public/certificates/`.
- CV descargable: `public/cv-miguel-choque.pdf`.
- Icono del navegador: `public/favicon.svg`.

Usa nombres en minúsculas, sin espacios ni acentos. Optimiza las imágenes antes de publicarlas y evita subir originales de varios megabytes. Si reemplazas un archivo manteniendo el mismo nombre y todavía aparece la versión anterior, vuelve a desplegar y limpia la caché del navegador o de la plataforma.

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

Para desarrollo local, copia `.env.example` como `.env.local`. Nunca subas `.env.local`, claves de API ni secretos a GitHub.

```dotenv
CONTACT_TO_EMAIL=mickychog@gmail.com
PORTFOLIO_FROM_EMAIL=Portafolio Miguel Choque <contacto@miguelchoque.dev>
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
TURNSTILE_SECRET_KEY=0x0000000000000000000000000000000AA
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxxxxxxxxxxxx
```

| Variable | Qué debes colocar | Visibilidad |
| --- | --- | --- |
| `CONTACT_TO_EMAIL` | La bandeja que recibirá los mensajes, por ejemplo `mickychog@gmail.com`. | Servidor |
| `PORTFOLIO_FROM_EMAIL` | Nombre y dirección de un dominio verificado en Resend, por ejemplo `Portafolio Miguel Choque <contacto@miguelchoque.dev>`. | Servidor |
| `RESEND_API_KEY` | Una API key creada en el panel de Resend después de verificar el dominio. | Secreto |
| `TURNSTILE_SECRET_KEY` | Clave privada del widget de Cloudflare Turnstile; se usa en `/api/contact` para validar el token. | Secreto |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Clave pública del widget. Debe autorizar el dominio real del portafolio. | Pública, llega al navegador |

No uses una dirección Gmail como `PORTFOLIO_FROM_EMAIL`: el remitente debe pertenecer al dominio que verificaste en Resend. Sí puedes mantener Gmail en `CONTACT_TO_EMAIL`. Para producción, crea estas variables en el panel del hosting; no copies el archivo `.env.local` al servidor. En Cloudflare, conserva `RESEND_API_KEY` y `TURNSTILE_SECRET_KEY` como secretos.

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

### Proveedor recomendado

Cloudflare Workers es la alternativa externa más directa para esta arquitectura: Vinext ya genera un Worker y los recursos estáticos se sirven desde la misma plataforma. El plan gratuito es suficiente para el tráfico normal de un portafolio; hay que vigilar sus límites de solicitudes y CPU.

OpenAI Sites también es compatible con el proyecto actual. GitHub Pages solo conviene si se convierte el sitio a una exportación completamente estática y se reemplaza `/api/contact` por un servicio externo o un enlace `mailto:`.

### ¿Conviene AWS?

AWS puede alojar el portafolio, pero no es la opción más simple para esta implementación:

- Amplify Hosting detecta aplicaciones Next.js compatibles, mientras que Vinext necesitaría adaptación o una migración a Next.js.
- S3 por sí solo no ejecuta `/api/contact`; habría que añadir CloudFront, Lambda/API Gateway y un proveedor de correo, o eliminar la ruta dinámica.
- Para cuentas nuevas, el plan gratuito de AWS se basa en créditos y tiene duración limitada. Configura AWS Budgets y alertas de facturación antes de desplegar.

AWS sí puede ser conveniente como proyecto de aprendizaje para demostrar conocimientos cloud. Para publicar este portafolio con menos mantenimiento y riesgo de cargos, se recomienda Cloudflare Workers.

## Dominio recomendado

El dominio y el hosting son compras separadas: un hosting gratuito no suele incluir un dominio personalizado gratuito. Orden sugerido:

1. `miguelchoque.dev`: corto, profesional y alineado con desarrollo de software.
2. `miguelangelchoque.com`: marca personal amplia, aunque más largo.
3. `miguelchoque.me`: apropiado para un sitio personal.
4. `miguelchoquegarcia.com`: coincide con el nombre completo, pero es largo.
5. `macg.dev`: breve, aunque las iniciales son menos fáciles de descubrir y recordar.

La recomendación principal es `miguelchoque.dev`, con el sitio en el dominio raíz, redirección desde `www` y un remitente como `contacto@miguelchoque.dev`. Evita guiones, años y nombres ligados a una sola tecnología. La disponibilidad y el precio cambian en tiempo real, por lo que deben comprobarse antes de comprar. Cloudflare Registrar es una opción razonable si también se usa Cloudflare para DNS y hosting.
