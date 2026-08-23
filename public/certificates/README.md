# Certificados y Credenciales

Este directorio almacena los archivos estáticos de certificados que desees alojar localmente.

El portafolio admite **3 métodos** para mostrar certificados desde `lib/portfolio-data.ts`:

---

### 1. Solo Enlace (Credly, LinkedIn, Google Drive) — *Sin archivos locales*
Si no deseas subir ningún archivo ni convertir formatos, solo coloca la URL en `credentialUrl` y omite `preview`:
```ts
{
  title: "Nombre del Certificado",
  titleEn: "Certificate Name",
  organization: "Organización emisora",
  period: "Periodo",
  summary: "Resumen de lo aprendido.",
  tags: ["Tag1", "Tag2"],
  category: "Full Stack",
  credentialUrl: "https://www.credly.com/users/tu-usuario",
}
```
* **Resultado:** Muestra la información y el botón *"Ver credencial verificada ↗"* que abre la página externa.

---

### 2. Google Drive Embebido (`type: "embed"`) — *Sin archivos locales*
Para previsualizar un PDF alojado en Google Drive dentro del modal sin subirlo al repositorio, usa la URL con `/preview`:
```ts
{
  title: "Nombre del Certificado",
  organization: "Institución",
  // ...
  credentialUrl: "https://drive.google.com/file/d/ID_DEL_ARCHIVO/view?usp=sharing",
  preview: {
    type: "embed",
    src: "https://drive.google.com/file/d/ID_DEL_ARCHIVO/preview",
  },
}
```
> **Nota:** El archivo en Google Drive debe tener permisos públicos de lectura (*"Cualquiera con el enlace puede ver"*).

---

### 3. Imagen o PDF Local (`type: "image"` o `type: "pdf"`)
Coloca tus imágenes o PDFs en este directorio (`public/certificates/`) y referéncialos con `/certificates/...`:
```ts
preview: {
  type: "image", // o "pdf"
  src: "/certificates/nombre-del-archivo.webp",
}
```
- **Formatos recomendados:** `.webp` o `.avif` para imágenes de alta definición y bajo peso; `.pdf` para documentos.
- **Convención de nombres:** Minúsculas, sin espacios ni acentos (ej. `innovacode-fullstack-php.webp`).
