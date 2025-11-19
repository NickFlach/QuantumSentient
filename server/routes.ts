import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPreorderSchema } from "@shared/schema";
import { z } from "zod";
import { nanoid } from "nanoid";
import { emailService } from "./email";

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

      // Generate unique access code
      const accessCode = nanoid(12).toUpperCase(); // e.g. X7A9-B2K4-M1N8 (nanoid is URL safe, let's just use raw for now)

      const preorder = await storage.createPreorder({
        ...data,
        accessCode
      });

      // Attempt to send email
      const emailSent = await emailService.sendAccessCode(data.email, accessCode);

      res.status(201).json({ 
        ...preorder, 
        emailSent 
      });
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
