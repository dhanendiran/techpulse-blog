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
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const senderEmail = process.env.SENDER_EMAIL || 'TechPulse <onboarding@resend.dev>';

    // Fallback if RESEND_API_KEY is not set yet
    if (!apiKey) {
      console.warn('[TechPulse Contact] RESEND_API_KEY is not set in environment variables.');
      return res.status(200).json({
        success: true,
        mock: true,
        message: 'Message received! To deliver live emails, set RESEND_API_KEY in your Vercel project environment variables.',
      });
    }

    const resend = new Resend(apiKey);

    // 1. Send notification to admin (if configured)
    if (adminEmail) {
      await resend.emails.send({
        from: senderEmail,
        to: adminEmail,
        replyTo: cleanEmail,
        subject: `📩 [TechPulse Contact] ${subject} - from ${name}`,
        html: `
          <h2>New Message from TechPulse Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background:#f1f5f9; padding: 12px 16px; border-left: 4px solid #0284c7; border-radius: 6px;">
            ${message.replace(/\n/g, '<br/>')}
          </blockquote>
          <p style="color: #64748b; font-size: 12px;">You can reply directly to this email to respond to ${name}.</p>
        `,
      }).catch((err) => console.error('[TechPulse Resend Admin Contact Error]:', err));
    }

    // 2. Send automated receipt to the user
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
            .header { background: #0f172a; padding: 28px 24px; text-align: center; }
            .brand { color: #ffffff; font-size: 22px; font-weight: 900; margin: 0; }
            .content { padding: 32px 28px; font-size: 15px; line-height: 1.6; }
            .footer { padding: 20px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="brand">TechPulse Editorial Desk</h1>
            </div>
            <div class="content">
              <h3>Hi ${name},</h3>
              <p>Thank you for reaching out to <strong>TechPulse</strong>. We have received your message regarding <em>"${subject}"</em>.</p>
              <p>Our editorial and technical team reviews incoming messages daily. You can expect a response from us within 24 to 48 business hours.</p>
              <p>In the meantime, feel free to check out our latest hardware and AI benchmarks at <a href="https://techpulse-blog-beta.vercel.app/blog" style="color: #0284c7;">techpulse-blog-beta.vercel.app/blog</a>.</p>
              <p>Best regards,<br><strong>TechPulse Team</strong></p>
            </div>
            <div class="footer">
              TechPulse • <a href="https://techpulse-blog-beta.vercel.app" style="color: #0284c7; text-decoration: none;">techpulse-blog-beta.vercel.app</a>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: senderEmail,
      to: cleanEmail,
      subject: `We received your message: ${subject}`,
      html: confirmationHtml,
    }).catch((err) => console.error('[TechPulse Resend User Receipt Error]:', err));

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been received. A confirmation has been sent to your email.',
    });
  } catch (error: any) {
    console.error('[TechPulse /api/contact Error]:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error?.message || 'Unknown error' });
  }
}
