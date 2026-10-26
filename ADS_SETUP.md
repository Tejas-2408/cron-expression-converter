# Complete Monetization & Google AdSense Setup Guide

This guide explains how to integrate **Google AdSense** on **CronView**, as well as how to switch between AdSense and high-earning developer partner cards.

---

## 1. How Google AdSense Works on CronView

CronView is a **100% free developer utility** with no signups, paywalls, or gated services. This makes it an ideal candidate for Google AdSense programmatic display advertising.

We have pre-configured:
1. **Hardened CSP (Content Security Policy)** in `next.config.js` to whitelist `pagead2.googlesyndication.com` and Google ad iframes.
2. **Single Bottom Ad Placement**: Exactly 1 responsive display unit positioned below the timetable and converter so it never harms UX or Core Web Vitals.
3. **One-Line Toggle**: Switch from Developer Affiliate cards to Google AdSense in seconds.

---

## 2. Step-by-Step Google AdSense Approval & Setup

### Step 1: Submit CronView to AdSense
1. Go to **[adsense.google.com](https://adsense.google.com/)** and sign in with your Google account.
2. Click **Sites** &rarr; **Add Site**.
3. Enter your live domain (e.g. `https://cronview-six.vercel.app` or your custom domain).
4. Google will give you your **Publisher ID** (looks like `ca-pub-1234567890123456`).

### Step 2: Create a Display Ad Unit
1. Inside Google AdSense dashboard, click **Ads** &rarr; **By ad unit** &rarr; **Display ads**.
2. Name it `CronView Bottom Banner`.
3. Select **Responsive** ad size.
4. Click **Create**. Google will show you an HTML snippet with two values:
   - `data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"`
   - `data-ad-slot="XXXXXXXXXX"`

### Step 3: Activate AdSense in CronView
Open `src/lib/sponsorConfig.ts`:
```ts
export const SPONSOR_CONFIG = {
  // 1. Change activeProvider to 'adsense'
  activeProvider: 'adsense',

  // 2. Paste your Google AdSense Client & Slot ID
  adsense: {
    client: 'ca-pub-XXXXXXXXXXXXXXXX', // Your Publisher ID
    slot: 'XXXXXXXXXX',               // Your Ad Slot ID
  },
  ...
};
```

That's it! As soon as you commit and push to Vercel, the Google AdSense script will load automatically and display responsive programmatic ads to every visitor.

---

## 3. Important: AdSense Approval Tips for Free Tool Sites

Google AdSense uses automated crawlers to evaluate websites. Here is what we have already built to ensure fast approval:

| Requirement | How CronView Complies |
|---|---|
| **High Quality Useful Content** | Full interactive cron syntax cheatsheet, visual timetable, and dialect converters. |
| **Clear Site Purpose** | Title, metadata, and JSON-LD Schema.org markup explicitly declare it as a `DeveloperApplication`. |
| **Compliance & Navigation** | Working GitHub open-source repository link, clean light/dark mode UI, and `sitemap.xml`. |
| **No Intrusive Ads** | Exactly 1 responsive unit anchored cleanly at the bottom. |

*Pro-Tip for AdSense Approval:* If AdSense asks for a custom domain (e.g. `cronview.dev` or `cronview.io`), you can connect any inexpensive domain in your Vercel project settings under **Settings &rarr; Domains** for free.

---

## 4. Switching Providers Anytime

In `src/lib/sponsorConfig.ts`, you can switch your active revenue stream anytime by changing `activeProvider`:

- `'adsense'`: Shows Google AdSense programmatic banner.
- `'betterstack'`: Shows the native Better Stack heartbeat monitoring sponsor card (earns 25% recurring commission).
- `'digitalocean'`: Shows the $200 free cloud credits developer banner.
- `'ethicalads'`: Shows EthicalAds once you hit ~5,000 monthly views.
