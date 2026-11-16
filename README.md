# CronView - Enterprise Cron Expression Evaluator & Multi-Dialect Converter

A high-performance, edge-safe web utility built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed by a Senior Google Infrastructure / Backend Engineer to parse, evaluate, translate, and audit cron schedules across enterprise schedulers and cloud platforms with **Quartz as the default dialect**.

- **Live URL**: [https://cronview-six.vercel.app/](https://cronview-six.vercel.app/)
- **Hosting Platform**: Vercel (Free tier, zero edge cold starts, fully static generation)
- **Monetization**: Google AdSense (Programmatic display advertising with hardened CSP whitelist) + Developer Sponsor fallback
- **Default Dialect**: **Quartz Scheduler** (6–7 fields with seconds and special calendar keywords `?`, `L`, `W`, `#`)

---

## 🛠 Tech Stack

| Layer | Technology | Key Advantage |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Static Site Generation (SSG) with fast edge hydration and zero server bill/cold-starts |
| **Language** | TypeScript | Strong typing for cron tokens, dialect configurations, and trigger timestamp arrays |
| **Styling** | Tailwind CSS | Clean light mode (default) with smooth dark mode toggle and responsive 3-column studio grid |
| **Icons** | Lucide React | Lightweight, tree-shakable SVG icon set |
| **Parsing Engine** | Custom Core + `cronstrue` | In-depth dialect normalization (Quartz, UNIX, AWS EventBridge, Jenkins, Kubernetes) |
| **Monetization** | Google AdSense | Responsive display ad integration configured with strict Content Security Policy |

---

## 💎 Core Architecture & Code Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        User Interface (CronView)                       │
│                                                                        │
│  ┌───────────────────────┐ ┌───────────────────┐ ┌───────────────────┐ │
│  │    Left Side Rail     │ │   Center Canvas   │ │  Right Side Rail  │ │
│  │ • Popular Presets     │ │ • Expression Bar  │ │ • Quartz Legend   │ │
│  │ • Cloud Shortcuts     │ │ • Realtime Output │ │ • Engine Rules    │ │
│  │ • Dev Sponsor Tile    │ │ • Field Blueprint │ │ • Cloud Partner   │ │
│  └───────────────────────┘ │ • Next 5 Runs     │ └───────────────────┘ │
│                            │ • Plain Eng &rarr; Cron│                   │
│                            │ • Google AdSense  │                       │
│                            │ • Publisher Docs  │                       │
│                            │ • Developer FAQ   │                       │
│                            └───────────────────┘                       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Evaluation & Parse Engine                       │
│                         (src/lib/cronParser.ts)                        │
│                                                                        │
│   1. Dialect Normalization (Quartz, POSIX UNIX, AWS, Jenkins, K8s)     │
│   2. Asterisk Field Tokenization (Single-line horizontal blueprint)   │
│   3. Edge-Case Hazard Analysis:                                        │
│      - POSIX DOM vs DOW OR-Logic hazard                                │
│      - AWS EventBridge mandatory '?' constraint                        │
│      - 31st Day short month skipping risk                              │
│      - Daylight Saving Time (DST) 2:00-3:00 AM clock jump detection   │
│      - Jenkins deterministic hashing token analysis                    │
│   4. Human-Readable Translation Output                                 │
│   5. Next 5 Trigger Executions Projection:                             │
│      - Vertical list format with clean, high-contrast monospace dates  │
│      - Dual timezone inspection (User Local Time vs. UTC Standard)     │
│      - Relative time badges ("in 15 minutes", "in 2 days")             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│              Publisher Content & Knowledge Hub (AdSense Safe)          │
│                                                                        │
│   - /guides/cron-syntax-guide: Comprehensive 5-part POSIX guide        │
│   - /guides/quartz-cron-tutorial: Spring Boot & Quartz 6-7 part rules  │
│   - /guides/aws-eventbridge-cron-guide: AWS 6-field & '?' rules        │
│   - /guides/common-cron-mistakes: 5 Critical production cron traps     │
│   - /about: Publisher mission & engineering background                 │
│   - /privacy-policy: Google AdSense & DoubleClick cookie compliance    │
│   - /terms: Terms of Service and disclaimer of warranties              │
│   - /contact: Support channels, GitHub issues, and feedback form       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Supported Dialects

1. **Quartz Scheduler (Default - 6 to 7 fields)**:
   - Format: `Seconds Minutes Hours Day-of-Month Month Day-of-Week [Year]`
   - Default Expression: `0 */15 * * * ?` (runs every 15 minutes)
   - Special Characters: `?` (no specific value), `L` (last day / `6L` last Friday), `W` (nearest weekday), `#` (nth day of week).

2. **Standard POSIX UNIX Cron (5 fields)**:
   - Format: `Minute Hour Day-of-Month Month Day-of-Week`
   - Example: `*/15 * * * *` (Every 15 minutes)

3. **AWS EventBridge / CloudWatch (6 fields)**:
   - Format: `Minutes Hours Day-of-Month Month Day-of-Week Year`
   - Strict rule: Exactly one wildcard between DOM and DOW must be `?`.
   - Example: `0 18 ? * MON-FRI *` (Weekdays at 18:00 UTC)

4. **Jenkins CI/CD Hashed Cron (5 fields)**:
   - Uses `H` token (e.g., `H/15 * * * *`) to distribute executor loads deterministically.

5. **Kubernetes CronJob (5 fields)**:
   - Spec `spec.schedule` format with timezone awareness advice.

---

## 💰 Google AdSense Integration & Policy Compliance

CronView complies with Google Publisher Policies and Google AdSense Guidelines for utility and web applications.

### Resolving "Screens Without Publisher Content":
- **Mandatory Policy Disclosures**: Dedicated [`/privacy-policy`](https://cronview-six.vercel.app/privacy-policy) disclosing Google AdSense advertising cookies and opt-out instructions.
- **Editorial Hub**: 4 in-depth technical guides with over 4,000 words of original educational content.
- **Publisher Entity**: Fully documented [`/about`](https://cronview-six.vercel.app/about) and [`/contact`](https://cronview-six.vercel.app/contact) pages.
- **Detailed Step-by-Step Setup**: See [`ADS_SETUP.md`](./ADS_SETUP.md) for complete instructions.

---

## 🔍 Search Engine Optimization (SEO)

CronView is tailored for high-ranking visibility across developer search keywords (`cron`, `cron job evaluator`, `crontab guru alternative`, `quartz cron converter`):
- **JSON-LD Schema.org Data**: Declares CronView as a `WebApplication` and `Organization` in `layout.tsx`.
- **Dynamic Sitemap**: Auto-generated at `/sitemap.xml` covering all 17 static routes.
- **Robots.txt**: Permits search indexation from Googlebot and Bingbot at `/robots.txt`.
- **Semantic Cheatsheet & Developer FAQ**: Crawlable reference documentation directly on `/`.

---

## 📦 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git push -u origin main
   ```
2. In Vercel ([vercel.com](https://vercel.com)), import `cron-expression-converter`.
3. Framework Preset: **Next.js**.
4. Deploy! Vercel automatically deploys your project to [https://cronview-six.vercel.app](https://cronview-six.vercel.app).
