import { env } from "cloudflare:workers";
import { isPortfolioAdmin } from "@/lib/admin-auth";

const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export async function POST(request: Request) {
  if (!(await isPortfolioAdmin())) return Response.json({ error: "No autorizado" }, { status: 403 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Archivo requerido" }, { status: 400 });
  const extension = allowedTypes.get(file.type);
  if (!extension || file.size > 6 * 1024 * 1024) return Response.json({ error: "Formato o tamaño no permitido" }, { status: 400 });
  if (!env.MEDIA) return Response.json({ error: "Almacenamiento no configurado" }, { status: 503 });
  const key = `certificate-${crypto.randomUUID()}.${extension}`;
  await env.MEDIA.put(key, file.stream(), { httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" }, customMetadata: { originalName: file.name.slice(0, 120) } });
  return Response.json({ key }, { status: 201 });
}
