# Production Deployment & Hosting Guide — Relexa Exports

This guide provides step-by-step instructions to deploy the Relexa Exports web application to any standard production hosting environment, virtual private server (VPS), container platform, or static hosting service with a custom domain and HTTPS.

---

## 1. Architecture Overview

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4.
- **Output:** Fully compiled, optimized static assets in `./dist`.
- **Production Server:** Node.js Express server (`server.mjs`) with security headers (CSP, HSTS, frame-ancestors), rate limiting, and asset caching.
- **Portability:** Can be hosted either as:
  - **Option A:** Node.js / Express production server (`npm start`) behind an Nginx or Caddy reverse proxy.
  - **Option B:** Pure static site on Nginx, Apache, Caddy, Cloudflare Pages, AWS S3 + CloudFront, etc.

---

## 2. Environment Variables Configuration

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Set your production values in `.env`:

```env
# Public canonical domain URL
VITE_SITE_URL=https://relexaexports.com
SITE_URL=https://relexaexports.com

# Canonical domain host for server-side 301 redirects (e.g. relexaexports.com)
CANONICAL_HOST=relexaexports.com

# Automatic HTTP -> HTTPS redirection on Node server (set true when behind an SSL proxy)
FORCE_HTTPS=true

# Web3Forms API Key (https://web3forms.com)
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
WEB3FORMS_ACCESS_KEY=your-web3forms-access-key

# Server Port
PORT=3001
NODE_ENV=production
```

> **Security Note:** `.env` is ignored by git. Never commit live secret keys to version control.

---

## 3. Production Build

Install production dependencies and build the application:

```bash
# 1. Install dependencies
npm ci

# 2. Run TypeScript type check
npm run lint

# 3. Build optimized production bundle
npm run build
```

This generates:
- `dist/index.html` — Main SPA entry point
- `dist/assets/*` — Hashed, fingerprinted JS and CSS bundles
- `dist/robots.txt` — Search crawler policy
- `dist/sitemap.xml` — SEO sitemap
- `dist/_headers` — Security headers configuration for static platforms
- `dist/relexa.pdf` — Company brochure download

---

## 4. Hosting Option A: Node.js / Express Server

Use this option if you are deploying to a VPS (Ubuntu/Debian, AWS EC2, DigitalOcean, Linode, Hetzner) running Node.js.

### Running with PM2 (Recommended)

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

2. Start the application:
   ```bash
   pm2 start server.mjs --name "relexa-exports" -i max
   pm2 save
   pm2 startup
   ```

3. View status and logs:
   ```bash
   pm2 status
   pm2 logs relexa-exports
   ```

### Running with Docker

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.mjs ./
EXPOSE 3001
CMD ["node", "server.mjs"]
```

Build and run the container:

```bash
docker build -t relexa-exports .
docker run -d -p 3001:3001 --env-file .env --name relexa-exports relexa-exports
```

---

## 5. Reverse Proxy Configuration (Nginx & Caddy)

When running the Node.js server, place a reverse proxy in front of port 3001 to handle SSL termination and compression.

### Nginx Configuration (`/etc/nginx/sites-available/relexaexports.com`)

```nginx
# 1. Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name relexaexports.com www.relexaexports.com;
    return 301 https://relexaexports.com$request_uri;
}

# 2. Redirect www to non-www
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.relexaexports.com;

    ssl_certificate /etc/letsencrypt/live/relexaexports.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/relexaexports.com/privkey.pem;

    return 301 https://relexaexports.com$request_uri;
}

# 3. Canonical HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name relexaexports.com;

    ssl_certificate /etc/letsencrypt/live/relexaexports.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/relexaexports.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Forward to Node.js server
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Caddy Configuration (`Caddyfile`)

Caddy automatically provisions Let's Encrypt SSL:

```caddyfile
# Redirect www to non-www
www.relexaexports.com {
    redir https://relexaexports.com{uri} permanent
}

# Canonical site
relexaexports.com {
    reverse_proxy 127.0.0.1:3001
}
```

---

## 6. Hosting Option B: Static Hosting (Nginx Direct)

If you prefer serving `./dist` directly with Nginx without a Node.js process:

```nginx
server {
    listen 443 ssl http2;
    server_name relexaexports.com;

    root /var/www/relexa-exports/dist;
    index index.html;

    # Static build asset caching
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https://api.web3forms.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com;" always;

    # SPA routing fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 7. DNS & Custom Domain Setup

Configure the following DNS records at your domain registrar (Namecheap, GoDaddy, Cloudflare, Route53, etc.):

| Record Type | Host | Value | Purpose |
|-------------|------|-------|---------|
| `A` | `@` | `<Server IPv4 Address>` | Points apex domain to server |
| `AAAA` (optional) | `@` | `<Server IPv6 Address>` | IPv6 connectivity |
| `CNAME` | `www` | `relexaexports.com.` | Subdomain pointing to apex |

---

## 8. SSL / TLS Certificate Setup (Let's Encrypt)

On your Ubuntu/Debian server, run Certbot:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d relexaexports.com -d www.relexaexports.com
```

Select the option to automatically redirect HTTP traffic to HTTPS.

---

## 9. Web3Forms Domain Whitelisting

Because the contact form submits inquiries via Web3Forms:
1. Log into [Web3Forms Dashboard](https://web3forms.com).
2. Select your access key.
3. Under **Settings → Domain Whitelist**, add:
   - `relexaexports.com`
   - `www.relexaexports.com`
   - `localhost` (for staging/testing)
4. Confirm test submissions are delivered to `relexaexport@gmail.com`.

---

## 10. Post-Deployment Verification Checklist

Run these quick checks against your live production domain:

1. **Verify HTTPS redirect:**
   ```bash
   curl -I http://relexaexports.com
   # Should return HTTP/1.1 301 Moved Permanently to https://relexaexports.com
   ```

2. **Verify www redirect:**
   ```bash
   curl -I https://www.relexaexports.com
   # Should return HTTP/2 301 Moved Permanently to https://relexaexports.com
   ```

3. **Verify Security Headers:**
   ```bash
   curl -I https://relexaexports.com
   # Verify presence of:
   # - content-security-policy
   # - x-frame-options: DENY
   # - x-content-type-options: nosniff
   # - referrer-policy: strict-origin-when-cross-origin
   # - strict-transport-security
   ```

4. **Verify Robots & Sitemap:**
   - `https://relexaexports.com/robots.txt`
   - `https://relexaexports.com/sitemap.xml`

5. **Verify Form Submission:**
   - Visit the live site on desktop and mobile.
   - Submit a test inquiry via the form and verify email delivery.
