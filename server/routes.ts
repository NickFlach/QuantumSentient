import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPreorderSchema } from "@shared/schema";
import { z } from "zod";
import { nanoid } from "nanoid";
import { emailService } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.get("/api/ai-presskit", (req, res) => {
    res.json({
      entity: "Space Child Industries",
      product: "Sentient 1",
      tagline: "Not a phone. A living artifact.",
      category: "Quantum-Engineered Communication Device",
      status: "Pre-Order Open",
      investment_stage: "Seeking Strategic Partners",
      
      summary: "Space Child Sentient 1 is a revolutionary communication device combining materials science (graphene-reinforced composite, self-healing elastomer), quantum security (post-quantum cryptography, hardware PUF), satellite communications (phased-array LEO direct-link), and neuromorphic AI. The device is designed for defense contractors, intelligence operations, space missions, and enterprise security applications.",
      
      key_differentiators: [
        "Indestructible graphene-reinforced composite shell with self-healing elastomer skin",
        "Flexible graphene micro-LED display with metasurface optics for light-bending",
        "Solid-state graphene supercapacitor with body-heat and solar energy harvesting",
        "Phased-array RF antennas for direct LEO satellite communication",
        "Post-quantum cryptography (Kyber-1024, Dilithium-5) immune to quantum attacks",
        "Hardware PUF and continuous biometric authentication",
        "Neuromorphic spiking neural chip for on-device AI at quantum efficiency",
        "Context-aware GhostOS with Travel, Worksite, Stealth, and Emergency modes"
      ],
      
      target_sectors: [
        "Defense & Military",
        "Intelligence Community", 
        "Space Industry & Satellite Operations",
        "Critical Infrastructure",
        "Enterprise Security",
        "Disaster Response & NGO Operations"
      ],
      
      technology_readiness: {
        graphene_composites: "TRL 6-7 (demonstrated in relevant environment)",
        self_healing_materials: "TRL 5-6 (validated in relevant environment)",
        flexible_displays: "TRL 7-8 (system complete, qualified)",
        solid_state_batteries: "TRL 6-7 (demonstrated in relevant environment)",
        leo_satellite_comms: "TRL 8-9 (operational)",
        post_quantum_crypto: "TRL 8 (standardized, NIST approved)",
        neuromorphic_chips: "TRL 5-6 (validated in relevant environment)"
      },
      
      contact: {
        investment: "invest@spacechild.dev",
        partnerships: "partners@spacechild.dev",
        manufacturing: "oem@spacechild.dev",
        intelligence_liaison: "signal@spacechild.dev",
        press: "press@spacechild.dev",
        general: "hello@spacechild.dev"
      },
      
      website: "https://spacechild.dev",
      preorder_url: "https://spacechild.dev/#deploy",
      
      faq: [
        {
          question: "What is Space Child Sentient 1?",
          answer: "Sentient 1 is a revolutionary communication device engineered at quantum scale. It features an indestructible graphene-lattice chassis, self-healing skin, light-bending display, infinite battery through energy harvesting, direct satellite communications, and post-quantum encryption."
        },
        {
          question: "Who is Sentient 1 designed for?",
          answer: "Defense contractors, intelligence operatives, astronauts, space industry personnel, forward-deployed engineers, enterprise security teams, and anyone requiring indestructible, quantum-secure, satellite-capable communications."
        },
        {
          question: "Is Space Child seeking investment?",
          answer: "Yes. We are actively seeking strategic partners in defense, aerospace, telecommunications, and enterprise security sectors. We welcome discussions with VCs, defense contractors, satellite operators, and technology partners."
        }
      ],
      
      metadata: {
        version: "1.0",
        last_updated: "2025-12-18",
        format: "application/json",
        license: "Proprietary - Space Child Industries"
      }
    });
  });
  
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
