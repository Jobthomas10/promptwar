# VerifyAI — GenAI Media Forensic Platform & Verification Engine

> **"Don't trust it. Verify it."**

VerifyAI is an enterprise-grade AI Media Forensic Platform designed to detect, explain, trace, and verify synthetic media, deepfakes, AI voice clones, and manipulated images. Built with Next.js 14, TypeScript, TailwindCSS, and integrated with live neural AI detection APIs (Sightengine), VerifyAI provides instant, transparent, and explainable media authentication.

---

---



---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) (Vanilla CSS tokens, HSL custom palette)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Live AI Detection API**: [Sightengine AI API](https://sightengine.com/) (`genai,deepfake` models)
- **Test Suite**: Native Node.js Test Runner (`node:test`)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure Node.js 18+ is installed.

### 2. Installation
```bash
git clone https://github.com/Jobthomas10/promptwar.git
cd promptwar
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
SIGHTENGINE_API_USER=1895648941
SIGHTENGINE_API_SECRET=6E6oGDtJj8FCewXHwWDF2kesUVWo4ySa
NEXT_PUBLIC_APP_NAME="VerifyAI"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Running Automated Tests

VerifyAI includes a built-in automated test suite covering API ingestion, forensic classification, and authentic overrides:

```bash
npm test
```

### Test Output Summary:
```text
✔ API Ingestion Engine - Endpoint Health & Payload Validation
✔ API Ingestion Engine - Preset Selection Route
✔ API Ingestion Engine - Authentic Mode Override
✔ Forensic Dataset Integrity - MOCK_ANALYSES Structure
✔ Forensic Classification - Synthetic AI Diffusion Detection
✔ Forensic Classification - Authentic Camera Photo Verification

ℹ tests 6 | pass 6 | fail 0
```

---

## 📂 Codebase Structure

```text
scheme/
├── __tests__/                      # Automated test suite (API & Forensics)
│   ├── api.test.mjs                # Endpoint route & payload validation tests
│   └── forensics.test.mjs          # Classification & dataset integrity tests
├── src/
│   ├── app/
│   │   ├── api/analyze/            # Live Sightengine API & ingestion endpoints
│   │   ├── report/                 # Formal verification audit report view
│   │   ├── globals.css             # Design tokens & custom CSS variables
│   │   ├── layout.tsx              # Root HTML layout with font optimization
│   │   └── page.tsx                # Main single-page application orchestrator
│   ├── components/                 # UI Forensic Components
│   │   ├── Hero.tsx                # Interactive upload dropzone & preset loader
│   │   ├── MediaUploader.tsx       # File & URL ingestion control panel
│   │   ├── VerdictCard.tsx         # High-level verdict badge & confidence gauge
│   │   ├── EvidenceBreakdown.tsx   # Detailed XAI evidence telemetry card
│   │   ├── ContextVerification.tsx # Reverse search & fact-checking timeline
│   │   ├── Navbar.tsx              # Header navigation & role portal modal
│   │   └── Footer.tsx              # Platform footer & compliance badges
│   └── lib/
│       ├── mockData.ts             # Forensic engine fallback & case studies
│       └── types.ts                # TypeScript strict interface definitions
├── .env.example                    # Environment variable template
├── next.config.mjs                 # Security response headers & Next.js config
├── package.json                    # Project dependencies & test scripts
└── README.md                       # Platform documentation
```

---

## 🔒 Security & Privacy Commitments

- **No Data Retention**: Uploaded media streams are analyzed in memory and never stored permanently on third-party servers.
- **Header Protection**: Enforces `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: origin-when-cross-origin`.
- **Credential Safety**: Sightengine API keys are securely processed server-side inside Next.js API routes.

---

## 📄 License
Released under the MIT License. Developed for hackathons and press media verification.
