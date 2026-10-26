/**
 * SPONSOR & AD CONFIGURATION
 * 
 * Select your active ad provider:
 * - 'adsense': Google AdSense (Universal programmatic ads)
 * - 'betterstack': Direct Developer Sponsor (Zero traffic required, high commission)
 * - 'digitalocean': Cloud Hosting Credits ($200 promo card)
 * - 'ethicalads': Privacy-first Developer Ads (Requires ~5k views)
 */
export const SPONSOR_CONFIG = {
  // Set active provider: 'adsense' | 'betterstack' | 'digitalocean' | 'ethicalads'
  activeProvider: 'betterstack' as 'adsense' | 'betterstack' | 'digitalocean' | 'ethicalads',

  // Google AdSense Configuration
  adsense: {
    client: 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with your Google AdSense Publisher ID
    slot: 'XXXXXXXXXX',               // Replace with your Display Ad Unit ID
  },

  // Developer Affiliate Links
  links: {
    betterstack: 'https://betterstack.com?ref=cronview',
    digitalocean: 'https://m.do.co/c/your-do-referral-code',
    ethicaladsPublisherId: 'cronconverter-dev',
  },
};
