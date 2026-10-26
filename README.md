# CronDialect - Multi-Engine Scheduler & Cron Expression Converter

A high-performance, edge-safe web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed by a Senior Google Infrastructure / Backend Engineer to parse, validate, translate, and audit cron schedules across enterprise schedulers and cloud platforms.

---

## 🚀 Live Demo & Deployment
- **Hosting Platform**: Vercel (Free tier compatible, zero edge cold-starts)
- **Monetization**: Non-intrusive single developer-focused ad unit (EthicalAds / Carbon Ads ready)
- **Security Posture**: Strict HTTP headers, hardened CSP, zero server state, DDoS-immune static pre-rendering

---

## 🛠 Tech Stack

| Layer | Technology | Key Advantage |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Static site generation (SSG) with fast edge hydration and zero server maintenance |
| **Language** | TypeScript | Strong typing for cron tokens, dialect definitions, and trigger run arrays |
| **Styling** | Tailwind CSS | Dark-themed, developer-centric typography (JetBrains Mono feel) |
| **Icons** | Lucide React | Lightweight, tree-shakable SVG icon set |
| **Parsing Engine** | Custom Core + `cronstrue` | In-depth dialect parsing, AWS/Quartz normalization, and human string synthesis |

---

## 💎 Core Architecture & Code Flow

```
┌─────────────────────────────────────────────────────────────┐
│                       User Interface                        │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ Expression Input & Dialect Switcher                 │   │
│   │ (UNIX, Quartz, AWS EventBridge, Jenkins, K8s)       │   │
│   └──────────────────────────┬──────────────────────────┘   │
│                              │                              │
│                 Bi-Directional Query Input                  │
│             (e.g., "every alternate Tuesday...")           │
│                              │                              │
└──────────────────────────────┼──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Parsing & Evaluation                     │
│               src/lib/cronParser.ts                         │
│                                                             │
│   1. Dialect Field Validation (5, 6, or 7 parts)            │
│   2. Asterisk Blueprint & Field Breakdown                   │
│   3. Edge-Case Warning Detection:                           │
│      - POSIX DOM vs DOW OR-Logic hazard                     │
│      - AWS EventBridge mandatory '?' constraint             │
│      - 31st Day short month skipping                        │
│      - Daylight Saving Time (DST) 2-3 AM clock jump shifts  │
│      - Jenkins deterministic hashing token analysis         │
│   4. Human-Readable Translation                             │
│   5. Visual Timetable Calculation (Next 8 Runs)             │
│      - User Local Time vs. UTC Standard calculation         │
│      - Relative countdown ("in 14 minutes")                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Rendered Components                     │
│  - ExpressionExplainer: Interactive position inspection     │
│  - EdgeCaseAlerts: Senior engineer hazard notices           │
│  - VisualTimetable: Dual-timezone schedule projection       │
│  - BiDirectionalTranslator: Natural language synthesis      │
│  - DeveloperAdSlot: Non-intrusive, privacy-safe sponsor     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Supported Dialects

1. **POSIX / Standard UNIX Cron (5 fields)**:
   - Format: `Minute Hour Day-of-Month Month Day-of-Week`
   - Example: `*/15 * * * *` (Every 15 minutes)

2. **Quartz Scheduler (6–7 fields)**:
   - Format: `Seconds Minutes Hours Day-of-Month Month Day-of-Week [Year]`
   - Supports special symbols: `?`, `L`, `W`, `#`
   - Example: `0 0 22 ? * 6L` (Last Friday of every month at 10 PM)

3. **AWS EventBridge / CloudWatch (6 fields)**:
   - Format: `Minutes Hours Day-of-Month Month Day-of-Week Year`
   - Strict rule: Exactly one of Day-of-Month or Day-of-Week must be `?`.
   - Example: `0 18 ? * MON-FRI *` (Weekdays at 18:00 UTC)

4. **Jenkins CI/CD Hashed Cron (5 fields)**:
   - Distributes agent loads across clusters using token `H`.
   - Example: `H/15 * * * *` (Runs every 15 minutes load-balanced)

5. **Kubernetes CronJob (5 fields)**:
   - Spec `spec.schedule` compliant with timezone-awareness advisories.
   - Example: `0 2 * * 0` (Weekly Sunday snapshot)

---

## 🛡 Security Hardening & Zero-Downtime Design

To guarantee zero downtime and immunity from attacks when hosted on Vercel's free tier:
1. **100% Client-Side Computation**: All conversions, syntax token checks, and timetable projections run client-side in the browser. No expensive serverless API invocations means **zero billable function executions**, **no server timeouts**, and **infinite scalability under traffic spikes**.
2. **Defensive HTTP Headers (`next.config.js`)**:
   - `Content-Security-Policy`: Blocks unauthorized external script injections while whitelisting privacy-first developer ad networks.
   - `X-Frame-Options: DENY`: Prevents clickjacking.
   - `X-Content-Type-Options: nosniff`: Prevents MIME-sniffing exploits.
   - `Permissions-Policy`: Restricts camera, microphone, and geolocation access.
3. **No Database / No Credentials**: Eliminates SQL injection, auth leakage, or database connection exhaustion risks.

---

## 💰 Non-Intrusive Developer Monetization

Developers heavily utilize ad blockers (uBlock, Brave, Pi-hole). Instead of Google AdSense:
- Integrated with **EthicalAds** / **Carbon Ads** placeholders.
- A single, sleek sponsor slot rendered at the top of the utility.
- Respects page layout with zero Cumulative Layout Shift (CLS).
- Detailed setup instructions provided in [`ADS_SETUP.md`](./ADS_SETUP.md).

---

## 📦 Local Development & Verification

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Export Test
```bash
npm run build
npm run start
```

---

## 🚢 Deploying to Vercel (1-Click Free Hosting)

1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Keep default settings (Framework preset: Next.js).
4. Click **Deploy**. Vercel will build and distribute the app globally on their Edge Network with automatic HTTPS.
