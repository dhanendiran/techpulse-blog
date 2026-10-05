# ⚡ TechPulse — High-Performance Monetized Tech Blog

A turnkey, production-grade blog built with **Astro 5**, **Tailwind CSS v4**, and **MDX**, engineered specifically for high SEO visibility, Google Core Web Vitals (100/100 scores), and multi-channel monetization (**Google AdSense**, **Software/SaaS Affiliate Marketing**, and **Newsletter Subscriptions**).

---

## 🚀 Quick Start

Run the blog locally:

```bash
# Enter project directory
cd techpulse-blog

# Start development server
bun run dev
```

Visit `http://localhost:4321` in your browser.

To create an optimized production build:
```bash
bun run build
bun run preview
```

---

## 💰 Monetization Features Built-In

1. **Google AdSense Slots (`src/components/AdBanner.astro`)**:
   - Pre-configured responsive and leaderboard ad units above the fold, mid-article, and on the homepage.
   - Prevents Cumulative Layout Shift (CLS) with fixed aspect ratio wrappers.
   - To activate live ads: Add your Google Publisher ID in `src/components/AdBanner.astro` (`const ADSENSE_CLIENT_ID = 'ca-pub-XXXXXXXXXX'`).

2. **Affiliate Marketing Modules**:
   - `AffiliateNotice.astro`: FTC and Amazon Associates legal disclosure banner automatically displayed on monetized posts.
   - `AffiliateBox.astro`: High-converting product review callout box with star rating, price, pros & cons, and SEO-safe `rel="sponsored nofollow noopener"` CTA button.
   - `ComparisonTable.astro`: Interactive comparison matrix for software and tools.

3. **Email Audience Capture (`src/components/NewsletterCTA.astro`)**:
   - Newsletter signup lead magnet ready to connect with Buttondown, Mailchimp, Substack, or ConvertKit.

4. **100% AdSense & Legal Compliance Pages**:
   - `/privacy-policy`: Includes mandatory Google DART cookie and third-party advertising clauses.
   - `/affiliate-disclosure`: FTC-mandated referral disclaimer.
   - `/terms`: Terms of Service.
   - `/about`: Author bio, testing methodology, and E-E-A-T credentials.
   - `/contact`: Dedicated editorial and advertising contact form.

5. **Technical SEO**:
   - Automated dynamic `sitemap-index.xml` via `@astrojs/sitemap`.
   - `robots.txt` pointing to sitemap.
   - RSS feed at `/rss.xml`.
   - OpenGraph and Twitter social card tags.
   - Google JSON-LD schema (`BlogPosting` and `WebSite` structured data).

---

## 📝 Adding New Articles

Create a new `.md` or `.mdx` file in `src/content/blog/your-post-title.mdx`:

```mdx
---
title: "Your Post Title Here"
description: "A compelling summary under 160 characters for Google snippet."
pubDate: 2026-10-05
category: "Artificial Intelligence"
tags: ["AI", "Tech", "Tutorial"]
featured: false
hasAffiliateLinks: true
readingTime: "5 min read"
heroImage: "/images/your-graphic.svg"
---
import AffiliateBox from '../../components/AffiliateBox.astro';
import ComparisonTable from '../../components/ComparisonTable.astro';

Your markdown content here...
```

---

## 🌐 Free Deployment (Zero Monthly Cost)

### Deploy to Cloudflare Pages (Recommended)
1. Push this folder to a GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/techpulse-blog.git
   git branch -M main
   git push -u origin main
   ```
2. In Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > Connect your GitHub repo.
3. Build command: `bun run build` | Build output directory: `dist`.
4. Connect your custom domain for free SSL and global CDN.
