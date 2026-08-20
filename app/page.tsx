import { asc, eq } from "drizzle-orm";
import { Portfolio } from "./components/Portfolio";
import { getDb } from "@/db";
import { portfolioItems } from "@/db/schema";
import type { ManagedItem } from "@/lib/portfolio-data";

export const dynamic = "force-dynamic";

async function loadManagedItems(): Promise<ManagedItem[]> {
  try {
    const rows = await getDb().select().from(portfolioItems).where(eq(portfolioItems.published, true)).orderBy(asc(portfolioItems.sortOrder));
    return rows.map((row) => ({ ...row, tags: JSON.parse(row.tags) as string[] }));
  } catch {
    return [];
  }
}

export default async function Home() {
  return <Portfolio managedItems={await loadManagedItems()} turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />;
}
