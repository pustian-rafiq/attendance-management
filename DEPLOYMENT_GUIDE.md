# 🚀 Deployment Guide - Class Attendance Management System

## Pre-Deployment Checklist

Before deploying, ensure you have completed:

- ✅ **Build Test**: `npm run build` completed successfully
- ✅ **Type Check**: `npm run type-check` passed
- ✅ **Lint Check**: `npm run lint` passed
- ✅ **Local Testing**: Application runs on `http://localhost:3001`

## Quick Deployment

### Option 1: Vercel (Recommended - Easiest)

Vercel is the recommended platform for Next.js applications.

#### Steps:

1. **Install Vercel CLI** (if not already installed):

```bash
npm i -g vercel
```

2. **Login to Vercel**:

```bash
vercel login
```

3. **Deploy from project directory**:

```bash
cd attendance-management
vercel
```

4. **Follow the prompts**:

   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: class-attendance-management
   - Directory: ./
   - Override settings: No

5. **Production Deployment**:

```bash
vercel --prod
```

Your app will be live at: `https://your-project-name.vercel.app`

**Features with Vercel:**

- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic scaling
- ✅ CI/CD integration
- ✅ Zero configuration

---

### Option 2: Netlify

#### Via Netlify CLI:

1. **Install Netlify CLI**:

```bash
npm install -g netlify-cli
```

2. **Build the project**:

```bash
npm run build
```

3. **Deploy**:

```bash
netlify deploy
```

4. **Deploy to production**:

```bash
netlify deploy --prod
```

#### Via Netlify Dashboard:

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Base directory**: `attendance-management`

---

### Option 3: Railway

