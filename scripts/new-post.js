#!/usr/bin/env node

/**
 * TechPulse - Automated Article Generator CLI
 * Usage: bun run new-post "Your Post Title Here"
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('\x1b[31mError:\x1b[0m Please provide an article title.');
  console.log('Usage: bun run new-post "Top 5 AI Tools in 2026"');
  process.exit(1);
}

// Convert title to URL slug
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const targetPath = path.resolve(__dirname, `../src/content/blog/${slug}.mdx`);

if (fs.existsSync(targetPath)) {
  console.error(`\x1b[31mError:\x1b[0m Post already exists at ${targetPath}`);
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];

const template = `---
title: "${title}"
description: "A comprehensive teardown, benchmarks, and actionable guide for modern developers."
pubDate: ${today}
category: "Artificial Intelligence"
tags: ["Tech", "Engineering", "Tools"]
featured: false
hasAffiliateLinks: true
readingTime: "6 min read"
heroImage: "/images/og-default.svg"
---
import AffiliateBox from '../../components/AffiliateBox.astro';
import ComparisonTable from '../../components/ComparisonTable.astro';

Introduction paragraph setting up the core problem or evaluation criteria...

---

## 1. Overview & Benchmark Results

Write your core insights and reproducible tests here...

<AffiliateBox
  title="Recommended Tool Name"
  badge="Editor's Choice"
  rating="4.9/5"
  price="Starts Free / $20 mo"
  tagline="Best for AI developers and modern engineering teams"
  description="Summary of why this product stands out from alternatives in real-world benchmarks."
  pros={[
    "Fast execution and zero latency",
    "Intuitive developer experience",
    "Generous free tier for testing"
  ]}
  cons={[
    "Advanced enterprise features require higher tier"
  ]}
  affiliateUrl="https://example.com?ref=techpulse"
  ctaText="Claim Exclusive Deal"
/>

---

## Conclusion & Recommendations

Summary verdict and actionable advice for readers.
`;

fs.writeFileSync(targetPath, template, 'utf-8');
console.log(`\x1b[32m✔ Created new article:\x1b[0m src/content/blog/${slug}.mdx`);
console.log(`Open and edit your article, then run 'bun run dev' to preview!`);
