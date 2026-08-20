import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const portfolioItems = sqliteTable(
  "portfolio_items",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    type: text("type", { enum: ["project", "experience", "course", "certificate", "talk"] }).notNull(),
    title: text("title").notNull(),
    titleEn: text("title_en"),
    organization: text("organization").notNull().default(""),
    organizationEn: text("organization_en"),
    period: text("period").notNull().default(""),
    periodEn: text("period_en"),
    summary: text("summary").notNull().default(""),
    summaryEn: text("summary_en"),
    tags: text("tags").notNull().default("[]"),
    category: text("category").notNull().default("Backend"),
    credentialUrl: text("credential_url"),
    fileKey: text("file_key"),
    published: integer("published", { mode: "boolean" }).notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_portfolio_items_published_sort").on(table.published, table.sortOrder)],
);
