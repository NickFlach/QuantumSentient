# Overview

This is a full-stack web application built with React, Express, and PostgreSQL, designed as a landing page with a preorder collection system for Space Child's "Quantum Phone". The application features a Dark Future aesthetic with quantum-engineering messaging, emphasizing honeycomb-lattice quantum materials and graphene 2D architecture.

The narrative centers on real quantum breakthroughs: the device leverages quantum materials—honeycomb-lattice magnets and graphene 2D materials—to deliver capabilities far beyond classical electronics, including optimized energy use, ultra-secure communications via Quantum Key Distribution (QKD), real-time quantum sensing, and quantum-enhanced processing through Hybrid Quantum/Classical Compute Units (HQCU). Custom fonts (Space Grotesk for headlines, JetBrains Mono for UI) reinforce the cyberpunk-meets-science aesthetic.

The application follows a modern monorepo structure with separate client and server directories, using TypeScript throughout. The frontend is built with React and Vite, styled with Tailwind CSS and shadcn/ui components, while the backend uses Express with a PostgreSQL database managed through Drizzle ORM. Email functionality sends unique access codes via SMTP with proper secure connection handling.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Build System**
- Uses Vite as the build tool and development server, configured to serve from the `client` directory
- React as the UI framework with TypeScript support
- Wouter for client-side routing (lightweight React Router alternative)
- Single-page application architecture with a main App component and route-based page rendering

**Styling Strategy**
- Tailwind CSS v4 (using `@import "tailwindcss"` syntax) for utility-first styling
- Custom theme configuration with CSS variables for consistent design tokens (colors, radii, fonts)
- shadcn/ui component library (New York style variant) providing pre-built, customizable components
- Custom fonts loaded from Google Fonts: Space Grotesk for headlines, JetBrains Mono for technical UI elements

**State Management**
- React Query (TanStack Query) for server state management with custom query client configuration
- Custom hooks for reusable logic (use-mobile, use-toast)
- Form state managed through React Hook Form with Zod validation integration

**Component Architecture**
- Radix UI primitives for accessible, unstyled component foundations
- Comprehensive UI component library in `client/src/components/ui/` covering all common patterns
- Path aliases configured for clean imports (@/, @shared/, @assets/)

## Backend Architecture

**Server Framework**
- Express.js server with TypeScript and ES modules
- Custom Vite integration for development (middleware mode) and production serving
- Request logging middleware tracking API response times and payloads
- Raw body preservation for webhook/signature verification use cases

**API Design**
- RESTful API structure with routes registered through a central `registerRoutes` function
- Single endpoint implemented: POST `/api/preorder` for collecting preorder emails
- Error handling with proper HTTP status codes (400 for validation, 409 for duplicates, 500 for server errors)
- Zod schema validation on API inputs

**Data Layer Pattern**
- Storage abstraction through an `IStorage` interface allowing for future implementation swaps
- DatabaseStorage class implementing the interface with Drizzle ORM
- Repository pattern separating business logic from data access
- Type-safe database operations with full TypeScript inference

## Database Architecture

**ORM & Schema**
- Drizzle ORM for type-safe database interactions
- PostgreSQL as the database (configured for Neon serverless)
- Schema defined in shared directory for type sharing between client and server
- Drizzle Kit for migrations management (push-based workflow)

**Data Model**
- Single `preorders` table with fields:
  - `id`: Auto-incrementing primary key
  - `email`: Unique, required text field
  - `ip`: Optional text field for tracking
  - `createdAt`: Timestamp with default to current time
- Zod schemas derived from Drizzle tables for runtime validation

**Database Connection**
- Neon serverless PostgreSQL with WebSocket support (configured for serverless environments)
- Connection pooling through @neondatabase/serverless
- Environment-based configuration via DATABASE_URL

## Development & Build Process

**Development Workflow**
- Separate dev commands for client (Vite) and server (tsx with watch mode)
- Hot module replacement for React components
- TypeScript compilation checking without emission
- Replit-specific plugins for enhanced development experience

**Production Build**
- Vite builds client to `dist/public`
- esbuild bundles server code to `dist` with external package resolution
- ES modules throughout the stack
- Single production start command serving both static assets and API

**Type Safety**
- Shared types between client and server through `shared/` directory
- Path mapping in tsconfig for clean imports
- Strict TypeScript configuration
- Drizzle-zod integration for schema-to-validator generation

# External Dependencies

## Database & Infrastructure
- **Neon PostgreSQL**: Serverless PostgreSQL database with WebSocket support for edge deployments
- **Drizzle ORM**: TypeScript ORM for type-safe database operations and schema management

