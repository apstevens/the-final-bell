# Final Bell Deployment Guide

Complete step-by-step guide to deploy your online store using **Vercel (Frontend)** + **Railway (Backend)**.

⏱️ **Total Time**: ~15 minutes
💰 **Monthly Cost**: ~$10-15

---

## Prerequisites

- [x] GitHub account
- [x] Stripe account (get API keys from [dashboard.stripe.com](https://dashboard.stripe.com))
- [x] Node.js installed locally
- [ ] Vercel account ([vercel.com](https://vercel.com))
- [ ] Railway account ([railway.app](https://railway.app))

---

## Part 1: Backend Deployment (Railway)

### Step 1: Push Backend to GitHub

```bash
cd C:\Users\nakmu\OneDrive\Documents\Projects\final-bell-api
git init
git add .
git commit -m "Initial commit: Final Bell API"
git remote add origin https://github.com/YOUR-USERNAME/final-bell-api.git
git push -u origin master
```

### Step 2: Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `final-bell-api` repository
4. Railway will auto-detect Node.js and start building

### Step 3: Add PostgreSQL Database

1. In your Railway project, click **"+ New"** → **"Database"** → **"PostgreSQL"**
2. Railway automatically creates `DATABASE_URL` environment variable
3. Click on PostgreSQL service → **"Connect"** tab → Copy the connection string

### Step 4: Set Environment Variables

Click on your backend service → **"Variables"** tab → Add these:

```bash
NODE_ENV=production
PORT=3000

# DATABASE_URL is auto-set by Railway - don't add manually

# JWT Authentication (generate secure random strings)
JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY_MINIMUM_32_CHARACTERS
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# CORS - Add your Vercel frontend URL (you'll update this after frontend deployment)
ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:5173

# Stripe Keys (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY

# Email Configuration (optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
EMAIL_FROM=noreply@finalbell.com

# FTP Configuration (for product sync)
FTP_HOST=161.35.45.163
FTP_USER=your-ftp-username
FTP_PASSWORD=your-ftp-password
FTP_CSV_PATH=/path/to/stock.csv

# CSV Sync Schedule (every 6 hours)
CSV_SYNC_SCHEDULE=0 */6 * * *

# IP Blacklist
IP_BLACKLIST_ENABLED=true
IP_BLACKLIST_UPDATE_INTERVAL_HOURS=24
IP_BLACKLIST_FILE_PATH=./data/ip-blacklist.txt

# Admin
ADMIN_EMAIL=admin@finalbell.com
```

### Step 5: Run Database Migrations

Railway will automatically run `npm run build` which includes `npx prisma generate`.

To run migrations:
1. Click on your backend service → **"Settings"** tab
2. Scroll to **"Deploy Command"** (optional)
3. Or manually via Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and link to project
railway login
railway link

# Run migrations
railway run npx prisma migrate deploy
```

### Step 6: Test Backend

1. Click on your backend service → **"Settings"** → **"Networking"**
2. Click **"Generate Domain"** (e.g., `final-bell-api.up.railway.app`)
3. Visit `https://your-backend.up.railway.app/health` - should return:
   ```json
   {
     "status": "healthy",
     "timestamp": "2025-11-20T...",
     "database": "connected"
   }
   ```

✅ **Backend deployed!** Copy your Railway URL for the next step.

---

## Part 2: Frontend Deployment (Vercel)

### Step 7: Update Frontend Environment Variables

Create/update `.env.local` for local development:

```bash
# .env.local
VITE_API_URL=https://your-backend.up.railway.app
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_STRIPE_PUBLIC_KEY
VITE_CALENDLY_URL=https://calendly.com/your-username
```

### Step 8: Push Frontend to GitHub

```bash
cd C:\Users\nakmu\OneDrive\Documents\Projects\final-bell-marketing
git add .
git commit -m "Add Vercel configuration and deployment setup"
git remote add origin https://github.com/YOUR-USERNAME/final-bell-marketing.git
git push -u origin master
```

### Step 9: Deploy to Vercel

**Option A: Using Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your `final-bell-marketing` repository
4. Vercel auto-detects Vite - click **"Deploy"**
5. Add Environment Variables in the import screen:
   - `VITE_API_URL` = `https://your-backend.up.railway.app`
   - `VITE_STRIPE_PUBLIC_KEY` = `pk_test_YOUR_KEY`
   - `VITE_CALENDLY_URL` = `https://calendly.com/your-username`
6. Click **"Deploy"**

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: final-bell-marketing
# - Which directory? ./
# - Override settings? No

# Add environment variables
vercel env add VITE_API_URL production
# Paste: https://your-backend.up.railway.app

vercel env add VITE_STRIPE_PUBLIC_KEY production
# Paste: pk_test_YOUR_KEY

# Deploy to production
vercel --prod
```

### Step 10: Update Backend CORS

1. Go back to **Railway** → Backend service → **Variables**
2. Update `ALLOWED_ORIGINS` to include your Vercel URL:
   ```
   https://your-app.vercel.app,http://localhost:5173
   ```
3. Railway will auto-redeploy

✅ **Frontend deployed!** Visit `https://your-app.vercel.app`

---

## Part 3: Stripe Webhook Configuration

### Step 11: Set Up Stripe Webhooks

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks)
2. Click **"Add endpoint"**
3. Endpoint URL: `https://your-backend.up.railway.app/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **"Add endpoint"**
6. Copy the **"Signing secret"** (starts with `whsec_`)
7. Go to **Railway** → Backend Variables → Update `STRIPE_WEBHOOK_SECRET`

---

## Part 4: Domain Configuration (Optional)

### Custom Domain on Vercel

1. Go to Vercel project → **"Settings"** → **"Domains"**
2. Add your domain (e.g., `finalbell.co.uk`)
3. Update DNS records as instructed by Vercel
4. Update `ALLOWED_ORIGINS` in Railway backend

### Custom Domain on Railway (Optional)

1. Railway project → Backend service → **"Settings"** → **"Networking"**
2. Click **"Custom Domain"**
3. Add `api.finalbell.co.uk`
4. Update DNS CNAME record

---

## Part 5: Testing & Verification

### ✅ Checklist

- [ ] Backend `/health` endpoint returns `"healthy"`
- [ ] Frontend loads without errors
- [ ] Products display correctly
- [ ] Add to cart works
- [ ] Stripe checkout opens
- [ ] Test purchase with Stripe test card: `4242 4242 4242 4242`
- [ ] Order appears in Railway database
- [ ] Webhook received in Stripe dashboard

---

## Troubleshooting

### Backend Issues

**Problem**: Database connection fails
**Solution**: Check `DATABASE_URL` in Railway variables (should be auto-set)

**Problem**: CORS errors
**Solution**: Verify `ALLOWED_ORIGINS` includes your Vercel URL (with https://)

**Problem**: Stripe webhook failing
**Solution**: Check `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard signing secret

### Frontend Issues

**Problem**: API calls fail (CORS or 404)
**Solution**: Verify `VITE_API_URL` points to Railway backend URL (include https://)

**Problem**: Stripe checkout doesn't open
**Solution**: Check `VITE_STRIPE_PUBLIC_KEY` is correct and starts with `pk_test_`

**Problem**: Build fails on Vercel
**Solution**: Check build logs - ensure all dependencies in `package.json`

---

## Environment Variables Quick Reference

### Backend (Railway)
```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=<auto-set-by-railway>
JWT_SECRET=<generate-random-32-chars>
ALLOWED_ORIGINS=https://your-app.vercel.app
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
FTP_HOST=161.35.45.163
# ... see Step 4 for complete list
```

### Frontend (Vercel)
```bash
VITE_API_URL=https://your-backend.up.railway.app
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
VITE_CALENDLY_URL=https://calendly.com/username
```

---

## Automatic Deployments

Both Vercel and Railway automatically deploy on `git push`:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Both platforms auto-deploy in ~2 minutes
```

---

## Monitoring & Logs

### Railway Logs
- Railway Dashboard → Your service → **"Deployments"** tab → Click deployment → View logs

### Vercel Logs
- Vercel Dashboard → Your project → **"Deployments"** tab → Click deployment → View logs

---

## Cost Breakdown

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| **Railway** | Hobby | ~$5-10 |
| - PostgreSQL | | ~$5 |
| - Backend API | | ~$5 |
| **Vercel** | Hobby | $0 |
| **Total** | | **~$10-15** |

---

## Next Steps

1. Set up monitoring (Railway has built-in metrics)
2. Configure error tracking (Sentry)
3. Set up automated backups for PostgreSQL
4. Enable 2FA on Railway and Vercel accounts
5. Review security best practices
6. Set up staging environment (separate Railway/Vercel projects)

---

## Support

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Stripe Docs: https://stripe.com/docs

---

**Deployment Date**: ___________
**Railway Backend URL**: ___________
**Vercel Frontend URL**: ___________
**Custom Domain**: ___________
