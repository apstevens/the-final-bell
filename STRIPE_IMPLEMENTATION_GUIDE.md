# Stripe Payment Implementation Guide

This guide walks you through setting up Stripe payments for your Final Bell shop.

## What's Been Implemented

✅ **Frontend Components:**
- Shopping cart context ([src/contexts/CartContext.tsx](src/contexts/CartContext.tsx))
- Cart UI component with floating button ([src/components/Cart.tsx](src/components/Cart.tsx))
- Success page ([src/pages/Success.tsx](src/pages/Success.tsx))
- Cancel page ([src/pages/Cancel.tsx](src/pages/Cancel.tsx))
- Updated Shop page with "Add to Cart" functionality ([src/pages/Shop.tsx](src/pages/Shop.tsx))

✅ **Dependencies:**
- `@stripe/stripe-js` - Stripe JavaScript library

✅ **Backend Example:**
- Node.js/Express server example ([server-example.js](server-example.js))

---

## Setup Instructions

### Step 1: Get Your Stripe API Keys (Stripe Dashboard)

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register) and create an account
2. Navigate to **Developers → API Keys**
3. Copy your **Publishable key** (starts with `pk_test_...`)
4. Copy your **Secret key** (starts with `sk_test_...`) - Keep this secure!

### Step 2: Configure Frontend Environment Variables (Frontend Project)

**📁 Location:** Root of your frontend project (`final-bell-marketing/`)

1. Create a `.env` file in your **frontend project root**:

```bash
# .env (in final-bell-marketing/)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
VITE_API_URL=http://localhost:3001
```

2. **IMPORTANT:** Add `.env` to your `.gitignore` to keep keys secure:

```bash
echo ".env" >> .gitignore
```

### Step 3: Set Up Backend Server (New Backend Project)

**⚠️ IMPORTANT:** This step creates a **separate backend project**. You need a backend server to securely process Stripe payments because your frontend cannot use the secret key directly.

#### Option A: Node.js/Express (Recommended for Quick Setup)

**📁 Location:** Create a **new directory** separate from your frontend

1. **Create a new directory for your backend** (in a separate location):

```bash
# Run this in your parent projects directory, NOT inside final-bell-marketing/
mkdir final-bell-backend
cd final-bell-backend
npm init -y
```

2. **Install backend dependencies** (in the `final-bell-backend/` directory):

```bash
npm install express stripe cors dotenv
```

3. **Copy the server code** - Copy the [server-example.js](server-example.js) file from your frontend project to this backend directory:

```bash
# If server-example.js is in your frontend project root
cp ../final-bell-marketing/server-example.js ./server.js
```

4. **Create backend `.env` file** (in the `final-bell-backend/` directory):

```bash
# .env (in final-bell-backend/)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
CLIENT_URL=http://localhost:5173
PORT=3001
```

5. **Run the backend server** (in the `final-bell-backend/` directory):

```bash
node server.js
```

**Your directory structure should look like this:**
```
Projects/
├── final-bell-marketing/          # Frontend React app
│   ├── src/
│   ├── .env                       # Frontend env (VITE_* variables)
│   └── package.json
└── final-bell-backend/            # Backend Node.js server
    ├── server.js                  # Your Express server
    ├── .env                       # Backend env (STRIPE_SECRET_KEY)
    └── package.json
```

#### Option B: Deploy to Serverless Platform

