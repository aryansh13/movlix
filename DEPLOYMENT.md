# 🚀 CinePulse Deployment Guide

Panduan lengkap untuk deployment CinePulse ke berbagai platform.

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn
- Git
- Akun hosting platform (Vercel, Netlify, dll)

## 🏗️ Build & Production

### 1. Environment Setup

1. **Copy environment file:**
```bash
cp env.example .env.local
```

2. **Update environment variables:**
```bash
# .env.local
NEXT_PUBLIC_APP_NAME=CinePulse
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_TMDB_API_KEY=your_actual_tmdb_api_key
NODE_ENV=production
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Build Application

```bash
npm run build
# atau
yarn build
```

### 4. Start Production Server

```bash
npm start
# atau
yarn start
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

Vercel adalah platform yang optimal untuk Next.js applications.

#### Setup Vercel:

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Environment Variables:**
Set environment variables di Vercel dashboard:
- `NEXT_PUBLIC_TMDB_API_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NODE_ENV=production`

#### Vercel Configuration (vercel.json):
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_TMDB_API_KEY": "@tmdb-api-key",
    "NEXT_PUBLIC_APP_URL": "@app-url"
  },
  "functions": {
    "src/app/api/**/*.js": {
      "maxDuration": 30
    }
  }
}
```

### Option 2: Netlify

#### Setup Netlify:

1. **Build settings:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

2. **Deploy via Git:**
- Connect repository ke Netlify
- Set build command: `npm run build`
- Set publish directory: `.next`

### Option 3: Docker

#### Dockerfile:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose:
```yaml
# docker-compose.yml
version: '3.8'

services:
  cinepulse:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_TMDB_API_KEY=${TMDB_API_KEY}
      - NEXT_PUBLIC_APP_URL=${APP_URL}
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

#### Build & Run:
```bash
# Build image
docker build -t cinepulse .

# Run container
docker run -p 3000:3000 cinepulse

# Or use docker-compose
docker-compose up -d
```

### Option 4: Traditional VPS/Server

#### Setup Ubuntu Server:

1. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Install PM2:**
```bash
sudo npm install -g pm2
```

3. **Clone repository:**
```bash
git clone https://github.com/yourusername/cinepulse.git
cd cinepulse
```

4. **Install dependencies:**
```bash
npm install
```

5. **Build application:**
```bash
npm run build
```

6. **Start with PM2:**
```bash
pm2 start npm --name "cinepulse" -- start
pm2 save
pm2 startup
```

#### Nginx Configuration:
```nginx
# /etc/nginx/sites-available/cinepulse
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
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

## 🔧 Production Optimizations

### 1. Performance

- **Image Optimization:** Next.js Image component sudah dioptimasi
- **Code Splitting:** Automatic dengan Next.js
- **Caching:** Implement Redis untuk API caching
- **CDN:** Gunakan CloudFlare atau AWS CloudFront

### 2. Security

- **HTTPS:** Wajib untuk production
- **Environment Variables:** Jangan commit ke Git
- **Rate Limiting:** Implement untuk API endpoints
- **CORS:** Configure dengan benar
- **Headers:** Set security headers

### 3. Monitoring

- **Error Tracking:** Sentry atau LogRocket
- **Analytics:** Google Analytics atau Mixpanel
- **Uptime:** UptimeRobot atau Pingdom
- **Logs:** Winston atau Morgan

## 📊 Database Migration

### From JSON to PostgreSQL:

1. **Install PostgreSQL:**
```bash
sudo apt-get install postgresql postgresql-contrib
```

2. **Create database:**
```sql
CREATE DATABASE cinepulse;
CREATE USER cinepulse_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE cinepulse TO cinepulse_user;
```

3. **Update database.js:**
```javascript
// Replace JSON file operations with PostgreSQL queries
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
```

## 🔄 CI/CD Pipeline

### GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
      env:
        NEXT_PUBLIC_TMDB_API_KEY: ${{ secrets.TMDB_API_KEY }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🚨 Troubleshooting

### Common Issues:

1. **Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

2. **Environment Variables:**
```bash
# Check if variables are loaded
console.log(process.env.NEXT_PUBLIC_TMDB_API_KEY)
```

3. **Database Connection:**
```bash
# Check database connection
npm run db:test
```

4. **Memory Issues:**
```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## 📈 Scaling

### Horizontal Scaling:

1. **Load Balancer:** Nginx atau HAProxy
2. **Multiple Instances:** PM2 cluster mode
3. **Database:** Read replicas
4. **Caching:** Redis cluster
5. **CDN:** Global distribution

### Vertical Scaling:

1. **Server Specs:** Upgrade CPU/RAM
2. **Database:** Optimize queries
3. **Caching:** Implement aggressive caching
4. **Images:** Optimize and compress

## 🔐 Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API rate limiting
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Security headers
- [ ] Regular updates
- [ ] Backup strategy

## 📞 Support

Jika mengalami masalah deployment, silakan:

1. Check logs: `pm2 logs cinepulse`
2. Check status: `pm2 status`
3. Restart service: `pm2 restart cinepulse`
4. Contact support: hello@cinepulse.id

---

**Happy Deploying! 🚀**
