/**
 * TechPulse Monetization & Affiliate Link Registry
 * 
 * Update your affiliate tags, referral IDs, and discount links in this file.
 * All articles, deal cards, and comparison matrices can pull from here.
 */

export interface AffiliatePartner {
  id: string;
  name: string;
  category: 'cloud' | 'ai' | 'database' | 'hardware' | 'saas';
  affiliateUrl: string;
  network: string; // e.g. 'Direct Partner', 'Impact', 'Amazon Associates', 'PartnerStack'
  commissionModel: string; // e.g. '15% recurring', '$25 bounty', '3-4%'
  promoCode?: string;
  activeDeal: string;
}

export const AFFILIATE_PARTNERS: Record<string, AffiliatePartner> = {
  hetzner: {
    id: 'hetzner',
    name: 'Hetzner Cloud',
    category: 'cloud',
    affiliateUrl: 'https://hetzner.com?ref=techpulse', // Replace with your Hetzner referral URL
    network: 'Hetzner Referral Program',
    commissionModel: '€10 - €50 in recurring server credits / payout',
    promoCode: 'AUTO-APPLIED',
    activeDeal: '€20 Free Cloud Credits for developers',
  },
  digitalocean: {
    id: 'digitalocean',
    name: 'DigitalOcean',
    category: 'cloud',
    affiliateUrl: 'https://digitalocean.com?ref=techpulse', // Replace with your DO referral link
    network: 'DigitalOcean Referral Program',
    commissionModel: '$25 credit or cash per user who spends $25',
    promoCode: 'AUTO-APPLIED',
    activeDeal: '$200 60-day infrastructure credit',
  },
  cursor: {
    id: 'cursor',
    name: 'Cursor AI',
    category: 'ai',
    affiliateUrl: 'https://cursor.com?ref=techpulse', // Replace with your Cursor partner link
    network: 'Direct Partner / Creator Tier',
    commissionModel: '20% first-year subscription referral',
    promoCode: 'FREE-TIER',
    activeDeal: '14-Day Free Pro Trial (Unlimited Fast Composer)',
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
