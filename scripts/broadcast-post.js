#!/usr/bin/env node

/**
 * TechPulse Automated Post Broadcast CLI
 * 
 * Sends a newsletter email campaign to your subscriber list whenever you publish a new article.
 * 
 * Usage:
 *   bun run broadcast <post-slug>
 *   Example: bun run broadcast cursor-vs-windsurf-vs-copilot-2026
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Automatically load local .env if present
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envLines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of envLines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...rest] = trimmed.split('=');
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = rest.join('=').trim();
      }
    }
  }
}

const slug = process.argv[2]?.trim();

if (!slug) {
  console.error('\x1b[31mError:\x1b[0m Please provide an article slug.');
  console.log('Usage: bun run broadcast cursor-vs-windsurf-vs-copilot-2026');
  process.exit(1);
}

const postPath = path.resolve(__dirname, `../src/content/blog/${slug.replace(/\.mdx?$/, '')}.mdx`);

if (!fs.existsSync(postPath)) {
  console.error(`\x1b[31mError:\x1b[0m Article not found at ${postPath}`);
  process.exit(1);
}

const content = fs.readFileSync(postPath, 'utf-8');

// Parse frontmatter
const matchTitle = content.match(/title:\s*["']([^"']+)["']/);
const matchDesc = content.match(/description:\s*["']([^"']+)["']/);
const matchCategory = content.match(/category:\s*["']([^"']+)["']/);
const matchTime = content.match(/readingTime:\s*["']([^"']+)["']/);

const postTitle = matchTitle ? matchTitle[1] : 'New TechPulse Article';
const postDesc = matchDesc ? matchDesc[1] : 'Check out our latest engineering guide.';
const postCategory = matchCategory ? matchCategory[1] : 'Engineering';
const postReadingTime = matchTime ? matchTime[1] : '5 min read';
const postUrl = `https://techpulse-blog-beta.vercel.app/blog/${slug.replace(/\.mdx?$/, '')}/`;

console.log('\n========================================');
console.log('📡 TechPulse Automated Post Broadcast');
console.log('========================================');
console.log(`Title:        ${postTitle}`);
console.log(`Category:     ${postCategory}`);
console.log(`Reading Time: ${postReadingTime}`);
console.log(`URL:          ${postUrl}`);

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error('\n\x1b[33mNotice:\x1b[0m RESEND_API_KEY environment variable is not set.');
  console.log('Set your key: export RESEND_API_KEY=re_your_api_key');
  console.log('You can obtain a free key at https://resend.com (3,000 free emails/mo)');
  process.exit(0);
}

// Load subscribers from optional subscribers.json or args
const subscribersFile = path.resolve(__dirname, '../subscribers.json');
let recipientList = [];

if (fs.existsSync(subscribersFile)) {
  try {
    const raw = JSON.parse(fs.readFileSync(subscribersFile, 'utf-8'));
    recipientList = Array.isArray(raw) ? raw.map((item) => (typeof item === 'string' ? item : item.email)) : [];
  } catch (_) {}
}

const adminEmail = process.env.ADMIN_EMAIL;
if (adminEmail && !recipientList.includes(adminEmail)) {
  recipientList.push(adminEmail);
}

if (recipientList.length === 0) {
  console.log('\n\x1b[33mNo subscribers found in subscribers.json.\x1b[0m');
  console.log('Add subscriber emails to `subscribers.json` or pass them via environment.');
  process.exit(0);
}

const resend = new Resend(apiKey);
const senderEmail = process.env.SENDER_EMAIL || 'TechPulse <onboarding@resend.dev>';

const emailHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 30px auto; background: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; }
        .header { background: #0f172a; padding: 32px 24px; text-align: center; border-bottom: 1px solid #334155; }
        .brand { color: #ffffff; font-size: 24px; font-weight: 900; margin: 0; }
        .badge { display: inline-block; background: rgba(56,189,248,0.2); color: #38bdf8; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 999px; margin-bottom: 8px; text-transform: uppercase; }
        .body { padding: 36px 30px; font-size: 15px; line-height: 1.6; color: #cbd5e1; }
        h1 { font-size: 22px; font-weight: 800; color: #ffffff; margin-top: 0; margin-bottom: 12px; }
        .btn { display: inline-block; background: #0284c7; color: #ffffff !important; font-weight: 800; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 10px; margin: 20px 0; text-align: center; }
        .footer { padding: 20px 24px; background: #0f172a; border-top: 1px solid #334155; font-size: 11px; color: #64748b; text-align: center; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <span class="badge">New ${postCategory} Dispatch</span>
          <h1 class="brand">TechPulse Weekly</h1>
        </div>
        <div class="body">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #38bdf8; font-weight: 700; margin-bottom: 6px;">⏱ ${postReadingTime}</p>
          <h1>${postTitle}</h1>
          <p>${postDesc}</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${postUrl}" class="btn">Read the Full Article &rarr;</a>
          </div>
          <p style="font-size: 13px; color: #94a3b8;">You received this because you are subscribed to TechPulse VIP digests.</p>
        </div>
        <div class="footer">
          TechPulse • <a href="https://techpulse-blog-beta.vercel.app" style="color: #38bdf8; text-decoration: none;">techpulse-blog-beta.vercel.app</a>
        </div>
      </div>
    </body>
  </html>
`;

console.log(`\nDispatching broadcast to ${recipientList.length} subscribers...`);

async function sendBroadcast() {
  let sent = 0;
  for (const recipient of recipientList) {
    try {
      await resend.emails.send({
        from: senderEmail,
        to: recipient,
        subject: `New: ${postTitle}`,
        html: emailHtml,
      });
      sent++;
      console.log(`✔ Sent to: ${recipient}`);
    } catch (e) {
      console.error(`✘ Failed for ${recipient}:`, e.message);
    }
  }
  console.log(`\n🎉 Broadcast completed! Successfully sent ${sent}/${recipientList.length} emails.`);
}

sendBroadcast();
