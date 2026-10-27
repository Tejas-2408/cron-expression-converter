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
│                   Monetization (Google AdSense)                        │
│                     (src/lib/sponsorConfig.ts)                         │
│                                                                        │
│   - Centralized configuration in sponsorConfig.ts                      │
│   - Automatically loads Google AdSense script in layout.tsx            │
│   - Renders responsive <ins class="adsbygoogle" /> at bottom of canvas │
│   - Security headers in next.config.js allow AdSense & DoubleClick     │
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

## 💰 Google AdSense Integration & How It Works

CronView is designed as a **100% free tool with no paywalls or signups**, making it eligible for Google AdSense programmatic display advertising.

### Configuration (`src/lib/sponsorConfig.ts`):
```ts
export const SPONSOR_CONFIG = {
  // Set activeProvider to 'adsense'
  activeProvider: 'adsense',

  // Your Google AdSense credentials:
  adsense: {
    client: 'ca-pub-XXXXXXXXXXXXXXXX', // Your Publisher ID
    slot: 'XXXXXXXXXX',               // Your Responsive Display Unit ID
  },
};
```

### How the Ad System Operates:
1. When `activeProvider === 'adsense'`, Next.js automatically injects the Google AdSense script into `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-..." crossorigin="anonymous"></script>
   ```
2. The ad is rendered by `DeveloperAdSlot.tsx` at the bottom of the central canvas:
   ```html
   <ins class="adsbygoogle"
        style="display:block; width:100%; min-height:90px;"
        data-ad-client="ca-pub-..."
        data-ad-slot="..."
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
   ```
3. Hardened Content Security Policy (CSP) in `next.config.js` whitelists:
   - `https://pagead2.googlesyndication.com`
   - `https://googleads.g.doubleclick.net`
   - `https://tpc.googlesyndication.com`

---

## 🔍 Search Engine Optimization (SEO)

CronView is tailored for high-ranking visibility across developer search keywords (`cron`, `cron job evaluator`, `crontab guru alternative`, `quartz cron converter`):
- **JSON-LD Schema.org Data**: Declares CronView as a free `DeveloperApplication` in `layout.tsx`.
- **Dynamic Sitemap**: Auto-generated at `/sitemap.xml`.
- **Robots.txt**: Permits search indexation from Googlebot and Bingbot at `/robots.txt`.
- **Semantic Cheatsheet**: Searchable, crawlable reference table comparing all dialect rules.

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