## Frontend Libraries
- **React Query (@tanstack/react-query)**: Server state management and data fetching
- **Radix UI**: Comprehensive collection of accessible, unstyled component primitives
- **shadcn/ui**: Curated component library built on Radix UI with Tailwind styling
- **Wouter**: Lightweight routing library for React
- **Framer Motion**: Animation library (referenced in code but noted as removed in package.json)
- **Lucide React**: Icon library
- **Zod**: Schema validation library
- **React Hook Form**: Form state management with validation

## Build Tools & Development
- **Vite**: Frontend build tool and development server with custom plugins
- **Tailwind CSS**: Utility-first CSS framework (v4)
- **TypeScript**: Type safety across the entire stack
- **esbuild**: Fast JavaScript bundler for server-side code
- **tsx**: TypeScript execution for development server

## Backend Libraries
- **Express**: Web application framework
- **ws**: WebSocket library for Neon database connection
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation

## Asset Management
- Custom fonts from Google Fonts (Space Grotesk, JetBrains Mono)
- Generated video and image assets stored in `attached_assets/` directory
- Assets imported directly in React components via Vite
- Favicon and OG image (1920x1080) served from `client/public/` directory
- Meta tags configured for social sharing with quantum-engineering messaging

## Email Service
- Nodemailer SMTP integration with secure connection handling
- Port 465 (implicit TLS) for Zoho SMTP provider
- Sends unique nanoid-based access codes to preorder emails
- Includes messaging about future contact directives
- Connection verified before each send with transporter.verify()

## Recent Updates (January 20, 2026)
- **Quantum Phone Specification Update**: Complete refresh based on new quantum materials architecture specification
- **Core Positioning**: "Beyond classical electronics. Quantum-enhanced intelligence."
- **Quantum Materials Architecture**:
  1. Honeycomb Quantum Core - Honeycomb-lattice quantum materials enabling emergent quantum states
  2. Quantum Secure Comms - QKD module with entangled spin states, on-chip QRNG
  3. Graphene Thermal System - Graphene heat spreaders and quantum battery interfaces
  4. Quantum Sensor Array - Spintronics magnetometers and graphene electro-optical sensors
  5. Quantum Identity - Biometrics + quantum tokens with AI-guided sensing
  6. Hybrid Quantum/Classical - HQCU with spin-based qubits and graphene quantum channels
- **Technical Brief**: Updated specs reflecting quantum materials layers (Display Interface, Quantum Sensor Layer, Quantum Interconnect, Qubit Layer, Power & Thermal, Classical Compute)
- **Roadmap**: 2026 prototype → 2027 interconnect integration → 2028 hybrid prototype → 2030 commercial launch
- **AI Presskit API**: Updated with new differentiators, technology readiness levels, and materials architecture
- **Feature Cards**: Six cards representing core quantum capabilities

## SEO/GEO Implementation (December 18, 2025)

**Search Engine Optimization**
- Comprehensive meta tags targeting investors, phone manufacturers, space industry, defense, intelligence
- JSON-LD structured data: Organization, Product, FAQ schemas for rich search snippets
- Geo-targeting meta tags (San Francisco coordinates)
- robots.txt with explicit AI crawler permissions (GPTBot, Claude-Web, PerplexityBot, etc.)
- XML sitemap at /sitemap.xml

**Generative Engine Optimization (GEO)**
- AI-summary and AI-keywords meta tags for LLM discovery
- Custom `application/vnd.spacechild.geo+json` script block with machine-readable product data
- `/api/ai-presskit` endpoint returning comprehensive JSON for AI agents
- FAQ schema data optimized for AI extraction

**Hidden Signals & Easter Eggs**
- Steganographic HTML comments with RF call-signs and contact emails
- Honey URLs in robots.txt for monitoring interested crawlers
- `/.well-known/spacechild-signal.txt` with encrypted coordinates and intel
- Konami code Easter egg (↑↑↓↓←→←→BA) reveals classified partnership message

**Target Audiences**
- Strategic investors (defense, aerospace portfolios)
- Phone manufacturers/OEMs
- Satellite constellation operators
- Intelligence agencies
- Space industry professionals
- Technologists and engineers

## Known Implementation Details
- Email sending now reliable with proper port/secure config (465 = secure: true)
- Pre-order form successfully validates email uniqueness, generates access codes, sends emails
- Mock email mode enabled when SMTP credentials missing (for testing)
- Database stores email, IP address, access code, and timestamp for all preorders
- Product video updated to realistic style (December 2025)