You can deploy your backend to:
- **Vercel** - [Vercel Serverless Functions](https://vercel.com/docs/functions)
- **Netlify** - [Netlify Functions](https://www.netlify.com/products/functions/)
- **Railway** - [Railway.app](https://railway.app/)
- **Render** - [Render.com](https://render.com/)

### Step 4: Test the Payment Flow

**You need to run BOTH servers simultaneously:**

1. **Terminal 1 - Start your frontend** (in `final-bell-marketing/`):

```bash
npm run dev
```

2. **Terminal 2 - Start your backend** (in `final-bell-backend/`):

```bash
node server.js
```

3. Navigate to [http://localhost:5173/shop](http://localhost:5173/shop)

4. Add items to cart and click "Proceed to Checkout"

5. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Requires authentication: `4000 0025 0000 3155`
   - Declined: `4000 0000 0000 9995`
   - Use any future expiry date, any 3-digit CVC, and any 5-digit postal code

### Step 5: Set Up Webhooks (Recommended for Production)

**📁 Location:** Run these commands from anywhere, but update the **backend `.env`** file

Webhooks allow you to receive notifications when payments are completed:

1. **Install Stripe CLI**: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

2. **Login to Stripe CLI**:

```bash
stripe login
```

3. **Forward webhooks to your local backend server** (Terminal 3):

```bash
stripe listen --forward-to localhost:3001/webhook
```

4. **Copy the webhook signing secret** (starts with `whsec_...`) to your **backend `.env` file** (in `final-bell-backend/.env`)

5. **In production**, set up webhooks in the Stripe Dashboard:
   - Go to **Developers → Webhooks**
   - Add endpoint: `https://your-backend.com/webhook`
   - Select events: `checkout.session.completed`

---

## Production Deployment Checklist

### Frontend (Vite App)

1. Update environment variables for production:

```bash
# .env.production
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
VITE_API_URL=https://your-backend-api.com
```

2. Deploy to:
   - **Vercel**: `vercel --prod`
   - **Netlify**: `netlify deploy --prod`
   - **GitHub Pages** / **Cloudflare Pages**

### Backend API

1. Deploy your backend to a hosting platform

2. Set environment variables on your hosting platform:
   - `STRIPE_SECRET_KEY` (use **live** key, starts with `sk_live_`)
   - `STRIPE_WEBHOOK_SECRET`
   - `CLIENT_URL` (your production frontend URL)

3. Update Stripe webhook endpoint to your production backend URL

4. **Switch to Live Mode** in Stripe Dashboard

---

## File Structure

```
final-bell-marketing/
├── src/
│   ├── components/
│   │   ├── Cart.tsx              # Floating cart with checkout
│   │   └── NavBar.tsx
│   ├── contexts/
│   │   └── CartContext.tsx       # Shopping cart state management
│   ├── pages/
│   │   ├── Shop.tsx              # Shop with products
│   │   ├── Success.tsx           # Payment success page
│   │   └── Cancel.tsx            # Payment cancelled page
│   └── main.tsx                  # Updated with CartProvider
├── backend/                      # Your backend (separate project)
│   ├── server-example.js        # Express server with Stripe
│   ├── package.json
│   └── .env
├── .env                         # Frontend environment variables
├── .env.example                 # Example env file
└── STRIPE_IMPLEMENTATION_GUIDE.md

```

---

## How It Works

1. **User adds items to cart** → Stored in React context (CartContext)
2. **User clicks "Proceed to Checkout"** → Frontend calls your backend API
3. **Backend creates Stripe Checkout Session** → Returns session ID
4. **Frontend redirects to Stripe Checkout** → User enters payment details
5. **Payment succeeds** → Stripe redirects to `/success` page
6. **Webhook notifies backend** → Backend fulfills order (save to DB, send email, etc.)

---

## Customization Options

### Add Product Variants (Size, Color)

Update the Product interface in [CartContext.tsx](src/contexts/CartContext.tsx):

```typescript
export interface Product {
  id: number;
  name: string;
  price: number;
  variants?: {
    size?: string;
    color?: string;
  };
}
```

### Add Shipping Options

In your backend ([server-example.js](server-example.js)), add shipping rates:

```javascript
const session = await stripe.checkout.sessions.create({
  // ... existing config
  shipping_options: [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 500, // £5.00
          currency: 'gbp',
        },
        display_name: 'Standard Shipping',
        delivery_estimate: {
          minimum: { unit: 'business_day', value: 3 },
          maximum: { unit: 'business_day', value: 5 },
        },
      },
    },
  ],
});
```

### Add Discount Codes

```javascript
const session = await stripe.checkout.sessions.create({
  // ... existing config
  allow_promotion_codes: true,
});
```

Then create promotion codes in the Stripe Dashboard.

---

## Troubleshooting

### "Cannot connect to backend"
- Ensure backend server is running
- Check `VITE_API_URL` in `.env` matches your backend URL
- Check CORS is enabled in backend

### "Invalid API Key"
- Verify you copied the correct keys from Stripe Dashboard
- Ensure you're using **Publishable key** in frontend
- Ensure you're using **Secret key** in backend

### "Payment succeeds but cart doesn't clear"
- Check the success page is calling `clearCart()`
- Verify the redirect URL in backend matches your frontend URL

---

## Security Best Practices

✅ **Never expose your Secret Key** - Only use it in backend
✅ **Use environment variables** - Don't commit keys to Git
✅ **Validate webhooks** - Use webhook signatures to verify authenticity
✅ **Use HTTPS in production** - Required by Stripe for live mode
✅ **Implement rate limiting** - Prevent API abuse on your backend

---

## Support & Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing Cards](https://stripe.com/docs/testing)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)

---

## Next Steps

1. ✅ Set up Stripe account
2. ✅ Configure environment variables
3. ✅ Set up and run backend server
4. ✅ Test with test cards
5. ⬜ Implement order fulfillment (save to database, send confirmation emails)
6. ⬜ Add shipping options
7. ⬜ Set up webhooks for production
8. ⬜ Deploy to production
9. ⬜ Switch to live mode

---

**Need Help?** Check the Stripe documentation or contact Stripe support for payment-related issues.
