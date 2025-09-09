# selltoday.ai

## Overview
selltoday.ai is a **real estate–focused AI productivity hub**.  
It connects **projects, brands, storage, and sales tools** into one unified system that empowers agents to create, manage, and sell faster.  

The system is built on a **modular architecture**: each feature is an AI-driven service card that plugs into a shared core (auth, storage, brand kit, project library).

---

## Core Concepts
- **Projects** → AI-curated library, stored per user.  
- **Brand Kit** → logos, colors, contact info applied across tools.  
- **Storage** → central bucket for uploads, connected to projects and outputs.  
- **Service Cards** → independent AI-powered tools (ads, reels, emails, PDFs, etc.).  
- **AI Co-Pilot** → assistant that guides flows, connects data, and suggests next steps.  

---

## Features
- Instant Ad Creation  
- Automated Rebranding  
- PDF Smart Editor  
- Landing Page Generator  
- Social Post Writer  
- Listing Details Generator  
- Email Marketing Creator  
- AI Story Designer  
- AI Reel Designer  
- TikTok Video Editor  
- Precision Targeting  
- WhatsApp Campaign Manager  
- CRM Memory Assistant  
- Investor Matching  
- Market Trend Reports  

(Each service runs as a card in `/dashboard` and connects back to **Projects + Brand + Storage**).  

---

## Data Model (Firestore)
```ts
users/{uid}
  profile: { name, city, email }
  brandKit: { logoUrl, colors:{primary,accent}, contact:{phone,email} }
  projects: [projectId]
  storageRefs: [fileId]
  servicesUsed: { [serviceId]: timestamp }
  aiMemory: { notes:[], tasks:[] }

projects/{projectId}
  name, developer, city, priceFrom, unitTypes[], handover

storage/{fileId}
  fileUrl, ownerUid, type, tags[], linkedProjectId?
```

## Flows
### Onboarding

1. Auto-detect location (via cookies/IP).
2. Select developers → fetch initial projects.
3. Generate shortlist → load into Projects.
4. Add Brand Kit (logo, colors, contact).
5. Ready → land in /dashboard.

### Service Use

1. User selects a service card.
2. Card pulls from Projects + Brand + Storage.
3. AI generates output → saved back to Storage.

### AI Co-Pilot

- Observes user actions.
- Suggests next tools (“You edited a brochure → want to generate an ad?”).
- Guides onboarding for new users.

---

## APIs / Integrations

- **Google Cloud / Firebase** → Auth, Firestore, Storage, Hosting.
- **Meta / TikTok / Snap / Google Ads APIs** → for campaign deployment.
- **Gemini API (Google AI)** → for AI generation.
- **Twilio / WhatsApp Business API** → comms integration.

---

## Deployment

- **Framework**: Next.js + Tailwind
- **Hosting**: Vercel
- **Database**: Firestore
- **Storage**: Firebase Storage
- **Auth**: Firebase Auth

---

## Vision

selltoday.ai turns every salesperson into a Super-Seller by giving them tools, not just tasks.
With projects, brand, and storage unified, selltoday.ai becomes the AI co-pilot for real estate sales.
