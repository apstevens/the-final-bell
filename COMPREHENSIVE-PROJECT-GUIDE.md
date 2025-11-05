# The Final Bell - Comprehensive Project Guide

**A Complete Learning Document**
*Everything Built Across Your Three Projects*

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Project 1: final-bell-marketing (Frontend)](#project-1-final-bell-marketing-frontend)
4. [Project 2: final-bell-api (Backend)](#project-2-final-bell-api-backend)
5. [Project 3: the-final-bell-app (Mobile)](#project-3-the-final-bell-app-mobile)
6. [Key Features Built](#key-features-built)
7. [Integration Flows](#integration-flows)
8. [Code Patterns & Best Practices](#code-patterns--best-practices)
9. [Learning Exercises](#learning-exercises)
10. [Troubleshooting Guide](#troubleshooting-guide)

---

## Project Overview

### The Final Bell Ecosystem

The Final Bell is a complete e-commerce and booking platform for a martial arts training business, consisting of three interconnected applications:

```
┌─────────────────────────────────────────────────────────────┐
│                    THE FINAL BELL ECOSYSTEM                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐      ┌─────────────────┐              │
│  │  MARKETING SITE │◄────►│   BACKEND API   │              │
│  │  (React/Vite)   │      │   (Node/Express)│              │
│  │  - E-commerce   │      │   - Stripe      │              │
│  │  - Bookings     │      │   - Database    │              │
│  └─────────────────┘      └─────────────────┘              │
│         │                          │                         │
│         │                          │                         │
│         └──────────┬───────────────┘                        │
│                    │                                         │
│                    ▼                                         │
│         ┌─────────────────────┐                             │
│         │   MOBILE APP        │                             │
│         │   (React Native)    │                             │
│         │   - Customer Portal │                             │
│         └─────────────────────┘                             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Business Model

- **Training Services:** 1-on-1, group classes, online coaching
- **E-commerce Shop:** Martial arts equipment (632+ products from Playwell)
- **Customer Management:** Bookings, orders, user profiles

---

## Architecture & Technology Stack

### Frontend Stack (Marketing Site)
```javascript
{
  "framework": "React 18 + TypeScript",
  "buildTool": "Vite",
  "styling": "Tailwind CSS",
  "routing": "React Router v6",
  "state": "React Context API",
  "icons": "Lucide React",
  "payments": "Stripe Checkout",
  "animations": "CSS transitions"
}
```

### Backend Stack (API)
```javascript
{
  "runtime": "Node.js",
  "framework": "Express.js",
  "database": "PostgreSQL/MySQL",
  "payments": "Stripe (Server-side)",
  "auth": "JWT tokens",
  "validation": "Express Validator",
  "cors": "CORS middleware"
}
```

### Mobile Stack (App)
```javascript
{
  "framework": "React Native",
  "navigation": "React Navigation",
  "styling": "React Native StyleSheet",
  "api": "Fetch/Axios"
}
```

---

## Project 1: final-bell-marketing (Frontend)

### Project Structure

```
final-bell-marketing/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Cart.tsx        # Shopping cart component
│   │   ├── NavBar.tsx      # Main navigation
│   │   └── YouTubeEmbed.tsx # Video embedding
│   ├── pages/              # Route pages
│   │   ├── App.tsx         # Main app component & router
│   │   ├── About.tsx       # About page
│   │   ├── BookNow.tsx     # Booking page
│   │   ├── Contact.tsx     # Contact page
│   │   ├── Pricing.tsx     # Pricing page
│   │   ├── Shop.tsx        # Main shop page
│   │   ├── CategoryListing.tsx  # Category view
│   │   ├── ProductDetail.tsx    # Individual product
│   │   ├── Success.tsx     # Payment success page
│   │   ├── Cancel.tsx      # Payment cancel page
│   │   ├── TermsOfService.tsx
│   │   └── PrivacyPolicy.tsx
│   ├── contexts/           # Global state
│   │   └── CartContext.tsx
│   ├── data/               # Static/generated data
│   │   ├── products-generated.ts  # Auto-generated from CSV
│   │   ├── products.ts     # Static product data
│   │   └── shipping.ts     # Shipping configuration
│   ├── lib/                # Helper functions
│   │   ├── UseMeta.ts      # SEO meta tags hook
│   │   ├── shippingCalculator.ts
│   │   └── csvParser.ts    # CSV parsing utilities
│   └── main.tsx            # App entry point
├── scripts/                # Build/automation scripts
│   └── importProducts.mjs
└── public/                 # Static assets
```

### Key Features Implemented

#### 1. E-Commerce Shop System

**File:** `src/pages/Shop.tsx`

```typescript
// Core shop functionality with filtering, search, and cart
const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Filter products based on all criteria
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" ||
                           product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] &&
                        product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase()
                                .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "name": return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  return (
    <div className="shop-container">
      {/* Filters sidebar */}
      {/* Product grid */}
      {/* Cart preview */}
    </div>
  );
};
```

**Learning Points:**
- Array filtering with multiple conditions
- State management for filters
- Sorting algorithms
- Responsive grid layouts with Tailwind

#### 2. Shopping Cart with Context API

**File:** `src/contexts/CartContext.tsx`

```typescript
// Global cart state management
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number, size?: string) => void;
  updateQuantity: (id: number, quantity: number, size?: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> =
  ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add item or increment quantity if exists
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        i => i.id === item.id && i.selectedSize === item.selectedSize
      );

      if (existingItem) {
        return currentItems.map(i =>
          i.id === item.id && i.selectedSize === item.selectedSize
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  // Calculate total
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Count items
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart, total, itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
```

**Learning Points:**
- React Context API for global state
- TypeScript interfaces for type safety
- Immutable state updates with map/filter
- Derived state (total, itemCount)

#### 3. Stripe Checkout Integration

**File:** `src/components/Cart.tsx`

```typescript
const handleCheckout = async () => {
  try {
    setIsProcessing(true);

    // Prepare line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.selectedSize
            ? `Size: ${item.selectedSize}`
            : undefined,
        },
        unit_amount: Math.round(item.price * 100), // Convert to pence
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lineItems,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cart`,
        }),
      }
    );

    const { url } = await response.json();

    // Redirect to Stripe Checkout
    window.location.href = url;
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Failed to initiate checkout');
  } finally {
    setIsProcessing(false);
  }
};
```

**Learning Points:**
- Stripe Checkout API flow
- Currency conversion (pounds to pence)
- Async/await error handling
- Environment variables with Vite
- Redirects vs API responses

#### 4. Product Import System

**File:** `scripts/importProducts.mjs`

This is one of the most complex and educational parts of the project.

```javascript
import fs from "fs/promises";
import path from "path";

// CSV Parser - Converts CSV to JSON
function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = [];
    let currentValue = "";
    let insideQuotes = false;

    // Parse CSV handling quotes and commas
    for (let char of lines[i]) {
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        values.push(currentValue.trim().replace(/^"|"$/g, ""));
        currentValue = "";
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim().replace(/^"|"$/g, ""));

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    rows.push(row);
  }

  return rows;
}

// Brand Extraction - Extract brand from product title
function extractBrand(title) {
  const knownBrands = [
    "Twins", "Fairtex", "Venum", "RDX", "Everlast", "Adidas",
    "Nike", "Reebok", "Rival", "Cleto Reyes", "Winning",
    "Grant", "Ringside", "Title", "Hayabusa", "Yokkao",
    "Top King", "Boon", "Raja", "Metal Boxe", "Bad Boy"
    // ... more brands
  ];

  // Check if title starts with known brand
  for (const brand of knownBrands) {
    if (title.toLowerCase().startsWith(brand.toLowerCase())) {
      return brand;
    }
  }

  // Words that are NOT brands
  const notBrands = [
    "adults", "boxing", "leather", "full", "semi",
    "curved", "training", "professional"
    // ... more generic words
  ];

  const firstWord = title.split(" ")[0];

  // Check if first word is generic
  if (notBrands.includes(firstWord.toLowerCase())) {
    return "Playwell";
  }

  // If first word looks like a brand (capitalized, reasonable length)
  if (firstWord &&
      firstWord.length > 2 &&
      firstWord.length < 20 &&
      /^[A-Z]/.test(firstWord)) {
    return firstWord;
  }

  return "Playwell";
}

// Category Mapping - Map Playwell categories to our categories
function mapCategory(playwellCategory) {
  const categoryMap = {
    "Boxing Gloves": "gloves",
    "MMA Gloves": "gloves",
    "Focus Pads": "training-equipment",
    "Punch Bags": "training-equipment",
    "Head Guards": "protection",
    "Groin Guards": "protection",
    "Shin Guards": "protection",
    "Boxing Boots": "apparel",
    "Shorts": "apparel",
    "Hand Wraps": "accessories",
    "Mouth Guards": "accessories"
  };

  return categoryMap[playwellCategory] || "accessories";
}

// Size Detection - Check if product has sizes
function hasSizes(variants) {
  return variants.some(v =>
    v.option1 &&
    v.option1 !== "Default Title" &&
    /\b(XS|S|M|L|XL|XXL|XXXL|\d+oz|\d+cm)\b/i.test(v.option1)
  );
}

// Badge Assignment - Determine product badge
function getBadge(product, price, compareAtPrice) {
  if (compareAtPrice && compareAtPrice > price) return "sale";
  if (product.tags && product.tags.toLowerCase().includes("new")) return "new";
  if (price > 100) return "premium";
  return undefined;
}

// Main conversion function
function convertToOurFormat(products) {
  const converted = [];
  let currentId = 1;

  for (const product of products) {
    // Parse variants
    const variants = JSON.parse(product.variants || "[]");
    if (variants.length === 0) continue;

    const baseVariant = variants[0];
    const price = parseFloat(baseVariant.price) || 0;
    const compareAtPrice = parseFloat(baseVariant.compareAtPrice) || null;
    const specialPrice = compareAtPrice && compareAtPrice > price
      ? price
      : null;

    // Map category
    const category = mapCategory(product.productType);

    // Extract sizes
    const sizes = hasSizes(variants)
      ? variants.map(v => v.option1).filter(Boolean)
      : [];

    // Determine badge
    const badge = getBadge(product, price, compareAtPrice);

    converted.push({
      id: currentId++,
      name: product.title,
      category,
      price,
      specialPrice,
      image: product.images[0] || "",
      description: product.description.substring(0, 150),
      inStock: baseVariant.inStock,
      stockQuantity: baseVariant.inventoryQty,
      badge,
      brand: extractBrand(product.title), // Extract from title
      hasSizes: sizes.length > 0,
      sizes,
      weight: baseVariant.weightGrams,
      sku: baseVariant.sku,
    });
  }

  return converted;
}

// Main execution
async function main() {
  try {
    // Read CSV
    const csvPath = path.join(process.cwd(), "playwell-products.csv");
    const csvContent = await fs.readFile(csvPath, "utf-8");

    // Parse and convert
    const parsed = parseCSV(csvContent);
    const converted = convertToOurFormat(parsed);

    // Generate TypeScript file
    const outputPath = path.join(
      process.cwd(),
      "src/data/products-generated.ts"
    );

    const tsContent = `// Auto-generated from playwell-products.csv
// Last updated: ${new Date().toISOString()}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  specialPrice: number | null;
  image: string;
  description: string;
  inStock: boolean;
  stockQuantity: number;
  badge?: "new" | "sale" | "popular" | "premium";
  brand: string;
  hasSizes: boolean;
  sizes: string[];
  weight: number;
  sku: string;
}

export const products: Product[] = ${JSON.stringify(converted, null, 2)};
`;

    await fs.writeFile(outputPath, tsContent, "utf-8");
    console.log(`✓ Imported ${converted.length} products`);
  } catch (error) {
    console.error("Import failed:", error);
    process.exit(1);
  }
}

main();
```

**Learning Points:**
- Node.js file system operations
- CSV parsing with quote handling
- String manipulation and pattern matching
- Regular expressions for brand/size detection
- Data transformation pipelines
- TypeScript type generation
- Error handling in async code

#### 5. Legal Pages (Terms & Privacy)

**File:** `src/pages/TermsOfService.tsx`

```typescript
const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Bell className="h-16 w-16 text-secondary mb-6" />
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-neutral-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-10">
        <h3 className="text-lg font-semibold text-secondary mb-4">
          Quick Navigation
        </h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <a href="#training-services" className="hover:text-secondary">
            → Training Services (Sections 1-9)
          </a>
          <a href="#online-shop" className="hover:text-secondary">
            → Online Shop (Sections 10-14)
          </a>
          <a href="#general-terms" className="hover:text-secondary">
            → General Terms (Sections 15-19)
          </a>
        </div>
      </div>

      {/* Section: Training Services */}
      <div id="training-services" className="border-l-4 border-secondary pl-6">
        <h2 className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-secondary" />
          Training Services
        </h2>
        {/* Sections 1-9 */}
      </div>

      {/* Section: Online Shop */}
      <div id="online-shop" className="border-l-4 border-secondary pl-6">
        <h2 className="flex items-center gap-3">
          <ShoppingBag className="h-6 w-6 text-secondary" />
          Online Shop
        </h2>

        {/* Returns & Refunds */}
        <div>
          <h3 className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-secondary" />
            12. Returns, Refunds & Consumer Rights
          </h3>
          <p>Under UK Distance Selling Regulations:</p>
          <ul>
            <li><strong>14-Day Cooling-Off Period:</strong> Cancel within 14 days</li>
            <li><strong>Return Window:</strong> 14 days from notification</li>
            <li><strong>Condition:</strong> Unused, original packaging</li>
            <li><strong>Refund Timeline:</strong> Within 14 days of receiving return</li>
          </ul>
        </div>

        {/* Consumer Rights Act 2015 */}
        <div>
          <h3>13. Consumer Rights Act 2015</h3>
          <ul>
            <li><strong>30 Days:</strong> Full refund if faulty</li>
            <li><strong>6 Months:</strong> Repair or replacement</li>
            <li><strong>6 Years:</strong> Report faults for remedy</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
```

**Learning Points:**
- Legal compliance for UK e-commerce
- Consumer Rights Act 2015
- Distance Selling Regulations
- Accessibility (anchor links, semantic HTML)
- Icon integration with Lucide
- Gradient backgrounds with Tailwind

---

## Project 2: final-bell-api (Backend)

### Project Structure

```
final-bell-api/
├── server.js              # Main Express server
├── routes/
│   ├── checkout.js        # Stripe checkout endpoints
│   ├── bookings.js        # Booking management
│   └── webhooks.js        # Stripe webhooks
├── models/
│   ├── Order.js           # Order database model
│   └── Booking.js         # Booking database model
├── middleware/
│   ├── auth.js            # JWT authentication
│   └── validation.js      # Request validation
└── .env                   # Environment variables
```

### Key Features Implemented

#### 1. Stripe Checkout Session

**File:** `routes/checkout.js`

```javascript
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { lineItems, successUrl, cancelUrl } = req.body;

    // Validate line items
    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ error: 'Invalid line items' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      shipping_address_collection: {
        allowed_countries: ['GB'], // UK only
      },
      billing_address_collection: 'required',
      metadata: {
        source: 'final-bell-shop',
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

module.exports = router;
```

**Learning Points:**
- Express.js routing
- Stripe API integration
- Request validation
- Error handling patterns
- Environment variable usage

#### 2. Stripe Webhook Handler

**File:** `routes/webhooks.js`

```javascript
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Webhook endpoint (raw body required)
router.post('/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;

        // Create order in database
        await Order.create({
          stripeSessionId: session.id,
          customerEmail: session.customer_details.email,
          customerName: session.customer_details.name,
          amount: session.amount_total / 100, // Convert from pence
          currency: session.currency,
          status: 'paid',
          shippingAddress: session.shipping_details?.address,
          createdAt: new Date(),
        });

        console.log(`Order created for session ${session.id}`);
        break;

      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object.id);
        break;

      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  }
);

module.exports = router;
```

**Learning Points:**
- Webhook signature verification
- Event-driven architecture
- Database creation from webhook data
- Security best practices
- Raw body parsing for webhooks

#### 3. Booking System

**File:** `routes/bookings.js`

```javascript
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { body, validationResult } = require('express-validator');

// Create booking
router.post('/bookings',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('phone').matches(/^[0-9]{10,11}$/).withMessage('Valid phone required'),
    body('service').notEmpty().withMessage('Service is required'),
    body('date').isISO8601().withMessage('Valid date required'),
    body('time').matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage('Valid time required (HH:MM)'),
  ],
  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phone, service, date, time, notes } = req.body;

      // Check availability
      const existingBooking = await Booking.findOne({
        date,
        time,
        status: { $ne: 'cancelled' }
      });

      if (existingBooking) {
        return res.status(409).json({
          error: 'Time slot already booked'
        });
      }

      // Create booking
      const booking = await Booking.create({
        name,
        email,
        phone,
        service,
        date,
        time,
        notes,
        status: 'pending',
        createdAt: new Date(),
      });

      // TODO: Send confirmation email

      res.status(201).json({
        success: true,
        bookingId: booking._id
      });
    } catch (error) {
      console.error('Booking creation error:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  }
);

// Get bookings
router.get('/bookings', async (req, res) => {
  try {
    const { date, status } = req.query;

    const filter = {};
    if (date) filter.date = date;
    if (status) filter.status = status;

    const bookings = await Booking.find(filter).sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

module.exports = router;
```

**Learning Points:**
- Express validator middleware
- Database queries with filters
- Conflict detection (double booking)
- RESTful API design
- Query parameter handling

#### 4. CORS Configuration

**File:** `server.js`

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', // Vite dev server
    'https://thefinalbell.co.uk', // Production frontend
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Body parsing (except for webhooks)
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next(); // Skip JSON parsing for webhooks
  } else {
    express.json()(req, res, next);
  }
});

// Routes
app.use('/api', require('./routes/checkout'));
app.use('/api', require('./routes/bookings'));
app.use('/', require('./routes/webhooks')); // No /api prefix for webhooks

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Learning Points:**
- CORS security configuration
- Conditional middleware (webhook raw body)
- Error handling middleware
- Environment-based configuration
- Health check endpoints

---

## Project 3: the-final-bell-app (Mobile)

### Project Structure

```
the-final-bell-app/
├── App.tsx                # Root component
├── screens/
│   ├── HomeScreen.tsx
│   ├── BookingsScreen.tsx
│   ├── OrdersScreen.tsx
│   └── ProfileScreen.tsx
├── components/
│   ├── BookingCard.tsx
│   └── OrderCard.tsx
└── navigation/
    └── AppNavigator.tsx
```

### Key Features Implemented

#### 1. Navigation Setup

**File:** `navigation/AppNavigator.tsx`

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Bookings') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Orders') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#D4AF37', // Gold
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Bookings" component={BookingsScreen} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

**Learning Points:**
- React Navigation setup
- Bottom tab navigation
- Dynamic icon rendering
- TypeScript with React Navigation
- Theme customization

#### 2. API Integration

**File:** `screens/BookingsScreen.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import BookingCard from '../components/BookingCard';

const API_URL = 'https://api.thefinalbell.co.uk';

interface Booking {
  _id: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export default function BookingsScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        headers: {
          'Authorization': `Bearer ${userToken}`, // From auth context
        },
      });

      if (!response.ok) throw new Error('Failed to fetch bookings');

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <BookingCard booking={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#D4AF37"
          />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
});
```

**Learning Points:**
- React Native hooks (useState, useEffect)
- FlatList with pull-to-refresh
- API fetching in mobile apps
- Loading states and error handling
- React Native styling

---

## Key Features Built

### 1. CSV to Product Import Pipeline

**Flow:**
```
Playwell CSV → Parse CSV → Extract Brands → Map Categories
→ Detect Sizes → Assign Badges → Generate TypeScript
→ Import to Frontend
```

**Commands:**
```bash
# Download CSV from Playwell
curl -o playwell-products.csv ftp://161.35.45.163/ --max-time 10

# Run import
node scripts/importProducts.mjs

# Verify import
npm run build
```

### 2. E-Commerce Checkout Flow

**Flow:**
```
Browse Shop → Add to Cart → View Cart → Click Checkout
→ Stripe Checkout → Payment → Webhook → Order Created
→ Success Page
```

**Data Flow:**
```javascript
// Frontend sends:
{
  lineItems: [
    {
      price_data: {
        currency: 'gbp',
        product_data: { name, images },
        unit_amount: price * 100 // Pence
      },
      quantity: 2
    }
  ],
  successUrl: 'https://thefinalbell.co.uk/success',
  cancelUrl: 'https://thefinalbell.co.uk/cart'
}

// Backend creates session, returns:
{ url: 'https://checkout.stripe.com/...' }

// Webhook receives (after payment):
{
  type: 'checkout.session.completed',
  data: {
    customer_details: { email, name },
    amount_total: 5000, // 50.00 GBP
    shipping_details: { address }
  }
}
```

### 3. Booking System

**Frontend Form → Validation → API → Database → Confirmation**

**Validation Rules:**
- Name: Required, min 2 chars
- Email: Valid email format
- Phone: 10-11 digits
- Date: ISO8601 format, future date only
- Time: HH:MM format, business hours (9am-8pm)

### 4. Legal Compliance

**Features:**
- Consumer Rights Act 2015 (30 day/6 month/6 year rights)
- Distance Selling Regulations (14-day cooling-off)
- GDPR-compliant privacy policy
- Data collection transparency
- Cookie consent (to be implemented)

---

## Integration Flows

### Payment Flow (End-to-End)

```
┌─────────────┐
│   CUSTOMER  │
└──────┬──────┘
       │ 1. Add items to cart
       ▼
┌─────────────────┐
│  FRONTEND CART  │
└──────┬──────────┘
       │ 2. Click checkout
       │ POST /create-checkout-session
       ▼
┌─────────────────┐
│   BACKEND API   │
│  creates Stripe │
│  session        │
└──────┬──────────┘
       │ 3. Return checkout URL
       ▼
┌─────────────────┐
│ STRIPE CHECKOUT │ (Stripe-hosted page)
│  - Enter card   │
│  - Enter address│
└──────┬──────────┘
       │ 4. Customer pays
       ▼
┌─────────────────┐
│  STRIPE SERVER  │
│  processes      │
└──────┬──────────┘
       │ 5. POST webhook
       ▼
┌─────────────────┐
│  BACKEND API    │
│  /webhook       │
│  - Verify sig   │
│  - Create order │
└──────┬──────────┘
       │ 6. Redirect to success
       ▼
┌─────────────────┐
│  FRONTEND       │
│  Success page   │
└─────────────────┘
```

### Data Collection Timeline

```
STAGE 1: Browsing
└─ No data collected
   └─ Anonymous session

STAGE 2: Add to Cart
└─ Cart data in browser (localStorage)
   └─ No server communication

STAGE 3: Click Checkout
└─ Cart sent to backend
   └─ Stripe session created
      └─ Still no personal data

STAGE 4: Stripe Checkout Page
└─ Customer enters:
   ├─ Name
   ├─ Email
   ├─ Phone (optional)
   ├─ Address
   └─ Card details (NEVER seen by us)

STAGE 5: Payment Success
└─ Webhook receives:
   ├─ Customer name
   ├─ Customer email
   ├─ Shipping address
   ├─ Order details
   └─ Transaction ID (no card data)

STAGE 6: Order Stored
└─ Database contains:
   ├─ Order ID
   ├─ Customer info
   ├─ Products ordered
   ├─ Amount paid
   └─ Shipping address
```

---

## Code Patterns & Best Practices

### 1. TypeScript Type Safety

```typescript
// Define interfaces for all data structures
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  // ... more fields
}

// Use type inference
const [products, setProducts] = useState<Product[]>([]);

// Type function parameters and returns
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Use utility types
type ProductPreview = Pick<Product, 'id' | 'name' | 'image' | 'price'>;
type CartItem = Omit<Product, 'description' | 'category'> & { quantity: number };
```

### 2. Error Handling Pattern

```typescript
// Frontend
async function fetchData() {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error('Fetch failed:', error);
    setError(error instanceof Error ? error.message : 'Unknown error');
  } finally {
    setLoading(false);
  }
}

// Backend
app.use((err, req, res, next) => {
  // Log error
  console.error(err.stack);

  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(err.statusCode || 500).json({ error: message });
});
```

### 3. Environment Variables

```bash
# .env (Backend)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgresql://...
PORT=3000
NODE_ENV=development

# .env (Frontend)
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

```typescript
// Usage in Vite
const apiUrl = import.meta.env.VITE_API_URL;

// Usage in Node
const stripeKey = process.env.STRIPE_SECRET_KEY;
```

### 4. Immutable State Updates

```typescript
// ❌ BAD - Mutates state
const addItem = (item) => {
  items.push(item); // WRONG
  setItems(items);
};

// ✅ GOOD - Creates new array
const addItem = (item) => {
  setItems([...items, item]);
};

// ✅ GOOD - Update nested object immutably
const updateQuantity = (id, quantity) => {
  setItems(items.map(item =>
    item.id === id
      ? { ...item, quantity } // Create new object
      : item // Return existing object
  ));
};

// ✅ GOOD - Remove item
const removeItem = (id) => {
  setItems(items.filter(item => item.id !== id));
};
```

### 5. Component Composition

```typescript
// Break down large components into smaller ones

// ❌ BAD - Monolithic component
function Shop() {
  return (
    <div>
      {/* 500 lines of JSX */}
    </div>
  );
}

// ✅ GOOD - Composed components
function Shop() {
  return (
    <div className="shop-container">
      <ShopFilters onFilterChange={handleFilterChange} />
      <ProductGrid products={filteredProducts} />
      <CartPreview />
    </div>
  );
}

function ShopFilters({ onFilterChange }) {
  return (
    <aside className="filters">
      <CategoryFilter onChange={onFilterChange} />
      <PriceRangeFilter onChange={onFilterChange} />
      <BrandFilter onChange={onFilterChange} />
    </aside>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## Learning Exercises

### Exercise 1: Add a "Featured Products" Section

**Goal:** Display 4 featured products on the homepage

**Steps:**
1. Add a `featured` boolean field to Product interface
2. Mark 4 products as featured in products-generated.ts
3. Create a `getFeaturedProducts()` helper function
4. Create a `FeaturedProducts` component
5. Add component to Home page

**Solution:**
```typescript
// src/utils/products.ts
export function getFeaturedProducts(count: number = 4): Product[] {
  return products.filter(p => p.featured).slice(0, count);
}

// src/components/FeaturedProducts.tsx
export default function FeaturedProducts() {
  const featured = getFeaturedProducts(4);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {featured.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
```

### Exercise 2: Add Order History Page

**Goal:** Show customer's previous orders

**Steps:**
1. Create `/orders` route in React Router
2. Create `OrdersPage` component
3. Fetch orders from backend API
4. Display orders in a list with date, total, status
5. Add "View Details" button for each order

**Backend endpoint needed:**
```javascript
router.get('/orders/:email', async (req, res) => {
  const orders = await Order.find({
    customerEmail: req.params.email
  }).sort({ createdAt: -1 });

  res.json(orders);
});
```

### Exercise 3: Implement Size Selection

**Goal:** Let users select product size before adding to cart

**Steps:**
1. Update `ProductCard` to show size dropdown if `product.hasSizes`
2. Add `selectedSize` state
3. Disable "Add to Cart" if size required but not selected
4. Pass selected size to cart

**Solution:**
```typescript
function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addItem } = useCart();

  const canAddToCart = !product.hasSizes || selectedSize !== "";

  const handleAddToCart = () => {
    addItem({
      ...product,
      selectedSize: selectedSize || undefined,
    });
  };

  return (
    <div className="product-card">
      {product.hasSizes && (
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Select size</option>
          {product.sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      )}

      <button
        onClick={handleAddToCart}
        disabled={!canAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
```

### Exercise 4: Add Search Functionality

**Goal:** Search products by name and description

**Steps:**
1. Add search input to Shop page
2. Create `searchProducts()` function
3. Update filtered products to include search results
4. Highlight search terms in results (bonus)

**Solution:**
```typescript
function searchProducts(query: string, products: Product[]): Product[] {
  const lowerQuery = query.toLowerCase();

  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery)
  );
}
```

---

## Troubleshooting Guide

### Common Issues & Solutions

#### Issue 1: CORS Errors

**Symptom:**
```
Access to fetch at 'http://localhost:3000/api/checkout' from origin
'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
```javascript
// backend/server.js
const corsOptions = {
  origin: ['http://localhost:5173'], // Add your frontend URL
  credentials: true,
};
app.use(cors(corsOptions));
```

#### Issue 2: Stripe Webhook Not Receiving Events

**Symptom:**
- Payments succeed but orders not created
- Webhook endpoint returns 400/500

**Solution:**
```javascript
// 1. Use raw body for webhooks
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next(); // Skip JSON parsing
  } else {
    express.json()(req, res, next);
  }
});

// 2. Verify signature
const sig = req.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(
  req.body,
  sig,
  process.env.STRIPE_WEBHOOK_SECRET
);

// 3. Test with Stripe CLI
// stripe listen --forward-to localhost:3000/webhook
```

#### Issue 3: Cart Not Persisting on Refresh

**Symptom:**
- Cart empties when page refreshes

**Solution:**
```typescript
// Save cart to localStorage
const CartProvider = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // ... rest of provider
};
```

#### Issue 4: Products Not Importing

**Symptom:**
```
Error: ENOENT: no such file or directory, open 'playwell-products.csv'
```

**Solution:**
```bash
# 1. Check file exists
ls playwell-products.csv

# 2. Check you're in correct directory
pwd
# Should be: .../final-bell-marketing

# 3. Re-download CSV
curl -o playwell-products.csv ftp://161.35.45.163/ --max-time 10

# 4. Run import
node scripts/importProducts.mjs
```

#### Issue 5: TypeScript Errors After Import

**Symptom:**
```
Type 'number' is not assignable to type 'string'
```

**Solution:**
```typescript
// Check Product interface matches generated data
export interface Product {
  id: number; // Not string
  price: number; // Not string
  inStock: boolean; // Not "true"/"false"
  // ... etc
}

// Fix import script type conversions
price: parseFloat(baseVariant.price) || 0, // Convert to number
inStock: baseVariant.inStock === "true", // Convert to boolean
```

#### Issue 6: Environment Variables Not Working

**Symptom:**
```
undefined is not a valid Stripe API key
```

**Solution:**
```bash
# 1. Check .env file exists
ls -la .env

# 2. Check variable name prefix
# Vite: Must start with VITE_
VITE_API_URL=http://localhost:3000

# Node: No prefix
STRIPE_SECRET_KEY=sk_test_...

# 3. Restart dev server (required after .env changes)
npm run dev
```

---

## Advanced Concepts

### 1. Optimistic UI Updates

Make UI feel instant by updating before API confirms:

```typescript
const removeItem = async (id: number) => {
  // 1. Optimistically update UI
  const previousItems = items;
  setItems(items.filter(item => item.id !== id));

  try {
    // 2. Send request to backend
    await fetch(`/api/cart/${id}`, { method: 'DELETE' });
  } catch (error) {
    // 3. Rollback on error
    setItems(previousItems);
    alert('Failed to remove item');
  }
};
```

### 2. Debouncing Search Input

Prevent excessive API calls:

```typescript
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500); // Wait 500ms

  useEffect(() => {
    if (debouncedSearch) {
      // API call only happens 500ms after user stops typing
      searchProducts(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search products..."
    />
  );
}
```

### 3. Custom React Hooks

Reusable logic extraction:

```typescript
// useLocalStorage.ts
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage
function Cart() {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);
  // Items automatically persist to localStorage
}
```

### 4. Error Boundaries

Catch React errors gracefully:

```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <Shop />
</ErrorBoundary>
```

---

## Deployment Checklist

### Frontend Deployment

- [ ] Update environment variables for production
  ```bash
  VITE_API_URL=https://api.thefinalbell.co.uk
  VITE_STRIPE_PUBLIC_KEY=pk_live_...
  ```
- [ ] Build production bundle
  ```bash
  npm run build
  ```
- [ ] Test build locally
  ```bash
  npm run preview
  ```
- [ ] Deploy to hosting (Vercel/Netlify)
- [ ] Configure custom domain
- [ ] Enable HTTPS
- [ ] Test checkout flow end-to-end

### Backend Deployment

- [ ] Set production environment variables
  ```bash
  STRIPE_SECRET_KEY=sk_live_...
  STRIPE_WEBHOOK_SECRET=whsec_...
  DATABASE_URL=postgresql://production...
  NODE_ENV=production
  ```
- [ ] Update CORS origins
  ```javascript
  origin: ['https://thefinalbell.co.uk']
  ```
- [ ] Deploy to hosting (Heroku/DigitalOcean/AWS)
- [ ] Configure webhook endpoint in Stripe Dashboard
  - URL: `https://api.thefinalbell.co.uk/webhook`
  - Events: `checkout.session.completed`
- [ ] Test webhook with real payment
- [ ] Set up error monitoring (Sentry)
- [ ] Configure database backups

---

## Key Takeaways

### What You've Built

1. **Full-Stack E-Commerce Platform**
   - 632 products across 8 categories
   - Shopping cart with size selection
   - Stripe payment integration
   - Order management system

2. **Booking System**
   - Service selection
   - Date/time scheduling
   - Conflict detection
   - Email confirmations

3. **Data Pipeline**
   - CSV import automation
   - Brand extraction algorithm
   - Category mapping
   - TypeScript generation

4. **Legal Compliance**
   - UK GDPR-compliant privacy policy
   - Consumer Rights Act integration
   - Distance Selling Regulations
   - Transparent data collection

5. **Mobile App**
   - Customer portal
   - Order history
   - Booking management

### Technologies Mastered

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express, Stripe API
- **Database:** PostgreSQL/MySQL
- **Mobile:** React Native, React Navigation
- **DevOps:** Git, npm scripts, environment variables
- **Security:** CORS, webhook signatures, HTTPS

### Next Steps

1. **Add Authentication**
   - User registration/login
   - JWT tokens
   - Protected routes

2. **Implement Email Notifications**
   - Order confirmations
   - Booking reminders
   - Password resets

3. **Add Admin Dashboard**
   - Manage products
   - View orders
   - Manage bookings

4. **Improve Performance**
   - Image optimization
   - Lazy loading
   - Code splitting
   - Caching strategies

5. **Add Analytics**
   - Google Analytics
   - Conversion tracking
   - User behavior analysis

---

## Resources

### Documentation
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Stripe API](https://stripe.com/docs/api)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Navigation](https://reactnavigation.org/docs)

### Tools
- [Stripe CLI](https://stripe.com/docs/stripe-cli) - Test webhooks locally
- [Postman](https://www.postman.com/) - API testing
- [React DevTools](https://react.dev/learn/react-developer-tools)

### Learning Paths
1. **Beginner:** Complete the learning exercises above
2. **Intermediate:** Build the "Next Steps" features
3. **Advanced:** Optimize performance, add testing, implement CI/CD

---

**Document Version:** 1.0
**Last Updated:** November 5, 2025
**Author:** Claude (Anthropic)
**Project:** The Final Bell Ecosystem

---

*This document is a living guide. As you build new features, update this document to reflect your learnings and implementations.*
