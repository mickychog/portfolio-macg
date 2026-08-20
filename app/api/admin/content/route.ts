import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { portfolioItems } from "@/db/schema";
import { isPortfolioAdmin } from "@/lib/admin-auth";

const itemSchema = z.object({
  type: z.enum(["project", "experience", "course", "certificate"]),
  title: z.string().trim().min(2).max(160),
  organization: z.string().trim().max(160).default(""),
  period: z.string().trim().max(80).default(""),
  summary: z.string().trim().min(10).max(2000),
  tags: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  category: z.string().trim().max(60).default("Backend"),
  credentialUrl: z.string().url().nullable().optional(),
  fileKey: z.string().trim().max(160).nullable().optional(),
  published: z.boolean().default(true),
  sortOrder: z.number().int().min(0).max(999).default(0),
});

async function rejectUnauthorized() {
  return (await isPortfolioAdmin()) ? null : Response.json({ error: "No autorizado" }, { status: 403 });
}

export async function GET() {
  const rejected = await rejectUnauthorized(); if (rejected) return rejected;
  const rows = await getDb().select().from(portfolioItems).orderBy(asc(portfolioItems.sortOrder), asc(portfolioItems.id));
  return Response.json({ items: rows.map((row) => ({ ...row, tags: JSON.parse(row.tags) })) });
}

export async function POST(request: Request) {
  const rejected = await rejectUnauthorized(); if (rejected) return rejected;
  const parsed = itemSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Datos inválidos", issues: parsed.error.flatten() }, { status: 400 });
  const [item] = await getDb().insert(portfolioItems).values({ ...parsed.data, tags: JSON.stringify(parsed.data.tags) }).returning();
  return Response.json({ item }, { status: 201 });
}

export async function PATCH(request: Request) {
  const rejected = await rejectUnauthorized(); if (rejected) return rejected;
  const payload = (await request.json().catch(() => null)) as { id?: number; data?: unknown } | null;
  const parsed = itemSchema.partial().safeParse(payload?.data);
  if (!payload?.id || !parsed.success) return Response.json({ error: "Datos inválidos" }, { status: 400 });
  const values = { ...parsed.data, ...(parsed.data.tags ? { tags: JSON.stringify(parsed.data.tags) } : {}), updatedAt: new Date().toISOString() };
  const [item] = await getDb().update(portfolioItems).set(values).where(eq(portfolioItems.id, payload.id)).returning();
  return Response.json({ item });
}

export async function DELETE(request: Request) {
  const rejected = await rejectUnauthorized(); if (rejected) return rejected;
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!Number.isInteger(id) || id < 1) return Response.json({ error: "ID inválido" }, { status: 400 });
  await getDb().delete(portfolioItems).where(eq(portfolioItems.id, id));
  return new Response(null, { status: 204 });
}
