import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPreorderSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/preorder", async (req, res) => {
    try {
      const data = insertPreorderSchema.parse({
        ...req.body,
        ip: req.ip
      });

      // Check if email already exists to prevent duplicates error
      const existing = await storage.getPreorder(data.email);
      if (existing) {
        return res.status(409).json({ message: "Email already registered" });
      }

      const preorder = await storage.createPreorder(data);
      res.status(201).json(preorder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.error("Preorder error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
