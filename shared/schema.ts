import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const preorders = pgTable("preorders", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  ip: text("ip"),
  accessCode: text("access_code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPreorderSchema = createInsertSchema(preorders).pick({
  email: true,
  ip: true,
}).extend({
  email: z.string().email("Invalid email address")
});

export type InsertPreorder = z.infer<typeof insertPreorderSchema>;
export type Preorder = typeof preorders.$inferSelect;
