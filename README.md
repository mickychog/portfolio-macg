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

## Actualizar el contenido

Los textos, proyectos, experiencia, formación, certificados, stack y charlas están en `lib/portfolio-data.ts`.

- Añade el contenido en español y su traducción inglesa en la misma entrada.
- Si todavía no existe traducción, el helper de certificados utiliza el texto español como respaldo.
- Para mostrar una imagen de certificado, guarda el archivo en `public/certificates/` y añade `imagePath: "/certificates/nombre-del-archivo.webp"` al certificado correspondiente.
- Las imágenes públicas deben estar optimizadas; WebP o AVIF son las opciones recomendadas.

Después de modificar el contenido:

```bash
npm run lint
npm test
```

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
