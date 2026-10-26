# Developer Ad Network Integration & Placement Guide

This guide details how to implement, configure, and monetize the non-intrusive single ad unit in **CronDialect** without degrading UX or falling victim to developer ad-block rates.

---

## 1. Why Developer Ad Networks instead of Google AdSense?

| Metric | Google AdSense | EthicalAds / Carbon Ads |
|---|---|---|
| **Ad-Block Rate for Devs** | **60% - 85% blocked** (uBlock, Brave, Pi-hole) | **Bypasses most blockers** (allowlisted non-tracking networks) |
| **Average Developer CPM** | $0.50 – $2.00 RPM | **$2.00 – $7.00+ CPM** |
| **UX & Script Weight** | Heavy cookies, third-party trackers, layout shifts | Single lightweight asset (<15KB), zero cookie tracking |
| **Audience Alignment** | General consumer ads (insurance, ecommerce) | Hosting, cloud databases, dev tools, CI/CD tools |

---

## 2. Option A: EthicalAds (Recommended for Immediate Launch)

[EthicalAds](https://www.ethicalads.io/) is designed explicitly for technical blogs and developer utility tools.

### Step 1: Sign up as a Publisher
1. Visit [ethicalads.io/publishers](https://www.ethicalads.io/publishers/) and sign up with your deployed Vercel domain (`https://your-cron-app.vercel.app`).
2. EthicalAds typically approves developer utilities within 24–48 hours without strict traffic minimums.
3. You will receive your custom publisher ID (e.g. `your-publisher-name`).

### Step 2: Configure in CronDialect
Open `src/components/DeveloperAdSlot.tsx` and update line 71:
```tsx
// Replace 'cronconverter-dev' with your approved Publisher ID:
<div
  className="horizontal adaptive"
  data-ea-publisher="your-publisher-name"
  data-ea-type="image"
/>
```

The script is already included in `src/app/layout.tsx`:
```html
<script async src="https://media.ethicalads.io/media/client/ethicalads.min.js"></script>
```

---

## 3. Option B: Carbon Ads (BuySellAds)

[Carbon Ads](https://www.carbonads.net/) is the gold-standard sponsor unit used by Bootstrap, Font Awesome, and Laravel.

### Step 1: Traffic Requirement
Carbon Ads requires moderate baseline traffic (~20,000 to 50,000 monthly pageviews).
*Strategy: Start with EthicalAds or custom sponsor affiliate cards until pageviews hit the threshold, then apply to Carbon Ads.*

### Step 2: Carbon Tag Setup
When approved, Carbon provides an embed snippet like:
```html
<script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=YOUR_CODE&placement=YOUR_DOMAIN" id="_carbonads_js"></script>
```

In `src/components/DeveloperAdSlot.tsx`, replace the inner placeholder or load it dynamically:
```tsx
useEffect(() => {
  if (network === 'carbon') {
    const script = document.createElement('script');
    script.src = '//cdn.carbonads.com/carbon.js?serve=YOUR_SERVE_CODE&placement=yourdomain';
    script.id = '_carbonads_js';
    script.async = true;
    const container = document.getElementById('carbon-container');
    container?.appendChild(script);
  }
}, [network]);
```

---

## 4. Option C: Direct Developer Affiliates (Self-Hosted Fallback)

If waiting for network approval, you can earn immediate revenue with high-paying developer affiliate programs (e.g., DigitalOcean, Supabase, Railway, Vercel, Datadog):
1. In `src/components/DeveloperAdSlot.tsx`, update the fallback card link:
   ```tsx
   <a href="https://your-affiliate-link.com" ...>
   ```
2. When ad blockers block network scripts, the smart fallback component in `DeveloperAdSlot.tsx` gracefully renders a clean sponsor tile with zero layout shifts.

---

## 5. Security & CSP Configuration

The project includes strict Content Security Policy (CSP) headers in `next.config.js`:
```js
contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://media.ethicalads.io https://cdn.carbonads.com; style-src 'self' 'unsafe-inline' https://media.ethicalads.io; connect-src 'self' https://server.ethicalads.io https://cdn.carbonads.com;"
```
If you switch to another network, ensure you add their domain to `script-src` and `connect-src` in `next.config.js`.
