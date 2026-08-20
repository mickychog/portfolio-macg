import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(3).max(140),
  message: z.string().trim().min(20).max(4000),
  website: z.string().max(0).optional().default(""),
  turnstileToken: z.string().optional(),
});

const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(request: Request) {
  const key = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 4;
}

async function verifyTurnstile(token: string | undefined, request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  const ip = request.headers.get("cf-connecting-ip");
  if (ip) body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function POST(request: Request) {
  if (isRateLimited(request)) return Response.json({ error: "Demasiados intentos. Inténtalo en un minuto." }, { status: 429 });

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Revisa los campos del formulario." }, { status: 400 });
  if (!(await verifyTurnstile(parsed.data.turnstileToken, request))) return Response.json({ error: "No se pudo validar la solicitud." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.PORTFOLIO_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return Response.json({ error: "El envío directo se habilitará al conectar el servicio de correo. Abriremos tu aplicación de correo.", fallback: true }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: parsed.data.email,
      subject: `[Portafolio] ${parsed.data.subject}`,
      text: `Nombre: ${parsed.data.name}\nCorreo: ${parsed.data.email}\n\n${parsed.data.message}`,
      html: `<div style="font-family:Arial,sans-serif;color:#0a1623"><h2>Nuevo mensaje desde tu portafolio</h2><p><strong>Nombre:</strong> ${escapeHtml(parsed.data.name)}</p><p><strong>Correo:</strong> ${escapeHtml(parsed.data.email)}</p><p><strong>Asunto:</strong> ${escapeHtml(parsed.data.subject)}</p><hr><p style="white-space:pre-wrap">${escapeHtml(parsed.data.message)}</p></div>`,
    }),
  });
  if (!response.ok) return Response.json({ error: "El servicio de correo no respondió. Inténtalo nuevamente." }, { status: 502 });
  return Response.json({ message: "Mensaje enviado. Gracias por contactarme." });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}
