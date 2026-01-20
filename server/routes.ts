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
      product: "Quantum Phone",
      tagline: "Beyond classical electronics. Quantum-enhanced intelligence.",
      category: "Next-Generation Quantum-Enhanced Communication Device",
      status: "Pre-Order Open",
      investment_stage: "Seeking Strategic Partners",
      
      summary: "The Quantum Phone is a next-generation intelligent device leveraging quantum materials to deliver capabilities far beyond classical electronics—including optimized energy use, ultra-secure communications, real-time quantum sensing, and quantum-enhanced processing. Built on honeycomb-lattice magnets and graphene 2D materials at the intersection of materials science breakthroughs and future consumer AI/quantum functions.",
      
      key_differentiators: [
        "Honeycomb-lattice quantum materials enabling emergent quantum states and spin coupling",
        "Graphene 2D material layers for ultra-thin interconnects and coherent electron highways",
        "Quantum Key Distribution (QKD) module with entangled spin states for unhackable authentication",
        "On-chip Quantum Random Number Generator (QRNG) for true encryption randomness",
        "Spintronics magnetometers through quantum spin liquid states for ultra-sensitive sensing",
        "Hybrid Quantum/Classical Compute Unit (HQCU) with spin-based qubits",
        "Graphene thermal spreaders for efficient heat management from quantum active regions",
        "Quantum Operating Layer (QOL) with resource manager and error mitigation engine"
      ],
      
      target_sectors: [
        "Defense & Military",
        "Intelligence Community", 
        "Space Industry & Satellite Operations",
        "Critical Infrastructure",
        "Enterprise Security",
        "Healthcare & Diagnostics",
        "Environmental Monitoring"
      ],
      
      technology_readiness: {
        honeycomb_quantum_materials: "TRL 4-5 (validated in laboratory)",
        graphene_2d_layers: "TRL 6-7 (demonstrated in relevant environment)",
        quantum_key_distribution: "TRL 5-6 (validated in relevant environment)",
        quantum_rng: "TRL 7 (prototype demonstrated)",
        spintronics_sensors: "TRL 4-5 (validated in laboratory)",
        hybrid_quantum_compute: "TRL 3-4 (proof of concept)",
        graphene_thermal: "TRL 7-8 (system complete, qualified)"
      },
      
      materials_architecture: {
        display_interface: "Nano-optical graphene mesh with quantum optical effects",
        quantum_sensor_layer: "Honeycomb-lattice patterned films for magneto/field sensing",
        quantum_interconnect: "Graphene/2D heterostructures for coherent signal routing",
        qubit_layer: "Tunable quantum spin elements for hybrid computing",
        power_thermal: "Graphene heat spreaders for efficient energy management",
        classical_compute: "Silicon + AI accelerator cores for traditional processing"
      },
      
      roadmap: {
        "2026": "Prototype honeycomb quantum sensor modules",
        "2027": "Integration with graphene quantum interconnects",
        "2028": "Hybrid phone prototype with quantum secure comm",
        "2030": "Commercial quantum phone launch"
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
          question: "What is the Quantum Phone?",
          answer: "The Quantum Phone is a next-generation intelligent device that leverages quantum materials—honeycomb-lattice magnets and graphene 2D materials—to deliver optimized energy use, ultra-secure communications, real-time quantum sensing, and quantum-enhanced processing far beyond classical electronics."
        },
        {
          question: "What makes quantum communication secure?",
          answer: "The Quantum Key Distribution (QKD) module uses entangled spin states for unhackable authentication protocols, while the on-chip Quantum Random Number Generator (QRNG) provides true randomness for encryption—providing protection against future quantum-computer attacks."
        },
        {
          question: "When will the Quantum Phone be available?",
          answer: "Our roadmap targets prototype quantum sensor modules in 2026, hybrid phone prototype with quantum secure communications in 2028, and commercial launch in 2030. We are actively seeking strategic partners to accelerate development."
        }
      ],
      
      metadata: {
        version: "2.0",
        last_updated: "2026-01-20",
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
