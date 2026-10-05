/**
 * TechPulse Monetization & Affiliate Link Registry
 * 
 * Update your affiliate tags, referral IDs, and discount links in this file.
 * All articles, deal cards, and comparison matrices pull from here.
 * 
 * To activate your real links, simply replace the placeholder affiliateUrl values below.
 */

export interface AffiliatePartner {
  id: string;
  name: string;
  category: 'cloud' | 'ai' | 'database' | 'hardware' | 'saas' | 'tools';
  affiliateUrl: string;
  network: string; // e.g. 'Direct Partner', 'Impact', 'Amazon Associates', 'PartnerStack'
  commissionModel: string; // e.g. '15% recurring', '$25 bounty', '3-4%'
  promoCode?: string;
  activeDeal: string;
}

export const AFFILIATE_PARTNERS: Record<string, AffiliatePartner> = {
  hetzner: {
    id: 'hetzner',
    name: 'Hetzner Cloud VPS',
    category: 'cloud',
    affiliateUrl: 'https://hetzner.com?ref=techpulse', // Replace with your Hetzner referral URL
    network: 'Hetzner Referral Program',
    commissionModel: '€10 - €50 in recurring server credits / payout',
    promoCode: 'AUTO-APPLIED',
    activeDeal: '€20 Free Cloud Credits for developers',
  },
  digitalocean: {
    id: 'digitalocean',
    name: 'DigitalOcean Cloud',
    category: 'cloud',
    affiliateUrl: 'https://digitalocean.com?ref=techpulse', // Replace with your DO referral link
    network: 'DigitalOcean Referral Program',
    commissionModel: '$25 credit or cash per user who spends $25',
    promoCode: 'AUTO-APPLIED',
    activeDeal: '$200 60-day infrastructure credit',
  },
  cursor: {
    id: 'cursor',
    name: 'Cursor AI IDE',
    category: 'ai',
    affiliateUrl: 'https://cursor.com?ref=techpulse', // Replace with your Cursor partner link
    network: 'Direct Partner / Creator Tier',
    commissionModel: '20% first-year subscription referral',
    promoCode: 'FREE-TIER',
    activeDeal: '14-Day Free Pro Trial (Unlimited Fast Composer)',
  },
  windsurf: {
    id: 'windsurf',
    name: 'Codeium Windsurf',
    category: 'ai',
    affiliateUrl: 'https://codeium.com/windsurf?ref=techpulse',
    network: 'Codeium Creator Program',
    commissionModel: '15% recurring affiliate bounty',
    promoCode: 'AUTO-APPLIED',
    activeDeal: 'Free tier with Cascade AI agent',
  },
  raycast: {
    id: 'raycast',
    name: 'Raycast',
    category: 'tools',
    affiliateUrl: 'https://raycast.com?ref=techpulse',
    network: 'Raycast Partner',
    commissionModel: '20% recurring on Pro subscriptions',
    activeDeal: 'Free Core Utilities + 14-day Pro AI trial',
  },
  warp: {
    id: 'warp',
    name: 'Warp Terminal',
    category: 'tools',
    affiliateUrl: 'https://warp.dev?ref=techpulse',
    network: 'Warp Developer Program',
    commissionModel: 'Developer bounty per activated team',
    activeDeal: 'Free forever for individual engineers',
  },
  linear: {
    id: 'linear',
    name: 'Linear',
    category: 'tools',
    affiliateUrl: 'https://linear.app?ref=techpulse',
    network: 'Linear Partner Program',
    commissionModel: 'SaaS referral bounty',
    activeDeal: 'Free for teams up to 250 active issues',
  },
  neon: {
    id: 'neon',
    name: 'Neon Serverless Postgres',
    category: 'database',
    affiliateUrl: 'https://neon.tech?ref=techpulse', // Replace with your Neon referral link
    network: 'Neon Partner Program',
    commissionModel: 'Developer bounty / Partner perk',
    activeDeal: 'Generous Free Tier + Instant DB Branching',
  },
  supabase: {
    id: 'supabase',
    name: 'Supabase',
    category: 'database',
    affiliateUrl: 'https://supabase.com?ref=techpulse',
    network: 'Supabase Community / Referral',
    commissionModel: 'Bounty & developer sponsorship credits',
    activeDeal: 'Free tier with Auth, Storage, and pgvector',
  },
  amazon: {
    id: 'amazon',
    name: 'Amazon Associates (Hardware)',
    category: 'hardware',
    affiliateUrl: 'https://amazon.com?tag=techpulse-20', // Replace 'techpulse-20' with your Amazon Store ID
    network: 'Amazon Associates',
    commissionModel: '2.5% - 4.0% per hardware purchase ($50 - $100 per laptop)',
    activeDeal: 'Save up to $250 on MacBook Pro M4 & Developer Gear',
  },
  lenovo: {
    id: 'lenovo',
    name: 'Lenovo ThinkPad',
    category: 'hardware',
    affiliateUrl: 'https://lenovo.com?ref=techpulse', // Replace with your Impact.com / CJ link
    network: 'Impact.com / CJ Affiliate',
    commissionModel: '3% - 5% per workstation order',
    activeDeal: 'Up to 45% off ThinkPad X1 Carbon enterprise deals',
  },
  runway: {
    id: 'runway',
    name: 'Runway AI',
    category: 'ai',
    affiliateUrl: 'https://runwayml.com?ref=techpulse',
    network: 'Runway Creator Program',
    commissionModel: '15% recurring on subscription upgrades',
    activeDeal: 'Free video generation starter credits',
  },
};

/**
 * Helper to fetch a partner or fallback safely
 */
export function getAffiliate(partnerId: string): AffiliatePartner | undefined {
  return AFFILIATE_PARTNERS[partnerId];
}