1. **Visit** [railway.app](https://railway.app)
2. **Click** "Start a New Project"
3. **Select** "Deploy from GitHub repo"
4. **Choose** your repository
5. **Configure**:
   - Root directory: `attendance-management`
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
6. **Deploy** automatically

---

### Option 4: Manual Server Deployment

For deploying on your own server (VPS, DigitalOcean, AWS EC2, etc.):

#### Prerequisites:

- Node.js 18+ installed on server
- PM2 for process management
- Nginx for reverse proxy (optional)

#### Steps:

1. **Copy files to server**:

```bash
# On your local machine
cd attendance-management
tar -czf attendance-app.tar.gz .

# Upload to server
scp attendance-app.tar.gz user@your-server:/var/www/
```

2. **On the server**:

```bash
cd /var/www
tar -xzf attendance-app.tar.gz
cd attendance-management

# Install dependencies
npm install --production

# Build the application
npm run build
```

3. **Install PM2** (process manager):

```bash
npm install -g pm2
```

4. **Start the application with PM2**:

```bash
pm2 start npm --name "attendance-app" -- start
pm2 save
pm2 startup
```

5. **Configure Nginx** (optional, for custom domain):

Create file: `/etc/nginx/sites-available/attendance-app`

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/attendance-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

6. **SSL Certificate** (with Let's Encrypt):

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### Option 5: Docker Deployment

#### Create Dockerfile:

```dockerfile
# attendance-management/Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3001
ENV PORT 3001

CMD ["node", "server.js"]
```

#### Docker Compose (optional):

```yaml
# attendance-management/docker-compose.yml
version: "3.8"

services:
  web:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

#### Deploy:

```bash
docker-compose up -d
```

---

## Environment Variables

### Create `.env.production` file:

```env
# Production Environment Variables
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### For API Integration (Future):

```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

---

## Performance Optimization

### Before Deployment:

1. **Optimize Images**:

   - Already using Next.js Image component
   - Configured for `ui-avatars.com`

2. **Code Splitting**:

   - Automatic with Next.js App Router
   - Route-based splitting enabled

3. **Minification**:

   - Automatic in production build
   - CSS and JS minified

4. **Caching**:
   - Static assets cached automatically
   - Configure cache headers if needed

---

## Post-Deployment Checklist

After deployment:

- [ ] Test login functionality
- [ ] Verify all pages load correctly
- [ ] Test responsive design on mobile
- [ ] Check attendance marking works
- [ ] Verify reports generation
- [ ] Test data export (CSV)
- [ ] Check navigation and routing
- [ ] Verify all images load
- [ ] Test on different browsers
- [ ] Check console for errors

---

## Monitoring

### Vercel Analytics (if using Vercel):

Add to your project:

```bash
npm install @vercel/analytics
```

Update `src/app/layout.tsx`:

```typescript
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Troubleshooting Deployment

### Build Fails

**Error**: "Module not found"

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Error**: "Out of memory"

```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Runtime Errors

**Error**: "Environment variables not found"

- Check `.env.production` file exists
- Verify variable names match usage

**Error**: "Page not found"

- Check file structure in `src/app/`
- Verify routing is correct

### Performance Issues

**Slow loading**:

- Enable compression on server
- Use CDN for static assets
- Optimize images further

---

## Domain Configuration

### Custom Domain on Vercel:

1. Go to project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records:
   - Type: CNAME
   - Name: www (or @)
   - Value: cname.vercel-dns.com

### Custom Domain on Netlify:

1. Go to "Domain settings"
2. Add custom domain
3. Update DNS records as instructed

---

## Security Considerations

### For Production Deployment:

1. **Environment Variables**:

   - Never commit `.env` files
   - Use platform-specific environment variable management
   - Keep sensitive data secure

2. **Authentication** (when integrating real backend):

   - Implement proper JWT authentication
   - Use HTTPS only
   - Implement rate limiting
   - Add CSRF protection

3. **Data Validation**:
   - Validate all user inputs
   - Sanitize data before storage
   - Implement proper error handling

---

## Scaling Considerations

### Current Setup:

- Client-side rendering with mock data
- No database required
- Lightweight and fast

### Future with Backend:

- Implement database connection pooling
- Add Redis for caching
- Use CDN for static assets
- Implement load balancing

---

## Backup Strategy

### For Production:

1. **Code Backup**:

   - Use Git version control
   - Push to GitHub/GitLab regularly

2. **Data Backup** (when using real database):
   - Daily automated backups
   - Off-site backup storage
   - Backup retention policy

---

## Cost Estimation

### Vercel:

- **Free Tier**: Suitable for this project
- **Pro**: $20/month (if needed)
- **Features**: Unlimited bandwidth on free tier

### Netlify:

- **Free Tier**: 100GB bandwidth/month
- **Pro**: $19/month

### Railway:

- **Free Tier**: $5 credit/month
- **Pay as you go**: After credits

### VPS (DigitalOcean):

- **Basic Droplet**: $6/month
- **Includes**: 1GB RAM, 25GB SSD

---

## CI/CD Integration

### GitHub Actions Example:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Vercel CLI
        run: npm install -g vercel
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Quick Deploy Commands

### Vercel:

```bash
cd attendance-management
vercel --prod
```

### Netlify:

```bash
cd attendance-management
netlify deploy --prod
```

### Manual Build:

```bash
cd attendance-management
npm run build
npm start
```

---

## Application URLs After Deployment

### Local Development:

- http://localhost:3001

### Vercel:

- https://your-project-name.vercel.app

### Netlify:

- https://your-project-name.netlify.app

### Railway:

- https://your-project-name.up.railway.app

### Custom Domain:

- https://your-domain.com

---

## Support & Resources

### Deployment Documentation:

- [Vercel Deployment](https://vercel.com/docs/deployments)
- [Netlify Deployment](https://docs.netlify.com/site-deploys)
- [Railway Deployment](https://docs.railway.app)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

### Community Support:

- [Next.js Discord](https://nextjs.org/discord)
- [Vercel Community](https://github.com/vercel/next.js/discussions)

---

## 🎉 Ready to Deploy!

Your application is **production-ready** and can be deployed using any of the methods above.

### Recommended for Beginners:

**Use Vercel** - It's the easiest and fastest way to deploy Next.js applications with zero configuration.

```bash
cd attendance-management
npm install -g vercel
vercel
```

That's it! Your attendance management system will be live in minutes! 🚀

---

**Need Help?** Check the troubleshooting section or refer to the platform-specific documentation.
