import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// ─── Types ────────────────────────────────────────────────────────────────────
type ContactPayload = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  interest?: string
  budget?: string
  message: string
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,      
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== 'false', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,     
      pass: process.env.SMTP_PASS,   
    },
  })
}

// ─── Email to YOU (the business) — rich HTML ──────────────────────────────────
function buildAdminEmail(data: ContactPayload): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#888888;font-weight:500;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap;vertical-align:top;border-bottom:1px solid #F0F0F0;">${label}</td>
          <td style="padding:10px 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;color:#212121;vertical-align:top;border-bottom:1px solid #F0F0F0;">${value}</td>
        </tr>`
      : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Inquiry – Realestate Srinagar</title>
</head>
<body style="margin:0;padding:0;background:#F4F4F4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#00523C;padding:36px 40px;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.6);">Realestate Srinagar</p>
              <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:400;color:#ffffff;line-height:1.2;">New Inquiry Received</h1>
              <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.7);">${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </td>
          </tr>

          <!-- Urgency badge -->
          <tr>
            <td style="padding:24px 40px 0;">
              <span style="display:inline-block;background:#FFF3E0;color:#7C4A00;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;padding:6px 14px;border-radius:100px;">
                ⏱ Respond within 24 hours
              </span>
            </td>
          </tr>

          <!-- Details table -->
          <tr>
            <td style="padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ECECEC;border-radius:6px;overflow:hidden;">
                ${row('Name', `${data.firstName} ${data.lastName}`)}
                ${row('Email', `<a href="mailto:${data.email}" style="color:#00523C;">${data.email}</a>`)}
                ${row('Phone', data.phone ? `<a href="tel:${data.phone}" style="color:#00523C;">${data.phone}</a>` : '')}
                ${row('Interested In', data.interest || '')}
                ${row('Budget', data.budget || '')}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="margin:0 0 10px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#888888;">Their Message</p>
              <div style="background:#F8F8F8;border-left:3px solid #00523C;border-radius:0 6px 6px 0;padding:18px 20px;">
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;color:#212121;line-height:1.7;">${data.message.replace(/\n/g, '<br/>')}</p>
              </div>
            </td>
          </tr>

          <!-- Quick reply button -->
          <tr>
            <td style="padding:0 40px 40px;">
              <a href="mailto:${data.email}?subject=Re: Your inquiry – Realestate Srinagar"
                style="display:inline-block;background:#00523C;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;text-decoration:none;padding:14px 28px;border-radius:100px;">
                Reply to ${data.firstName} →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F8F8F8;padding:20px 40px;border-top:1px solid #ECECEC;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#AAAAAA;text-align:center;">
                Realestate Srinagar · Al Sitaar Complex, Hyderpora, Srinagar, J&K 190009
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── Confirmation email to the CLIENT ─────────────────────────────────────────
function buildClientEmail(data: ContactPayload): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>We received your message – Realestate Srinagar</title>
</head>
<body style="margin:0;padding:0;background:#F4F4F4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#00523C;padding:40px 40px 36px;text-align:center;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.6);">Realestate Srinagar</p>
              <!-- Checkmark icon -->
              <div style="margin:20px auto 0;width:60px;height:60px;background:rgba(255,255,255,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                <table width="60" height="60" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                  <tr><td align="center" valign="middle">
                    <span style="font-size:28px;color:#ffffff;">✓</span>
                  </td></tr>
                </table>
              </div>
              <h1 style="margin:16px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:400;color:#ffffff;line-height:1.15;">Message Received,<br/>${data.firstName}.</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;color:#444444;line-height:1.75;">
                Thank you for reaching out to Realestate Srinagar. One of our senior advisors will review your inquiry and get back to you personally within <strong style="color:#212121;">one business day</strong>.
              </p>

              <!-- What happens next -->
              <p style="margin:28px 0 14px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#888888;">What happens next</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ['📋', 'We review your inquiry', 'Our team reads every message personally.'],
                  ['📞', 'An advisor reaches out', 'You\'ll hear from us within 24 hours.'],
                  ['🏡', 'We find your perfect match', 'Tailored property recommendations just for you.'],
                ].map(([icon, title, desc]) => `
                <tr>
                  <td style="padding:12px 0;vertical-align:top;width:40px;font-size:20px;">${icon}</td>
                  <td style="padding:12px 0 12px 12px;border-bottom:1px solid #F0F0F0;">
                    <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:600;color:#212121;">${title}</p>
                    <p style="margin:3px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#888888;">${desc}</p>
                  </td>
                </tr>`).join('')}
              </table>
            </td>
          </tr>

          <!-- Summary of their message -->
          <tr>
            <td style="padding:0 40px 36px;">
              <p style="margin:0 0 10px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#888888;">Your inquiry summary</p>
              <div style="background:#F8F8F8;border-radius:6px;padding:20px;">
                ${data.interest ? `<p style="margin:0 0 6px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#888888;">Interest: <strong style="color:#212121;">${data.interest}</strong></p>` : ''}
                ${data.budget ? `<p style="margin:0 0 6px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#888888;">Budget: <strong style="color:#212121;">${data.budget}</strong></p>` : ''}
                <p style="margin:${data.interest || data.budget ? '12px' : '0'} 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#444444;line-height:1.6;font-style:italic;">"${data.message.slice(0, 200)}${data.message.length > 200 ? '…' : ''}"</p>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <p style="margin:0 0 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#888888;">Can't wait? Call us directly.</p>
              <a href="tel:+919419000000"
                style="display:inline-block;background:#00523C;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;text-decoration:none;padding:14px 32px;border-radius:100px;">
                +91 94190 00000
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F8F8F8;padding:20px 40px;border-top:1px solid #ECECEC;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#AAAAAA;text-align:center;line-height:1.6;">
                Realestate Srinagar · Al Sitaar Complex, Hyderpora, Srinagar, J&K 190009<br/>
                <a href="https://realestate-srinagar.com" style="color:#00523C;text-decoration:none;">realestate-srinagar.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()

    // Basic validation
    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'First name, last name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const transporter = createTransporter()

    // 1. Email to the business
    await transporter.sendMail({
      from: `"Realestate Srinagar Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
      replyTo: body.email,
      subject: `New Inquiry from ${body.firstName} ${body.lastName}${body.interest ? ` — ${body.interest}` : ''}`,
      html: buildAdminEmail(body),
    })

    // 2. Confirmation email to the client
    await transporter.sendMail({
      from: `"Realestate Srinagar" <${process.env.SMTP_USER}>`,
      to: body.email,
      subject: `We received your message, ${body.firstName} — Realestate Srinagar`,
      html: buildClientEmail(body),
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[Contact API Error]', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or call us directly.' },
      { status: 500 }
    )
  }
}