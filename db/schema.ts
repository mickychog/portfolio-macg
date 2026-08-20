import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const portfolioItems = sqliteTable(
  "portfolio_items",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    type: text("type", { enum: ["project", "experience", "course", "certificate"] }).notNull(),
    title: text("title").notNull(),
    organization: text("organization").notNull().default(""),
    period: text("period").notNull().default(""),
    summary: text("summary").notNull().default(""),
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
