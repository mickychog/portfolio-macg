# portfolio-macg

Portafolio profesional de Miguel Angel Choque Garcia. La página pública presenta proyectos, experiencia, formación, certificaciones, habilidades y contacto; el área `/admin` permite añadir contenido sin editar el código.

## Tecnología

- Vinext/React y TypeScript estricto
- Tailwind CSS y CSS personalizado
- Cloudflare Workers, D1 y R2
- Drizzle ORM y Zod
- Resend y Cloudflare Turnstile para contacto

## Desarrollo local

1. Copia `.env.example` como `.env.local` y configura solo las integraciones que necesites.
2. Ejecuta `npm run dev`.
3. Visita `/` para el portafolio y `/admin` para el panel local.

El portafolio funciona sin las credenciales de correo; en ese caso el formulario abre el cliente de correo como alternativa. En producción, `/admin` exige autenticación y que el correo coincida con `ADMIN_EMAIL`.

## Comandos

- `npm run dev`: desarrollo
- `npm run build`: compilación de producción
- `npm run lint`: revisión estática
- `npm run db:generate`: generar migraciones D1
- `npm test`: compilar y probar el HTML renderizado
