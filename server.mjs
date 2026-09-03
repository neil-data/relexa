/**
 * Relexa Exports — Production static file server & API.
 *
 * NOTE ON WEB3FORMS:
 * Web3Forms is built and designed specifically as a client-side API.
 * On free accounts, Web3Forms blocks automated server-to-server proxying
 * with HTTP 403 ("This method is not allowed. Use our API in client side
 * or contact support with server IP address (Pro plan is required)").
 *
 * The React frontend in `src/components/ContactSection.tsx` submits directly
 * from the browser to `https://api.web3forms.com/submit` using
 * `VITE_WEB3FORMS_ACCESS_KEY`. Web3Forms access keys are public form tokens
 * (protected by your Web3Forms domain whitelist and honeypot).
 *
 * This server serves the built static production site from ./dist (PORT 3001)
 * and keeps /api/contact as an optional endpoint if you use a Pro Web3Forms
 * plan with a whitelisted server IP.
 */
import express from 'express';
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const PORT = process.env.PORT || 3001;
const ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;
const FORCE_HTTPS = process.env.FORCE_HTTPS === 'true';
const CANONICAL_HOST = process.env.CANONICAL_HOST; // e.g. "relexaexports.com"

// Remove fingerprinting header
app.disable('x-powered-by');

// Enable trust proxy for reverse proxies (Cloudflare, Nginx, AWS ALB, etc.)
app.set('trust proxy', 1);

/* ------------------------------------------------------------------ *
 * HTTPS & Canonical Host Redirection Middleware
 * ------------------------------------------------------------------ */
app.use((req, res, next) => {
  const host = req.headers.host ? req.headers.host.split(':')[0] : '';
  const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https';

  // Redirect to HTTPS if FORCE_HTTPS is enabled
  if (FORCE_HTTPS && !isHttps) {
    return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
  }

  // Canonical host redirection if configured
  if (CANONICAL_HOST && host && host !== CANONICAL_HOST) {
    const protocol = isHttps ? 'https' : 'http';
    return res.redirect(301, `${protocol}://${CANONICAL_HOST}${req.originalUrl}`);
  }

  next();
});

/* ------------------------------------------------------------------ *
 * Modern Security Headers Middleware
 * ------------------------------------------------------------------ */
app.use((req, res, next) => {
  // Content Security Policy tailored strictly to application needs
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://api.web3forms.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://api.web3forms.com",
  ];

  res.setHeader('Content-Security-Policy', cspDirectives.join('; '));
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');

  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  next();
});

/* ------------------------------------------------------------------ *
 * Body Parser with strict 10kb size limit
 * ------------------------------------------------------------------ */
app.use(express.json({ limit: '10kb' }));

/* ------------------------------------------------------------------ *
 * In-Memory IP Rate Limiter for API Endpoints (Anti-Abuse)
 * ------------------------------------------------------------------ */
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean expired rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

const rateLimiter = (req, res, next) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  const record = rateLimitMap.get(clientIp) || { count: 0, startTime: now };

  if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    record.count = 1;
    record.startTime = now;
  } else {
    record.count += 1;
  }

  rateLimitMap.set(clientIp, record);

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a few minutes before submitting again.',
    });
  }

  next();
};

const SITE_NAME = 'Relexa Exports';
const CONTACT_EMAIL = 'relexaexport@gmail.com';

/* ------------------------------------------------------------------ *
 * POST /api/contact
 * ------------------------------------------------------------------ */
app.post('/api/contact', rateLimiter, async (req, res) => {
  try {
    if (!ACCESS_KEY) {
      console.error(
        '[contact] WEB3FORMS_ACCESS_KEY is not set on the server. ' +
        'Note: Web3Forms free tier works directly from the client side.'
      );
      return res.status(500).json({
        success: false,
        message: 'Server contact endpoint is not configured. Please use direct email.',
      });
    }

    const { name, email, phone, company, message, subject, botcheck } = req.body || {};

    // Validation & Length Bounds
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({ success: false, message: 'Please enter a valid name (2-100 characters).' });
    }
    if (
      !email ||
      typeof email !== 'string' ||
      email.trim().length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 5 || message.trim().length > 3000) {
      return res.status(400).json({ success: false, message: 'Please enter a message (5-3000 characters).' });
    }

    // Honeypot anti-spam
    if (botcheck && String(botcheck).trim() !== '') {
      return res.json({ success: true, message: 'Thank you. We will get back to you shortly.' });
    }

    const formData = new FormData();
    formData.append('access_key', ACCESS_KEY);
    formData.append(
      'subject',
      subject && String(subject).trim()
        ? String(subject).slice(0, 150)
        : `New enquiry from ${SITE_NAME} (${name.trim()})`
    );
    formData.append('from_name', name.trim());
    formData.append('email', email.trim());
    formData.append('message', message.trim());
    formData.append('replyto', email.trim());
    formData.append('from_email', CONTACT_EMAIL);
    formData.append('site_name', SITE_NAME);
    formData.append('botcheck', '');

    if (phone && String(phone).trim()) formData.append('phone', String(phone).trim().slice(0, 30));
    if (company && String(company).trim()) formData.append('company', String(company).trim().slice(0, 100));

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    let data = null;
    const text = await response.text();
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }

    if (!response.ok || !data?.success) {
      console.error('[contact] Web3Forms proxy response:', {
        status: response.status,
        message: data?.message || text.slice(0, 200),
      });

      const userReason =
        response.status === 403
          ? 'Contact service is operating in direct browser mode. Please submit directly via the portal.'
          : 'We could not send your message right now. Please try again or email us directly.';

      return res.status(502).json({ success: false, message: userReason });
    }

    return res.json({
      success: true,
      message: 'Thank you! Your message has been sent. We will get back to you shortly.',
    });
  } catch (err) {
    console.error('[contact] Unexpected error:', err?.message || err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again or email us directly.',
    });
  }
});

/* ------------------------------------------------------------------ *
 * Static Site Serving with Asset Caching
 * ------------------------------------------------------------------ */
const distDir = path.join(__dirname, 'dist');

// Immutable long-term caching for hashed build assets
app.use(
  '/assets',
  express.static(path.join(distDir, 'assets'), {
    maxAge: '1y',
    immutable: true,
  })
);

// Standard caching for root static files, must-revalidate for HTML
app.use(
  express.static(distDir, {
    maxAge: '1h',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      }
    },
  })
);

// SPA fallback
app.get('*', (req, res, next) => {
  res.sendFile(path.join(distDir, 'index.html'), (err) => {
    if (err) next(err);
  });
});

/* ------------------------------------------------------------------ *
 * Generic Safe Error Handler (No stack traces or internal disclosures)
 * ------------------------------------------------------------------ */
app.use((err, req, res, next) => {
  console.error('[server error]', err?.message || 'Unknown error');
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    message: 'A server error occurred. Please try again.',
  });
});

app.listen(PORT, () => {
  console.log(`[server] Relexa Exports server running on http://localhost:${PORT}`);
  console.log(`[server] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[server] Security headers and rate limiting active`);
});
