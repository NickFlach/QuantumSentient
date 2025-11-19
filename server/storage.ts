import { type Preorder, type InsertPreorder, preorders } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createPreorder(preorder: InsertPreorder): Promise<Preorder>;
  getPreorder(email: string): Promise<Preorder | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createPreorder(insertPreorder: InsertPreorder): Promise<Preorder> {
    const [preorder] = await db
      .insert(preorders)
      .values(insertPreorder)
      .returning();
    return preorder;
  }

  async getPreorder(email: string): Promise<Preorder | undefined> {
    const [preorder] = await db
      .select()
      .from(preorders)
      .where(eq(preorders.email, email));
    return preorder;
  }
}

export const storage = new DatabaseStorage();
