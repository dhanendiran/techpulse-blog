import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { email } = req.body || {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const senderEmail = process.env.SENDER_EMAIL || 'TechPulse <onboarding@resend.dev>';

    // If RESEND_API_KEY is not configured yet, succeed gracefully with guidance
    if (!apiKey) {
      console.warn('[TechPulse Email] RESEND_API_KEY is not set in environment variables.');
      return res.status(200).json({
        success: true,
        mock: true,
        message: 'Subscription registered! To deliver live emails, set RESEND_API_KEY in your Vercel project environment variables.',
        subscriber: cleanEmail,
      });
    }

    const resend = new Resend(apiKey);

    // 1. Send Welcome Email to Subscriber
    const welcomeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
            .header { background: linear-gradient(135deg, #090d16 0%, #1e1b4b 100%); padding: 36px 30px; text-align: center; }
            .brand { color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; margin: 0; }
            .badge { display: inline-block; background: rgba(56,189,248,0.2); color: #38bdf8; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 999px; margin-bottom: 12px; text-transform: uppercase; }
            .content { padding: 36px 32px; font-size: 15px; line-height: 1.6; }
            h2 { font-size: 20px; font-weight: 800; margin-top: 0; margin-bottom: 16px; color: #0f172a; }
            p { margin: 0 0 16px 0; color: #334155; }
            .card { background: #f1f5f9; border-radius: 12px; padding: 16px 20px; margin: 20px 0; border-left: 4px solid #0284c7; }
            .card-title { font-weight: 700; font-size: 14px; margin-bottom: 4px; color: #0f172a; }
            .card-desc { font-size: 13px; color: #475569; margin: 0; }
            .btn { display: inline-block; background: #0284c7; color: #ffffff !important; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 10px; margin: 16px 0; text-align: center; }
            .footer { padding: 24px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="badge">Weekly Engineering Dispatch</span>
              <h1 class="brand">TechPulse</h1>
            </div>
            <div class="content">
              <h2>Welcome to the VIP Engineering Circle 👋</h2>
              <p>You’re now officially subscribed to the TechPulse weekly digest. Every Sunday, we deliver unbiased software benchmarks, hardware teardowns, and architecture blueprints directly to your inbox.</p>
              
              <p><strong>Here is what to explore right now:</strong></p>

              <div class="card">
                <div class="card-title">🔥 Cursor vs Windsurf vs Copilot (2026 Benchmark)</div>
                <p class="card-desc">We tested multi-file edits, codebase indexing speed, and pricing across 48,000 lines of code.</p>
              </div>

              <div class="card">
                <div class="card-title">💰 Cut Cloud Hosting Bills by 85% with Coolify</div>
                <p class="card-desc">How to deploy production Docker &amp; Next.js on a $5/mo Hetzner VPS with zero downtime.</p>
              </div>

              <div class="card">
                <div class="card-title">🎁 Exclusive Developer Deals Hub</div>
                <p class="card-desc">Claim €20 free Hetzner cloud credits, $200 DigitalOcean credits, and free AI trials.</p>
              </div>

              <div style="text-align: center;">
                <a href="https://techpulse-blog-beta.vercel.app/deals" class="btn">Explore All Developer Perks &rarr;</a>
              </div>

              <p style="margin-top: 24px;">No marketing spam, zero sponsored fluff. Unsubscribe anytime with a single click.</p>
              <p>Cheers,<br><strong>The TechPulse Editorial Team</strong></p>
            </div>
            <div class="footer">
              TechPulse • Independent Engineering &amp; AI Publication<br>
              <a href="https://techpulse-blog-beta.vercel.app" style="color: #0284c7; text-decoration: none;">techpulse-blog-beta.vercel.app</a>
            </div>
          </div>
        </body>
      </html>
    `;

    const { error: welcomeError } = await resend.emails.send({
      from: senderEmail,
      to: cleanEmail,
      subject: 'Welcome to TechPulse VIP — Your 2026 Developer Toolkit 🚀',
      html: welcomeHtml,
    });

    if (welcomeError) {
      console.error('[TechPulse Resend Welcome Error]:', welcomeError);
    }

    // 2. Send Admin Notification Email (if ADMIN_EMAIL configured)
    if (adminEmail) {
      await resend.emails.send({
        from: senderEmail,
        to: adminEmail,
        subject: `🎉 New TechPulse Subscriber: ${cleanEmail}`,
        html: `
          <h3>New TechPulse Subscriber Joined!</h3>
          <p><strong>Email:</strong> ${cleanEmail}</p>
          <p><strong>Source:</strong> Newsletter CTA Component</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        `,
      }).catch((err) => console.error('[TechPulse Resend Admin Error]:', err));
    }

    return res.status(200).json({
      success: true,
      message: 'Welcome email sent successfully!',
      subscriber: cleanEmail,
    });
  } catch (error: any) {
    console.error('[TechPulse /api/subscribe Error]:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error?.message || 'Unknown error' });
  }
}
