/**
 * SPONSOR CONFIGURATION
 * 
 * Replace the affiliate links below with your personal referral URLs:
 * - Better Stack: https://betterstack.com/affiliate-program
 * - DigitalOcean: https://cloud.digitalocean.com/referrals or https://www.digitalocean.com/affiliate-program
 */
export const SPONSOR_CONFIG = {
  // Set active provider: 'betterstack' | 'digitalocean' | 'ethicalads'
  activeProvider: 'betterstack' as 'betterstack' | 'digitalocean' | 'ethicalads',

  // Your personal affiliate links:
  links: {
    betterstack: 'https://betterstack.com?ref=cronview', // Replace with your Better Stack referral URL
    digitalocean: 'https://m.do.co/c/your-do-referral-code', // Replace with your DigitalOcean referral URL
    ethicaladsPublisherId: 'cronconverter-dev', // For later when you hit 5k pageviews
  },
};
